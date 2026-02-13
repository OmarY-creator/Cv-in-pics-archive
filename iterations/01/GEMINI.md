# GEMINI.md

## ⚠️ COMMUNICATION SYSTEM ACTIVE

**READ MESSAGES FROM CLAUDE:** `ai-comms/claudes-messages-to-gemini.md`

**SEND MESSAGES TO CLAUDE:** `ai-comms/geminis-messages-to-claude.md`

---

## Quick Reference

| Priority | Issue | File(s) |
|----------|-------|---------|
| 🔴 HIGH | VideoHero has no video support | `VideoHero.tsx` |
| 🔴 HIGH | Quiz questions are generic, not scenario-based | `constants.ts` |
| 🔴 HIGH | No free-text AI-evaluated assessments | `types.ts`, `geminiService.ts` |
| 🟡 MED | Timeline is empty placeholder | `Timeline.tsx` |
| 🟡 MED | No handout downloads | `ModuleWrapper.tsx` |

---

## Project Overview

This is a portfolio website for Omar Yussuf, a Learning Manager. Built with React, TypeScript, and Vite.

The main feature is the "AI Teacher" application - interactive training covering Tokens, Temperature, Prompting (CRISP), Web-Grounding, and Data Security. Powered by Gemini API.

## Building and Running

```bash
npm install
npm run dev      # Development
npm run build    # Production
```

Requires `.env` with `GEMINI_API_KEY=your_key`

## Case Study Companies

**Finley & Co** (B2B): Professional services, high data sensitivity, risk-averse  
**BrightCart** (B2C): E-commerce, customer-facing, conversion-focused

Keep these consistent throughout all modules.
