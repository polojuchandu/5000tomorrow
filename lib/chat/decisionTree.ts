export type NodeType =
  | "message"    // bot speaks, then auto advances
  | "buttons"    // single choice buttons
  | "radio"      // radio button group (pick one, then confirm)
  | "checklist"  // checkbox group (pick multiple, then continue)
  | "end"        // terminal node — show final CTA

export type TreeNode = {
  id: string
  type: NodeType
  botMessage: string
  delayMs?: number
  options?: {
    label: string
    emoji?: string
    nextNodeId: string
    action?: "apply" | "call" | "restart"
  }[]
}

export const decisionTree: Record<string, TreeNode> = {

  // ── ENTRY ──────────────────────────────────────────────

  "start": {
    id: "start",
    type: "buttons",
    botMessage: "Hi! 👋 I'm here to help you get up to $5,000 before your case settles. What brings you here today?",
    options: [
      { label: "I was in an accident", emoji: "🚗", nextNodeId: "accident_type" },
      { label: "I need money while waiting for my settlement", emoji: "💰", nextNodeId: "has_attorney" },
      { label: "I want to understand how this works", emoji: "🤔", nextNodeId: "how_it_works" },
      { label: "I want to check if I qualify", emoji: "✅", nextNodeId: "qualify_check_1" },
    ]
  },

  // ── HOW IT WORKS BRANCH ────────────────────────────────

  "how_it_works": {
    id: "how_it_works",
    type: "buttons",
    botMessage: "Great question! 5000 Tomorrow provides pre-settlement legal funding — that means we give you money NOW while you wait for your lawsuit to settle. It is NOT a loan. You only repay if you WIN. Which part would you like to know more about?",
    options: [
      { label: "How fast can I get the money?", emoji: "⚡", nextNodeId: "speed" },
      { label: "How much can I get?", emoji: "💵", nextNodeId: "amount" },
      { label: "What if I lose my case?", emoji: "⚖️", nextNodeId: "if_lose" },
      { label: "Is this a loan?", emoji: "🏦", nextNodeId: "not_a_loan" },
      { label: "Check if I qualify", emoji: "✅", nextNodeId: "qualify_check_1" },
    ]
  },

  "speed": {
    id: "speed",
    type: "buttons",
    botMessage: "Our process is fast ⚡\n\n1️⃣ Apply free — 5 minutes\n2️⃣ We contact your attorney\n3️⃣ Review your case\n4️⃣ Decision in as little as 24 hours\n5️⃣ Money sent directly to you\n\nNo waiting months for your settlement. What would you like to do next?",
    options: [
      { label: "Apply Now — It's Free", emoji: "🚀", nextNodeId: "apply_cta", action: "apply" },
      { label: "Check if I qualify first", emoji: "✅", nextNodeId: "qualify_check_1" },
      { label: "Learn more about this", emoji: "🤔", nextNodeId: "how_it_works" },
    ]
  },

  "amount": {
    id: "amount",
    type: "buttons",
    botMessage: "We provide up to $5,000 in pre-settlement funding 💵\n\nThe exact amount depends on:\n• The strength of your case\n• The estimated settlement value\n• Your attorney's assessment\n\nNot your credit score. Not your job. Just your case.",
    options: [
      { label: "Apply to find out my amount", emoji: "📋", nextNodeId: "apply_cta", action: "apply" },
      { label: "What cases do you fund?", emoji: "⚖️", nextNodeId: "accident_type" },
      { label: "Do I qualify?", emoji: "✅", nextNodeId: "qualify_check_1" },
    ]
  },

  "if_lose": {
    id: "if_lose",
    type: "buttons",
    botMessage: "If you lose your case — you owe us NOTHING. Zero. 🙌\n\nThis is called non-recourse funding. We take on the risk, not you. If your case doesn't win or settle, your debt to us is completely wiped. That's what makes this different from any loan.",
    options: [
      { label: "That sounds great — apply now", emoji: "🚀", nextNodeId: "apply_cta", action: "apply" },
      { label: "So it's really not a loan?", emoji: "🏦", nextNodeId: "not_a_loan" },
      { label: "Check if I qualify", emoji: "✅", nextNodeId: "qualify_check_1" },
    ]
  },

  "not_a_loan": {
    id: "not_a_loan",
    type: "buttons",
    botMessage: "Correct — this is NOT a loan 🙅\n\nHere's the difference:\n\n❌ Loan → monthly payments, credit check, owe money regardless\n✅ Legal Funding → no payments, no credit check, only repay if you WIN\n\nWe only make money if you do. Simple as that.",
    options: [
      { label: "I'm ready to apply", emoji: "📋", nextNodeId: "apply_cta", action: "apply" },
      { label: "What if I lose?", emoji: "⚖️", nextNodeId: "if_lose" },
      { label: "Do I qualify?", emoji: "✅", nextNodeId: "qualify_check_1" },
    ]
  },

  // ── ACCIDENT TYPE BRANCH ───────────────────────────────

  "accident_type": {
    id: "accident_type",
    type: "buttons",
    botMessage: "We fund most injury cases in Michigan. What type of case do you have?",
    options: [
      { label: "Car / Auto Accident", emoji: "🚗", nextNodeId: "has_attorney" },
      { label: "Truck Accident", emoji: "🚛", nextNodeId: "has_attorney" },
      { label: "Motorcycle Accident", emoji: "🏍️", nextNodeId: "has_attorney" },
      { label: "Pedestrian Accident", emoji: "🚶", nextNodeId: "has_attorney" },
      { label: "Uber / Lyft Accident", emoji: "🚘", nextNodeId: "has_attorney" },
      { label: "Slip and Fall", emoji: "⚠️", nextNodeId: "has_attorney" },
      { label: "Workers Compensation", emoji: "👷", nextNodeId: "has_attorney" },
      { label: "Workplace Injury", emoji: "🏗️", nextNodeId: "has_attorney" },
      { label: "Wrongful Death", emoji: "🕊️", nextNodeId: "wrongful_death" },
      { label: "Other Injury", emoji: "🤕", nextNodeId: "has_attorney" },
    ]
  },

  "wrongful_death": {
    id: "wrongful_death",
    type: "buttons",
    botMessage: "We're truly sorry for your loss 🕊️\n\nWe do provide funding for wrongful death cases in Michigan. These cases are handled with the utmost care and compassion. Does the family have an attorney representing the case?",
    options: [
      { label: "Yes, we have an attorney", emoji: "✅", nextNodeId: "michigan_check" },
      { label: "No attorney yet", emoji: "❌", nextNodeId: "no_attorney" },
    ]
  },

  // ── QUALIFICATION FLOW ─────────────────────────────────

  "qualify_check_1": {
    id: "qualify_check_1",
    type: "buttons",
    botMessage: "Let's find out if you qualify in 3 quick questions. First — are you located in Michigan?",
    options: [
      { label: "Yes, I'm in Michigan", emoji: "✅", nextNodeId: "qualify_check_2" },
      { label: "No, I'm in another state", emoji: "❌", nextNodeId: "not_michigan" },
    ]
  },

  "not_michigan": {
    id: "not_michigan",
    type: "buttons",
    botMessage: "Unfortunately we currently only serve Michigan residents 🙁\n\nWe are Michigan-only and cannot fund cases outside the state at this time. We hope to expand soon!",
    options: [
      { label: "Start over", emoji: "🔄", nextNodeId: "start", action: "restart" },
    ]
  },

  "qualify_check_2": {
    id: "qualify_check_2",
    type: "buttons",
    botMessage: "Great — you're in Michigan ✅ Second question: Do you have an active injury lawsuit?",
    options: [
      { label: "Yes, I have an active case", emoji: "✅", nextNodeId: "qualify_check_3" },
      { label: "My case is just starting", emoji: "🔄", nextNodeId: "case_starting" },
      { label: "No case yet", emoji: "❌", nextNodeId: "no_case" },
    ]
  },

  "case_starting": {
    id: "case_starting",
    type: "buttons",
    botMessage: "Even if your case is just getting started, you may still qualify! As long as you have an attorney and an active claim, we can review your case. Do you have an attorney?",
    options: [
      { label: "Yes I have an attorney", emoji: "✅", nextNodeId: "qualified" },
      { label: "No attorney yet", emoji: "❌", nextNodeId: "no_attorney" },
    ]
  },

  "no_case": {
    id: "no_case",
    type: "buttons",
    botMessage: "You'll need an active lawsuit to qualify for funding 📋\n\nIf you were recently injured and are planning to file a claim, reach out to a personal injury attorney first — then come back to us. We can fund you once your case is active.",
    options: [
      { label: "I'll get an attorney and come back", emoji: "👍", nextNodeId: "start", action: "restart" },
      { label: "Call us for guidance", emoji: "📞", nextNodeId: "call_cta", action: "call" },
    ]
  },

  "qualify_check_3": {
    id: "qualify_check_3",
    type: "buttons",
    botMessage: "Almost there! Last question: Do you currently have a personal injury attorney representing you?",
    options: [
      { label: "Yes, I have an attorney", emoji: "✅", nextNodeId: "qualified" },
      { label: "No attorney yet", emoji: "❌", nextNodeId: "no_attorney" },
      { label: "I'm still looking for one", emoji: "🔍", nextNodeId: "no_attorney" },
    ]
  },

  "has_attorney": {
    id: "has_attorney",
    type: "buttons",
    botMessage: "To qualify for funding, you need an attorney representing your case. Do you currently have one?",
    options: [
      { label: "Yes, I have an attorney", emoji: "✅", nextNodeId: "michigan_check" },
      { label: "No, I don't have one yet", emoji: "❌", nextNodeId: "no_attorney" },
    ]
  },

  "michigan_check": {
    id: "michigan_check",
    type: "buttons",
    botMessage: "Are you located in Michigan?",
    options: [
      { label: "Yes — I'm in Michigan", emoji: "✅", nextNodeId: "qualified" },
      { label: "No — different state", emoji: "❌", nextNodeId: "not_michigan" },
    ]
  },

  "no_attorney": {
    id: "no_attorney",
    type: "buttons",
    botMessage: "You need a personal injury attorney to qualify for funding 👨‍⚖️\n\nOnce you have legal representation and an active case, come back — the application takes less than 5 minutes. Do you need help finding one?",
    options: [
      { label: "Yes, help me find an attorney", emoji: "🔍", nextNodeId: "find_attorney" },
      { label: "I'll find one and come back", emoji: "👍", nextNodeId: "start", action: "restart" },
      { label: "Call us for help", emoji: "📞", nextNodeId: "call_cta", action: "call" },
    ]
  },

  "find_attorney": {
    id: "find_attorney",
    type: "buttons",
    botMessage: "We can help connect you with a Michigan personal injury attorney 📞\n\nCall us at 1-877-TODAY-5K and our team will point you in the right direction — completely free of charge.",
    options: [
      { label: "Call 1-877-TODAY-5K Now", emoji: "📞", nextNodeId: "call_cta", action: "call" },
      { label: "I'll find my own — come back later", emoji: "👍", nextNodeId: "start", action: "restart" },
    ]
  },

  // ── QUALIFIED ──────────────────────────────────────────

  "qualified": {
    id: "qualified",
    type: "buttons",
    botMessage: "🎉 Great news — you likely qualify!\n\n✅ Michigan resident\n✅ Active injury case\n✅ Attorney representation\n\nYou meet all 3 requirements. Applying is free and takes less than 5 minutes. What would you like to do?",
    options: [
      { label: "Apply Now — It's Free 🚀", emoji: "", nextNodeId: "apply_cta", action: "apply" },
      { label: "How much can I get?", emoji: "💵", nextNodeId: "amount" },
      { label: "How fast will I get money?", emoji: "⚡", nextNodeId: "speed" },
      { label: "Call instead", emoji: "📞", nextNodeId: "call_cta", action: "call" },
    ]
  },

  // ── MONEY USE BRANCH ───────────────────────────────────

  "money_use": {
    id: "money_use",
    type: "checklist",
    botMessage: "The funding can be used for anything you need while waiting for your settlement. What are you planning to use the money for? (Select all that apply)",
    options: [
      { label: "Rent or mortgage", emoji: "🏠", nextNodeId: "qualified" },
      { label: "Groceries and food", emoji: "🛒", nextNodeId: "qualified" },
      { label: "Medical bills", emoji: "🏥", nextNodeId: "qualified" },
      { label: "Car payments", emoji: "🚗", nextNodeId: "qualified" },
      { label: "Utility bills", emoji: "💡", nextNodeId: "qualified" },
      { label: "Childcare", emoji: "👶", nextNodeId: "qualified" },
      { label: "Other daily expenses", emoji: "💼", nextNodeId: "qualified" },
    ]
  },

  // ── TERMINAL NODES ─────────────────────────────────────

  "apply_cta": {
    id: "apply_cta",
    type: "end",
    botMessage: "You're being redirected to our free application now 🚀\n\nIt takes less than 5 minutes. Have your attorney's contact info ready. We'll be in touch within 24 hours!",
    options: [
      { label: "Go to Application →", emoji: "", nextNodeId: "apply_cta", action: "apply" },
      { label: "Call instead: 1-877-TODAY-5K", emoji: "📞", nextNodeId: "call_cta", action: "call" },
    ]
  },

  "call_cta": {
    id: "call_cta",
    type: "end",
    botMessage: "Call us now — our Michigan team is ready to help 📞\n\n1-877-TODAY-5K\n(1-877-863-2995)\n\n📍 28588 Northwestern Hwy\nSouthfield, MI 48034",
    options: [
      { label: "Call 1-877-TODAY-5K", emoji: "📞", nextNodeId: "call_cta", action: "call" },
      { label: "Apply online instead", emoji: "📋", nextNodeId: "apply_cta", action: "apply" },
      { label: "Start over", emoji: "🔄", nextNodeId: "start", action: "restart" },
    ]
  },

}

export function getNode(id: string): TreeNode {
  return decisionTree[id] ?? decisionTree["start"]
}
