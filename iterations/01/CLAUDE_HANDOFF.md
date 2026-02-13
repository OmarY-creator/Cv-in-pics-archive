# CLAUDE → GEMINI HANDOFF DOCUMENT
## AI Teacher Portfolio - Full Diagnostic & Implementation Guide
**Created:** December 7, 2025  
**Priority:** URGENT - Portfolio needed in hours  
**Owner:** Omar Yussuf

---

## 🎯 THE CORE PROBLEM

The current implementation has **content** but lacks **pedagogical flow**. The modules teach AI concepts, but don't follow the intended learning journey:

```
INTENDED FLOW (not implemented):
1. 🎬 VIDEO: Show Finley & BrightCart's PROBLEM (what went wrong)
2. 📚 CONTENT: Teach what learners need to know to FIX that problem
3. ✅ ASSESSMENT: Test if they truly understand (varied question types)
4. 📋 HANDOUT: Give them something to "carry on learning"
```

**Current state:** Content exists but problems aren't dramatized, assessments are generic MC, no handouts.

---

## 🏢 THE TWO COMPANIES (Case Studies)

These MUST be distinct and consistent throughout:

### Finley & Co (B2B Professional Services)
- **Industry:** Management Consulting / Legal / Advisory
- **Data sensitivity:** HIGH (M&A deals, client financials, regulatory compliance)
- **AI risk profile:** Hallucination = regulatory failure, Data leak = career-ending
- **Tone:** Formal, precise, risk-averse
- **Key stakeholder:** Consultant preparing client deliverable

### BrightCart (B2C E-commerce)
- **Industry:** Online Retail
- **Data sensitivity:** MEDIUM (customer PII, payment info, inventory)
- **AI risk profile:** Bad chatbot = lost sale, Generic copy = brand damage
- **Tone:** Energetic, creative, conversion-focused
- **Key stakeholder:** Marketing/Support team member

---

## 🔴 CRITICAL ISSUES BY COMPONENT

### 1. VideoHero Component (`src/components/VideoHero.tsx`)
**Status:** ❌ Non-functional placeholder

**Current behavior:**
- Uses Unsplash stock images (via URL)
- "Watch Intro Video" button does nothing
- No actual video integration

**Required changes:**
```tsx
// Add video support - options:
// 1. YouTube embed (easiest)
// 2. Self-hosted MP4 in /public/videos/
// 3. Vimeo embed

interface VideoHeroProps {
  moduleId: number;
  title: string;
  subtitle: string;
  description: string;
  videoUrl?: string;        // ADD: YouTube/Vimeo URL or local path
  thumbnailUrl?: string;    // ADD: Custom thumbnail
  onVideoEnd?: () => void;  // ADD: Callback when video completes
}
```

**Omar needs to record:**
- Welcome video (homepage)
- Module 1 intro: Finley's hallucination crisis + BrightCart's chatbot failure
- Module 2 intro: Compliance report gone creative + boring product copy
- Module 3 intro: Vague prompt = vague output examples
- Module 4 intro: Outdated regulations + out-of-stock inventory
- Module 5 intro: M&A data leak scenario

---

### 2. Quiz Questions (`src/constants.ts`)
**Status:** ⚠️ Generic AI literacy, not tied to case studies

**Current M1 example:**
```typescript
{
  id: 'm1q1',
  text: "If you have a 10,000 word document, roughly how many tokens is that?",
  // This is generic AI knowledge, not applied to Finley/BrightCart
}
```

**Required transformation - make questions SCENARIO-BASED:**
```typescript
{
  id: 'm1q1',
  text: "Finley's consultant uploads a 50-page M&A proposal (approx. 15,000 words). The AI 'forgets' the formatting instructions by the end. What likely caused this?",
  options: [
    { id: 'a', text: 'The document exceeded the context window (token limit)', isCorrect: true },
    { id: 'b', text: 'The AI was set to high temperature', isCorrect: false },
    { id: 'c', text: 'The prompt was too vague', isCorrect: false },
  ],
  feedback: "Long documents consume tokens rapidly. When the context window fills, the model 'forgets' early instructions - exactly what happened to Finley's consultant."
}
```

---

### 3. Assessment Types
**Status:** ❌ All Multiple Choice - needs variety

**Required assessment types per module:**

| Module | MC Questions | Free-Text (AI-Evaluated) | Interactive |
|--------|--------------|--------------------------|-------------|
| 1 (Tokens) | 2 | 0 | Token Calculator ✅ |
| 2 (Temp) | 1 | 1 ("Set temperature for this Finley task, explain why") | Temp Slider ✅ |
| 3 (CRISP) | 1 | 1 ("Write a CRISP prompt for BrightCart's product launch") | CRISP Builder ✅ |
| 4 (Grounding) | 2 | 1 ("Explain when Finley should/shouldn't use web grounding") | Grounding Toggle ✅ |
| 5 (Security) | 2 | 1 ("Anonymize this text, explain your changes") | Risk Scanner ✅ |

**Free-text evaluation requires:**
```typescript
// New type needed in types.ts
interface FreeTextQuestion {
  id: string;
  type: 'free_text';
  prompt: string;
  rubric: string[];           // Criteria for AI to evaluate against
  exampleAnswer: string;      // Model answer for comparison
  minWords?: number;
  maxWords?: number;
}

// Rubric example for Module 3:
rubric: [
  "Includes Context (background/situation)",
  "Specifies Role for the AI",
  "Clear Instruction (what to do)",
  "Provides Specs/Constraints",
  "Includes Example if appropriate"
]
```

**Gemini integration for evaluation:**
```typescript
// In geminiService.ts - ADD this function
export async function evaluateFreeText(
  answer: string, 
  question: FreeTextQuestion
): Promise<{
  score: number;           // 0-100
  feedback: string;        // Specific feedback
  criteriaMatched: string[]; // Which rubric items passed
}> {
  const prompt = `
You are evaluating a learner's response in an AI training module.

QUESTION: ${question.prompt}

LEARNER'S ANSWER:
${answer}

RUBRIC (criteria to evaluate against):
${question.rubric.map((r, i) => `${i+1}. ${r}`).join('\n')}

EXAMPLE OF A GOOD ANSWER:
${question.exampleAnswer}

Evaluate the learner's answer against each rubric criterion.
Return JSON: { score: 0-100, feedback: "specific constructive feedback", criteriaMatched: ["criterion 1", "criterion 2"] }
`;
  // Call Gemini API...
}
```

---

### 4. Module Content - Problem Introduction
**Status:** ⚠️ Problems mentioned but not dramatized

Each module needs a clear "hook" that shows the CONSEQUENCE of not knowing this:

**Module 1 - Add at start:**
```tsx
<section className="mb-12">
  <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
    <h3 className="font-bold text-red-800 mb-2">🎬 The Incident</h3>
    <p className="text-gray-700 mb-4">
      <strong>Finley & Co:</strong> Consultant uploads 50-page M&A proposal. 
      AI summarizes first 20 pages perfectly, then starts making up regulations 
      that don't exist. Client presents to board. Board member spots the error.
    </p>
    <p className="text-gray-700">
      <strong>BrightCart:</strong> Customer asks chatbot about hiking socks. 
      Bot recommends item that's been discontinued for 6 months. Customer clicks, 
      gets 404 error, abandons cart, leaves 1-star review.
    </p>
    <p className="text-sm text-red-600 font-medium mt-4">
      Both failures trace back to one root cause: not understanding how AI 
      processes information. That's what we're fixing today.
    </p>
  </div>
</section>
```

---

### 5. Timeline Component (`src/components/Timeline.tsx`)
**Status:** ❌ Empty placeholder

**Available images in `/public/timeline/`:**
- `Omar_Hero.png` - Hero image for about section
- `amsterdam.jpg.jpg` - Work/travel photo
- `experiantial.jpg` - Workshop/training delivery
- `experiantial2.jpg` - Workshop/training delivery
- `manchester.jpg` - Manchester location
- `noody_manchesterr.jpg` - Manchester with nephew?

**Required implementation:**
```tsx
const timelineEvents = [
  {
    year: "2019",
    title: "Started in HR",
    description: "UniTrust Protection Services - Entry into L&D",
    image: null
  },
  {
    year: "2021",
    title: "Checkout.com",
    description: "Scaled learning programs to 300+ managers globally",
    image: "/timeline/experiantial.jpg"
  },
  {
    year: "2024",
    title: "KPMG UK",
    description: "L&D Business Partner - Amplify Your Learning series, Spark AI rollout",
    image: "/timeline/manchester.jpg"
  },
  {
    year: "2025",
    title: "Portfolio Projects",
    description: "AI Teacher, Skills Atlas - demonstrating L&D + AI expertise",
    image: "/timeline/experiantial2.jpg"
  }
];
```

---

### 6. Handouts (Not Yet Implemented)
**Status:** ❌ Missing entirely

Each module needs a downloadable PDF or printable summary:

**Create `/public/handouts/` folder with:**
- `module1_token_cheatsheet.pdf` - Token estimation table, context window sizes by model
- `module2_temperature_guide.pdf` - When to use low/medium/high, decision tree
- `module3_crisp_template.pdf` - Blank CRISP framework to fill in
- `module4_grounding_checklist.pdf` - When to enable web grounding, verification steps
- `module5_anonymization_guide.pdf` - Data classification, safe replacement patterns

**Add download button to ModuleWrapper:**
```tsx
{handoutUrl && (
  <a 
    href={handoutUrl} 
    download 
    className="inline-flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-lg"
  >
    <Download size={16} /> Download Handout
  </a>
)}
```

---

## 📊 ASSESSMENT FRAMEWORK REFERENCE

Omar requested assessments be "based on known and respectable AI knowledge measuring assessments."

**Recommended frameworks to cite:**

1. **AI Literacy Scale (Long & Magerko, 2020)** - Academic measure of AI understanding
   - Recognition, Understanding, Evaluation, Application levels
   
2. **DigComp 2.2 (European Commission)** - Digital competence framework
   - Section 5: Problem-solving with digital technologies
   
3. **Bloom's Taxonomy Applied:**
   | Level | Question Type | Example |
   |-------|--------------|---------|
   | Remember | MC: Definition | "What is a token?" |
   | Understand | MC: Explanation | "Why does high temp = more creative?" |
   | Apply | Free-text | "Set temperature for this Finley task" |
   | Analyze | Scenario MC | "What caused this failure?" |
   | Evaluate | Free-text | "Should BrightCart use grounding here?" |
   | Create | Free-text | "Write a CRISP prompt for..." |

---

## 🎬 VIDEO RECORDING GUIDE FOR OMAR

**Format:** 2-3 minutes each, talking head with screen share when needed

**Script structure for each module intro:**

```
[0:00-0:30] THE HOOK
"Let me tell you about [Company]'s [Person] who [made a mistake]..."

[0:30-1:30] THE PROBLEM
"What went wrong was... [explain the AI failure]"
"This cost them [consequence - trust, money, time]"

[1:30-2:30] THE SOLUTION PREVIEW
"In this module, you'll learn [specific skill]"
"By the end, you'll be able to [concrete capability]"
"Let's dive in."
```

**Technical setup:**
- Record with consistent background (home office fine)
- Good lighting on face
- External mic if possible
- 1080p minimum
- Export as MP4, under 50MB per video

---

## ✅ IMPLEMENTATION PRIORITY ORDER

1. **[HIGH] Fix VideoHero** - Add video embed support, even if videos aren't recorded yet
2. **[HIGH] Rewrite quiz questions** - Make them scenario-based (Finley/BrightCart)
3. **[HIGH] Add free-text evaluation** - Integrate Gemini for rubric-based scoring
4. **[MEDIUM] Build Timeline** - Use available images
5. **[MEDIUM] Create handout PDFs** - Can be simple one-pagers
6. **[LOW] Polish problem introductions** - Add dramatic "incident" sections

---

## 🔗 FILES TO MODIFY

| File | Changes Needed |
|------|---------------|
| `src/components/VideoHero.tsx` | Add video embed support |
| `src/constants.ts` | Rewrite all questions to be scenario-based |
| `src/types.ts` | Add `FreeTextQuestion` type |
| `src/services/geminiService.ts` | Add `evaluateFreeText()` function |
| `src/components/ModuleWrapper.tsx` | Add handout download, free-text quiz support |
| `src/components/Timeline.tsx` | Full implementation needed |
| `src/components/modules/Module1-5.tsx` | Add "incident" sections at start |

---

## 📞 QUESTIONS FOR OMAR

Before proceeding, Gemini should clarify:

1. **Video hosting:** YouTube (public/unlisted), Vimeo, or self-hosted MP4?
2. **Handout format:** PDF (requires generation), or Markdown rendered in-app?
3. **Free-text scoring:** Show score immediately, or store for review?
4. **Timeline depth:** Just career milestones, or include personal touches?

---

**END OF HANDOFF DOCUMENT**

*This file is the single source of truth for what needs to be done. Gemini should read this completely before making any changes.*
