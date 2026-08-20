export type BoardItem = {
  id: string;
  type: "image" | "quote" | "note";
  content: string;
  caption?: string;
};

export type Board = {
  id: string;
  title: string;
  category: string;
  cover: string;
  description: string;
  items: BoardItem[];
};

export type Milestone = { id: string; title: string; done: boolean; when: string };

export type Goal = {
  id: string;
  title: string;
  area: string;
  progress: number;
  milestones: Milestone[];
};

export type JournalEntry = {
  id: string;
  date: string;
  mood: "Radiant" | "Good" | "Okay" | "Low";
  title: string;
  body: string;
};

export type Quote = { id: string; text: string; author: string; theme: string };

const img = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const initialBoards: Board[] = [
  {
    id: "becoming",
    title: "A year of becoming",
    category: "2026",
    cover: img("1497366754035-f200968a6e72"),
    description: "The rooms, rhythms and rituals of the person I am growing into.",
    items: [
      { id: "b1", type: "image", content: img("1497366811353-6870744d04b2", 700), caption: "A calm studio" },
      { id: "b2", type: "quote", content: "Begin again, gently.", caption: "Morning mantra" },
      { id: "b3", type: "image", content: img("1522708323590-d24dbb6b0267", 700), caption: "Slow mornings" },
      { id: "b4", type: "note", content: "Write 300 words before the world wakes up.", caption: "Daily practice" },
      { id: "b5", type: "image", content: img("1493809842364-78817add7ffb", 700), caption: "Rest is productive" },
      { id: "b6", type: "quote", content: "Small steps make big visions believable.", caption: "North star" },
    ],
  },
  {
    id: "good-life",
    title: "The good life",
    category: "Soft life",
    cover: img("1470071459604-3b5ec3a7fe05"),
    description: "Golden hours, long dinners, and the courage to slow all the way down.",
    items: [
      { id: "g1", type: "image", content: img("1501785888041-af3ef285b470", 700), caption: "Sunset ritual" },
      { id: "g2", type: "image", content: img("1476514525535-07fb3b4ae5f1", 700), caption: "Road trips" },
      { id: "g3", type: "note", content: "One unhurried weekend every month.", caption: "Promise" },
      { id: "g4", type: "quote", content: "You do not have to do everything. Just the next kind thing.", caption: "A note for today" },
      { id: "g5", type: "image", content: img("1504674900247-0877df9cc836", 700), caption: "Long dinners" },
    ],
  },
  {
    id: "creative",
    title: "Creative energy",
    category: "Practice",
    cover: img("1449157291145-7efd050a4d0e"),
    description: "Making something imperfect, often, and out loud.",
    items: [
      { id: "c1", type: "image", content: img("1513364776144-60967b0f800f", 700), caption: "Play more" },
      { id: "c2", type: "quote", content: "Done is a kind of courage.", caption: "Studio wall" },
      { id: "c3", type: "image", content: img("1452587925148-ce544e77e70d", 700), caption: "Hands on clay" },
      { id: "c4", type: "note", content: "Share work with a friend every Sunday.", caption: "Accountability" },
    ],
  },
  {
    id: "home",
    title: "Feel at home in my body",
    category: "Wellbeing",
    cover: img("1518611012118-696072aa579a"),
    description: "Movement as kindness, not punishment.",
    items: [
      { id: "h1", type: "image", content: img("1571019613454-1cb2f99b2d8b", 700), caption: "Movement class" },
      { id: "h2", type: "note", content: "Walk without headphones twice a week.", caption: "Quiet" },
      { id: "h3", type: "quote", content: "Your body is the only home you never leave.", caption: "Reminder" },
    ],
  },
];

export const initialGoals: Goal[] = [
  {
    id: "joy",
    title: "Make room for joy",
    area: "Life rhythm",
    progress: 68,
    milestones: [
      { id: "m1", title: "Take a pottery class", done: true, when: "This week" },
      { id: "m2", title: "Read for 20 minutes", done: false, when: "Today" },
      { id: "m3", title: "Plan one unhurried weekend", done: false, when: "This month" },
    ],
  },
  {
    id: "practice",
    title: "Build a creative practice",
    area: "Creative energy",
    progress: 42,
    milestones: [
      { id: "m4", title: "Finish the first sketch", done: false, when: "This week" },
      { id: "m5", title: "Share work with a friend", done: false, when: "This week" },
      { id: "m6", title: "Make something every Sunday", done: false, when: "Ongoing" },
    ],
  },
  {
    id: "body",
    title: "Feel at home in my body",
    area: "Wellbeing",
    progress: 81,
    milestones: [
      { id: "m7", title: "Book the movement class", done: true, when: "Done" },
      { id: "m8", title: "Walk without headphones", done: false, when: "Today" },
      { id: "m9", title: "Protect a slow morning", done: false, when: "This week" },
    ],
  },
];

export const initialJournal: JournalEntry[] = [
  {
    id: "j1",
    date: "2026-08-20",
    mood: "Good",
    title: "A quiet, steady kind of day",
    body: "Read for twenty minutes before anyone needed me. It felt like keeping a promise to myself.",
  },
  {
    id: "j2",
    date: "2026-08-19",
    mood: "Radiant",
    title: "The pottery class",
    body: "Clay everywhere, laughing at how bad the first bowl was. I want more evenings like this.",
  },
  {
    id: "j3",
    date: "2026-08-17",
    mood: "Okay",
    title: "Slower than I wanted",
    body: "Didn't finish the sketch. Reminding myself that progress is still progress, even when it feels quiet.",
  },
];

export const quotes: Quote[] = [
  { id: "q1", text: "You do not have to do everything. Just the next kind thing.", author: "Dreamboard", theme: "Gentleness" },
  { id: "q2", text: "Progress is still progress, even when it feels quiet.", author: "Unknown", theme: "Patience" },
  { id: "q3", text: "Small steps make big visions believable.", author: "Dreamboard", theme: "Momentum" },
  { id: "q4", text: "What you do every day matters more than what you do once in a while.", author: "Gretchen Rubin", theme: "Rhythm" },
  { id: "q5", text: "The life you want is built in ordinary afternoons.", author: "Unknown", theme: "Presence" },
  { id: "q6", text: "Begin again, as many times as you need.", author: "Dreamboard", theme: "Beginnings" },
  { id: "q7", text: "Dreams don't need to be perfect. They need a place to land.", author: "Dreamboard", theme: "Clarity" },
  { id: "q8", text: "Rest is part of the work, not a reward for it.", author: "Unknown", theme: "Wellbeing" },
];

export const moods = ["Radiant", "Good", "Okay", "Low"] as const;
