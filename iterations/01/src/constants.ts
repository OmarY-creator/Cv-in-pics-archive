import { Question } from './types';

// Palette Constants (for reference in logic, visual is in Tailwind classes)
export const COLORS = {
  primary: '#1D4ED8',
  secondary: '#F97316',
  success: '#10B981',
  creativity: '#FBBF24',
  warning: '#DC2626',
};

// Diagnostic Questions
export const DIAGNOSTIC_QUESTIONS: Question[] = [
  {
    id: 'd1',
    text: "What is a 'token' in the context of Large Language Models?",
    options: [
      { id: 'a', text: 'A cryptocurrency used to pay for API calls', isCorrect: false },
      { id: 'b', text: 'A fundamental unit of text (part of a word) the model processes', isCorrect: true },
      { id: 'c', text: 'An authentication key for security', isCorrect: false },
    ],
    feedback: "Tokens are the building blocks of text for LLMs, roughly 4 characters or 0.75 words."
  },
  {
    id: 'd2',
    text: "Increasing the 'Temperature' parameter typically results in:",
    options: [
      { id: 'a', text: 'Faster response times', isCorrect: false },
      { id: 'b', text: 'More predictable and deterministic outputs', isCorrect: false },
      { id: 'c', text: 'More random and creative outputs', isCorrect: true },
    ],
    feedback: "Higher temperature adds randomness, leading to more creative (but less deterministic) results."
  },
  {
    id: 'd3',
    text: "What is 'Hallucination' in AI?",
    options: [
      { id: 'a', text: 'When the AI generates confident but factually incorrect information', isCorrect: true },
      { id: 'b', text: 'When the AI refuses to answer a question', isCorrect: false },
      { id: 'c', text: 'When the AI generates images instead of text', isCorrect: false },
    ],
    feedback: "Hallucinations occur when the model predicts tokens that look plausible but aren't factually grounded."
  },
  {
    id: 'd4',
    text: "Which approach helps most with ensuring specific output formats (like JSON)?",
    options: [
      { id: 'a', text: 'Being polite to the model', isCorrect: false },
      { id: 'b', text: 'Providing few-shot examples or specific system instructions', isCorrect: true },
      { id: 'c', text: 'Lowering the context window', isCorrect: false },
    ],
    feedback: "Examples (few-shot) and clear schemas guide the model's structural capabilities effectively."
  },
  {
    id: 'd5',
    text: "Why is it risky to put client names into a public LLM?",
    options: [
      { id: 'a', text: 'The model might misspell them', isCorrect: false },
      { id: 'b', text: 'Data may be used for training, potentially leaking confidentiality', isCorrect: true },
      { id: 'c', text: 'It costs more tokens', isCorrect: false },
    ],
    feedback: "Public models may use inputs for training, creating a risk of data leakage."
  }
];

// Module 1 Quiz
export const M1_QUESTIONS: Question[] = [
  {
    id: 'm1q1',
    text: "If you have a 10,000 word document, roughly how many tokens is that?",
    options: [
      { id: 'a', text: '~1,000 tokens', isCorrect: false },
      { id: 'b', text: '~13,000 tokens', isCorrect: true },
      { id: 'c', text: '~50,000 tokens', isCorrect: false },
    ],
    feedback: "1 word is approximately 1.3 tokens. 10,000 * 1.3 = 13,000."
  },
  {
    id: 'm1q2',
    text: "Why does 'context window' matter for business use cases?",
    options: [
      { id: 'a', text: 'It determines how fast the model generates text', isCorrect: false },
      { id: 'b', text: 'It limits how much information (documents, history) the model can remember at once', isCorrect: true },
      { id: 'c', text: 'It determines the monthly cost of the subscription', isCorrect: false },
    ],
    feedback: "When the context window is full, the model 'forgets' the earliest parts of the conversation."
  },
  {
    id: 'm1q3',
    text: "Which generates more tokens?",
    options: [
      { id: 'a', text: '10 pages of complex legal code', isCorrect: true },
      { id: 'b', text: '10 pages of simple children\'s story', isCorrect: false },
    ],
    feedback: "Actually, code and complex technical language often use more tokens per character due to unique syntax."
  }
];

// Module 2 Quiz
export const M2_QUESTIONS: Question[] = [
  {
    id: 'm2q1',
    text: "For a compliance report where accuracy is critical, what temperature should you use?",
    options: [
      { id: 'a', text: 'High (0.8 - 1.0)', isCorrect: false },
      { id: 'b', text: 'Low (0.0 - 0.2)', isCorrect: true },
      { id: 'c', text: 'Medium (0.5)', isCorrect: false },
    ],
    feedback: "Low temperature minimizes randomness, ideal for tasks requiring precision."
  },
  {
    id: 'm2q2',
    text: "If you want the model to brainstorm 50 unique marketing slogans, you should:",
    options: [
      { id: 'a', text: 'Increase temperature', isCorrect: true },
      { id: 'b', text: 'Decrease temperature', isCorrect: false },
    ],
    feedback: "High temperature encourages diversity in token selection, preventing repetitive or generic answers."
  },
  {
    id: 'm2q3',
    text: "What happens if Temperature is set to 0?",
    options: [
      { id: 'a', text: 'The model stops working', isCorrect: false },
      { id: 'b', text: 'The model becomes almost fully deterministic (same input = same output)', isCorrect: true },
    ],
    feedback: "Zero temperature makes the model always choose the most likely next token."
  }
];

// Module 3 Quiz
export const M3_QUESTIONS: Question[] = [
  {
    id: 'm3q1',
    text: "In the CRISP framework, what does 'R' stand for?",
    options: [
      { id: 'a', text: 'Reasoning', isCorrect: false },
      { id: 'b', text: 'Role', isCorrect: true },
      { id: 'c', text: 'Review', isCorrect: false },
    ],
    feedback: "R stands for Role - giving the AI a specific persona to adopt."
  },
  {
    id: 'm3q2',
    text: "Which prompt is better structured?",
    options: [
      { id: 'a', text: 'Write an email about the project update.', isCorrect: false },
      { id: 'b', text: 'Act as a PM. Write a brief update email for the Client regarding Project X. Tone: Professional.', isCorrect: true },
    ],
    feedback: "The second prompt provides Role, Context, and Constraints (Tone/Length)."
  },
  {
    id: 'm3q3',
    text: "What is 'Few-Shot' prompting?",
    options: [
      { id: 'a', text: 'Asking the model only a few times', isCorrect: false },
      { id: 'b', text: 'Providing a few examples (shots) of the desired output in the prompt', isCorrect: true },
    ],
    feedback: "Examples are powerful 'shots' that guide the model's pattern matching."
  }
];

// Module 4 Quiz
export const M4_QUESTIONS: Question[] = [
  {
    id: 'm4q1',
    text: "Which task specifically requires 'Web-Grounding'?",
    options: [
      { id: 'a', text: 'Summarizing a text you pasted', isCorrect: false },
      { id: 'b', text: 'Checking today\'s stock price', isCorrect: true },
      { id: 'c', text: 'Writing a poem about cats', isCorrect: false },
    ],
    feedback: "Models have a knowledge cutoff. Real-time data like stock prices requires web access."
  },
  {
    id: 'm4q2',
    text: "What is a potential downside of web-grounding?",
    options: [
      { id: 'a', text: 'It makes the model less creative', isCorrect: false },
      { id: 'b', text: 'It can be slower and occasionally cite incorrect sources', isCorrect: true },
    ],
    feedback: "Retrieval takes time, and the model relies on the quality of search results found."
  },
  {
    id: 'm4q3',
    text: "If a model says 'I don't have access to real-time data', it means:",
    options: [
      { id: 'a', text: 'It is broken', isCorrect: false },
      { id: 'b', text: 'It is relying solely on its training data', isCorrect: true },
    ],
    feedback: "Standard models are frozen in time based on when they were trained."
  }
];

// Module 5 Quiz
export const M5_QUESTIONS: Question[] = [
  {
    id: 'm5q1',
    text: "Is it safe to paste a customer's credit card number if you ask the AI to delete it after?",
    options: [
      { id: 'a', text: 'Yes, if the prompt is secure', isCorrect: false },
      { id: 'b', text: 'No, never paste sensitive financial data', isCorrect: true },
      { id: 'c', text: 'Only if using a paid account', isCorrect: false },
    ],
    feedback: "Never share sensitive financial data. Once sent, you cannot guarantee it hasn't been logged."
  },
  {
    id: 'm5q2',
    text: "How should you handle client names in prompts?",
    options: [
      { id: 'a', text: 'Use them freely', isCorrect: false },
      { id: 'b', text: 'Anonymize them (e.g., Client A, Company X)', isCorrect: true },
    ],
    feedback: "Anonymization protects confidentiality while still allowing the AI to do the work."
  },
  {
    id: 'm5q3',
    text: "Which data is generally safe to share with public AI?",
    options: [
      { id: 'a', text: 'Internal salary spreadsheets', isCorrect: false },
      { id: 'b', text: 'Publicly available press releases', isCorrect: true },
    ],
    feedback: "Public data is already out there, so the risk of leakage is minimal."
  }
];