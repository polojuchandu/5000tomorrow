'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, ChevronLeft, Check } from 'lucide-react'
import { getNode, type TreeNode } from '@/lib/chat/decisionTree'
import TypingIndicator from './TypingIndicator'

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
  timestamp: string // ISO string
}

type Option = NonNullable<TreeNode['options']>[number]

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'chat_5000tomorrow'
const TYPING_DELAY = 800
const INITIAL_DELAY = 1000
const CHOICES_DELAY = 400

// ─── Component ────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState('start')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([])
  const [selectedRadio, setSelectedRadio] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])
  const [choicesVisible, setChoicesVisible] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // ── Mount + hydrate from localStorage ──────────────────────────────────────

  useEffect(() => {
    let hasSavedMessages = false

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const saved = JSON.parse(raw) as {
          messages?: ChatMessage[]
          currentNodeId?: string
          history?: string[]
        }
        if (saved.messages && saved.messages.length > 0) {
          setMessages(saved.messages)
          setCurrentNodeId(saved.currentNodeId ?? 'start')
          setHistory(saved.history ?? [])
          setChoicesVisible(true)
          hasSavedMessages = true
        }
      }
    } catch {
      // localStorage blocked or corrupted — start fresh
    }

    setMounted(true)

    if (!hasSavedMessages) {
      const timer = setTimeout(() => {
        const node = getNode('start')
        setMessages([
          {
            id: `bot_${Date.now()}`,
            role: 'bot',
            text: node.botMessage,
            timestamp: new Date().toISOString(),
          },
        ])
        setTimeout(() => setChoicesVisible(true), CHOICES_DELAY)
      }, INITIAL_DELAY)

      return () => clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // ── Persist state ──────────────────────────────────────────────────────────

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ messages, currentNodeId, history })
      )
    } catch {
      // ignore write errors
    }
  }, [mounted, messages, currentNodeId, history])

  // ── Auto-scroll ────────────────────────────────────────────────────────────

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, choicesVisible])

  // ── ESC to close ───────────────────────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // ── Reset choices when node changes ────────────────────────────────────────

  useEffect(() => {
    setSelectedCheckboxes([])
    setSelectedRadio(null)
  }, [currentNodeId])

  // ─── Helpers ─────────────────────────────────────────────────────────────

  function botMessageFromNode(nodeId: string): ChatMessage {
    return {
      id: `bot_${Date.now()}`,
      role: 'bot',
      text: getNode(nodeId).botMessage,
      timestamp: new Date().toISOString(),
    }
  }

  function showChoicesAfterDelay() {
    setChoicesVisible(false)
    setTimeout(() => setChoicesVisible(true), CHOICES_DELAY)
  }

  function doRestart() {
    const botMsg = botMessageFromNode('start')
    setMessages([botMsg])
    setHistory([])
    setCurrentNodeId('start')
    showChoicesAfterDelay()
  }

  // ─── Option click handler ─────────────────────────────────────────────────

  function handleOptionClick(option: Option) {
    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: option.emoji ? `${option.emoji} ${option.label}` : option.label,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setHistory((prev) => [...prev, currentNodeId])
    setChoicesVisible(false)
    setIsTyping(true)

    setTimeout(() => {
      setIsTyping(false)

      if (option.action === 'apply') {
        window.location.href = '/apply'
        return
      }
      if (option.action === 'call') {
        window.location.href = 'tel:+18778632995'
        return
      }
      if (option.action === 'restart') {
        doRestart()
        return
      }

      const botMsg = botMessageFromNode(option.nextNodeId)
      setMessages((prev) => [...prev, botMsg])
      setCurrentNodeId(option.nextNodeId)
      showChoicesAfterDelay()
    }, TYPING_DELAY)
  }

  // ─── Checklist continue ───────────────────────────────────────────────────

  function handleChecklistContinue() {
    const currentNode = getNode(currentNodeId)
    if (selectedCheckboxes.length === 0) return

    const nextNodeId = currentNode.options?.[0]?.nextNodeId ?? 'start'
    const selectedText =
      currentNode.options
        ?.filter((o) => selectedCheckboxes.includes(o.label))
        .map((o) => (o.emoji ? `${o.emoji} ${o.label}` : o.label))
        .join(', ') ?? ''

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      text: selectedText,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMsg])
    setHistory((prev) => [...prev, currentNodeId])
    setChoicesVisible(false)
    setIsTyping(true)
    setSelectedCheckboxes([])

    setTimeout(() => {
      setIsTyping(false)
      const botMsg = botMessageFromNode(nextNodeId)
      setMessages((prev) => [...prev, botMsg])
      setCurrentNodeId(nextNodeId)
      showChoicesAfterDelay()
    }, TYPING_DELAY)
  }

  // ─── Back button ──────────────────────────────────────────────────────────

  function handleBack() {
    if (history.length === 0 || isTyping) return

    const prevNodeId = history[history.length - 1]
    setHistory((prev) => prev.slice(0, -1))
    setCurrentNodeId(prevNodeId)
    setIsTyping(false)
    setChoicesVisible(true)

    setMessages((prev) => {
      const copy = [...prev]
      // Remove last bot message
      if (copy.length > 0 && copy[copy.length - 1].role === 'bot') copy.pop()
      // Remove last user message
      if (copy.length > 0 && copy[copy.length - 1].role === 'user') copy.pop()
      return copy
    })
  }

  // ─── Derived ─────────────────────────────────────────────────────────────

  if (!mounted) return null

  const currentNode = getNode(currentNodeId)
  const hasMessages = messages.length > 0

  function formatTime(iso: string) {
    try {
      return new Date(iso).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Toggle Button (collapsed) ─────────────────────────────────────── */}
      {!isOpen && (
        <div className="fixed z-50 bottom-24 right-4 md:bottom-6 md:right-6">
          {/* Pulse ring */}
          <span
            className="absolute inset-0 rounded-full bg-[#C9A84C] animate-ping opacity-75 pointer-events-none"
            aria-hidden="true"
          />

          {/* Unread badge */}
          {hasMessages && (
            <span
              className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full z-10 pointer-events-none"
              aria-label="New messages"
            />
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="relative w-16 h-16 rounded-full bg-[#C9A84C] text-white shadow-lg flex items-center justify-center hover:bg-[#b8943e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-2"
            aria-label="Open chat with 5000 Tomorrow"
          >
            <MessageCircle size={28} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ── Chat Widget (expanded) ────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 320 }}
            className="fixed z-50 flex flex-col bottom-24 right-4 md:bottom-6 md:right-6 w-[calc(100vw-32px)] h-[70vh] md:w-[360px] md:h-[560px] rounded-2xl shadow-2xl overflow-hidden origin-bottom-right bg-white"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with 5000 Tomorrow"
          >
            {/* ── Header ──────────────────────────────────────────────────── */}
            <div className="bg-[#0A1628] px-4 py-3 flex items-center gap-2 flex-shrink-0">
              {history.length > 0 && !isTyping && (
                <button
                  onClick={handleBack}
                  className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1 -ml-1 flex-shrink-0"
                  aria-label="Go back to previous question"
                >
                  <ChevronLeft size={20} aria-hidden="true" />
                </button>
              )}

              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full bg-green-400 flex-shrink-0 animate-pulse"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="text-white font-bold text-sm leading-tight">5000 Tomorrow</p>
                  <p className="text-gray-400 text-xs">Typically replies instantly</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded p-1 flex-shrink-0"
                aria-label="Close chat"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {/* ── Messages area ────────────────────────────────────────────── */}
            <div
              className="flex-1 min-h-0 overflow-y-auto p-4 space-y-3 bg-gray-50"
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm whitespace-pre-line ${
                      msg.role === 'bot'
                        ? 'bg-[#0A1628] text-white rounded-2xl rounded-tl-none'
                        : 'bg-[#C9A84C] text-[#0A1628] font-medium rounded-2xl rounded-tr-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {formatTime(msg.timestamp)}
                  </span>
                </motion.div>
              ))}

              {isTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* ── Footer strip ─────────────────────────────────────────────── */}
            <div className="border-t bg-white flex-shrink-0 py-1 px-4">
              <p className="text-[10px] text-gray-400 text-center">
                Powered by 5000 Tomorrow · Michigan Legal Funding
              </p>
            </div>

            {/* ── Choices area ─────────────────────────────────────────────── */}
            {!isTyping && choicesVisible && (
              <div
                className="bg-white flex-shrink-0 border-t overflow-y-auto max-h-52 px-4 pb-4 pt-3"
                role="group"
                aria-label="Reply options"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentNodeId}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-col gap-2"
                  >
                    {/* ── Buttons ───────────────────────────────────────── */}
                    {(currentNode.type === 'buttons') &&
                      currentNode.options?.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => handleOptionClick(option)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleOptionClick(option)
                            }
                          }}
                          className="w-full text-left px-4 py-3 rounded-xl border-2 border-[#0A1628] text-[#0A1628] font-medium text-sm hover:bg-[#0A1628] hover:text-white transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-1"
                          aria-label={option.label}
                        >
                          {option.emoji && (
                            <span aria-hidden="true">{option.emoji}</span>
                          )}
                          <span>{option.label}</span>
                        </button>
                      ))}

                    {/* ── Radio ─────────────────────────────────────────── */}
                    {currentNode.type === 'radio' && (
                      <>
                        {currentNode.options?.map((option) => {
                          const isSelected = selectedRadio === option.label
                          return (
                            <button
                              key={option.label}
                              role="radio"
                              aria-checked={isSelected}
                              onClick={() => setSelectedRadio(option.label)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setSelectedRadio(option.label)
                                }
                              }}
                              className={`w-full text-left px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-1 ${
                                isSelected
                                  ? 'bg-[#0A1628] text-white border-[#0A1628]'
                                  : 'border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white'
                              }`}
                            >
                              {option.emoji && (
                                <span aria-hidden="true">{option.emoji}</span>
                              )}
                              <span className="flex-1">{option.label}</span>
                              <div
                                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  isSelected ? 'border-white' : 'border-[#0A1628]'
                                }`}
                                aria-hidden="true"
                              >
                                {isSelected && (
                                  <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                              </div>
                            </button>
                          )
                        })}
                        {selectedRadio && (
                          <button
                            onClick={() => {
                              const opt = currentNode.options?.find(
                                (o) => o.label === selectedRadio
                              )
                              if (opt) handleOptionClick(opt)
                            }}
                            className="w-full px-4 py-3 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b8943e] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-1"
                          >
                            Confirm →
                          </button>
                        )}
                      </>
                    )}

                    {/* ── Checklist ─────────────────────────────────────── */}
                    {currentNode.type === 'checklist' && (
                      <>
                        {currentNode.options?.map((option) => {
                          const isChecked = selectedCheckboxes.includes(option.label)
                          return (
                            <button
                              key={option.label}
                              role="checkbox"
                              aria-checked={isChecked}
                              onClick={() =>
                                setSelectedCheckboxes((prev) =>
                                  isChecked
                                    ? prev.filter((l) => l !== option.label)
                                    : [...prev, option.label]
                                )
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setSelectedCheckboxes((prev) =>
                                    isChecked
                                      ? prev.filter((l) => l !== option.label)
                                      : [...prev, option.label]
                                  )
                                }
                              }}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-left text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-1 ${
                                isChecked
                                  ? 'bg-[#0A1628]/10 border-[#0A1628]'
                                  : 'border-gray-200 hover:border-[#0A1628]'
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                  isChecked
                                    ? 'bg-[#0A1628] border-[#0A1628]'
                                    : 'border-gray-300'
                                }`}
                                aria-hidden="true"
                              >
                                {isChecked && (
                                  <Check size={12} className="text-white" />
                                )}
                              </div>
                              {option.emoji && (
                                <span aria-hidden="true">{option.emoji}</span>
                              )}
                              <span
                                className={
                                  isChecked ? 'text-[#0A1628] font-medium' : 'text-gray-700'
                                }
                              >
                                {option.label}
                              </span>
                            </button>
                          )
                        })}
                        <button
                          onClick={handleChecklistContinue}
                          disabled={selectedCheckboxes.length === 0}
                          className="w-full px-4 py-3 rounded-xl bg-[#C9A84C] text-[#0A1628] font-bold text-sm hover:bg-[#b8943e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A84C] focus-visible:ring-offset-1"
                          aria-disabled={selectedCheckboxes.length === 0}
                        >
                          Continue →
                        </button>
                      </>
                    )}

                    {/* ── End (terminal) ────────────────────────────────── */}
                    {currentNode.type === 'end' && (
                      <>
                        {currentNode.options?.map((option) => (
                          <button
                            key={option.label}
                            onClick={() => handleOptionClick(option)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault()
                                handleOptionClick(option)
                              }
                            }}
                            className="w-full text-left px-4 py-3 rounded-xl border-2 border-[#0A1628] text-[#0A1628] font-medium text-sm hover:bg-[#0A1628] hover:text-white transition-all duration-200 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A1628] focus-visible:ring-offset-1"
                            aria-label={option.label}
                          >
                            {option.emoji && (
                              <span aria-hidden="true">{option.emoji}</span>
                            )}
                            <span>{option.label}</span>
                          </button>
                        ))}
                        <button
                          onClick={doRestart}
                          className="text-gray-400 text-xs text-center w-full py-1 hover:text-gray-600 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 rounded"
                        >
                          ↺ Start over
                        </button>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
