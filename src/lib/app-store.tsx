import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialBoards,
  initialGoals,
  initialJournal,
  type Board,
  type BoardItem,
  type Goal,
  type JournalEntry,
} from "./mock-data";

export type User = { name: string; email: string };

type State = {
  user: User | null;
  boards: Board[];
  goals: Goal[];
  journal: JournalEntry[];
  streak: number;
};

const STORAGE_KEY = "dreamboard-state-v1";

const defaultState: State = {
  user: null,
  boards: initialBoards,
  goals: initialGoals,
  journal: initialJournal,
  streak: 12,
};

type Ctx = {
  ready: boolean;
  state: State;
  signIn: (name: string, email: string) => void;
  signOut: () => void;
  addBoard: (title: string, category: string, cover: string, description: string) => string;
  addBoardItem: (boardId: string, item: Omit<BoardItem, "id">) => void;
  removeBoardItem: (boardId: string, itemId: string) => void;
  reorderBoardItems: (boardId: string, from: number, to: number) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;
  addMilestone: (goalId: string, title: string) => void;
  addGoal: (title: string, area: string) => void;
  addEntry: (entry: Omit<JournalEntry, "id">) => void;
};

const AppContext = createContext<Ctx | null>(null);

const uid = () => Math.random().toString(36).slice(2, 10);

const recompute = (goal: Goal): Goal => {
  if (goal.milestones.length === 0) return { ...goal, progress: 0 };
  const done = goal.milestones.filter((m) => m.done).length;
  return { ...goal, progress: Math.round((done / goal.milestones.length) * 100) };
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(defaultState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, ready]);

  const signIn = useCallback((name: string, email: string) => {
    setState((s) => ({ ...s, user: { name, email } }));
  }, []);

  const signOut = useCallback(() => setState((s) => ({ ...s, user: null })), []);

  const addBoard: Ctx["addBoard"] = useCallback((title, category, cover, description) => {
    const id = uid();
    setState((s) => ({
      ...s,
      boards: [{ id, title, category, cover, description, items: [] }, ...s.boards],
    }));
    return id;
  }, []);

  const addBoardItem: Ctx["addBoardItem"] = useCallback((boardId, item) => {
    setState((s) => ({
      ...s,
      boards: s.boards.map((b) =>
        b.id === boardId ? { ...b, items: [...b.items, { ...item, id: uid() }] } : b,
      ),
    }));
  }, []);

  const removeBoardItem: Ctx["removeBoardItem"] = useCallback((boardId, itemId) => {
    setState((s) => ({
      ...s,
      boards: s.boards.map((b) =>
        b.id === boardId ? { ...b, items: b.items.filter((i) => i.id !== itemId) } : b,
      ),
    }));
  }, []);

  const reorderBoardItems: Ctx["reorderBoardItems"] = useCallback((boardId, from, to) => {
    setState((s) => ({
      ...s,
      boards: s.boards.map((b) => {
        if (b.id !== boardId) return b;
        const items = [...b.items];
        const [moved] = items.splice(from, 1);
        if (!moved) return b;
        items.splice(to, 0, moved);
        return { ...b, items };
      }),
    }));
  }, []);

  const toggleMilestone: Ctx["toggleMilestone"] = useCallback((goalId, milestoneId) => {
    setState((s) => ({
      ...s,
      goals: s.goals.map((g) =>
        g.id === goalId
          ? recompute({
              ...g,
              milestones: g.milestones.map((m) =>
                m.id === milestoneId ? { ...m, done: !m.done } : m,
              ),
            })
          : g,
      ),
    }));
  }, []);

  const addMilestone: Ctx["addMilestone"] = useCallback((goalId, title) => {
    setState((s) => ({
      ...s,
      goals: s.goals.map((g) =>
        g.id === goalId
          ? recompute({
              ...g,
              milestones: [...g.milestones, { id: uid(), title, done: false, when: "This week" }],
            })
          : g,
      ),
    }));
  }, []);

  const addGoal: Ctx["addGoal"] = useCallback((title, area) => {
    setState((s) => ({
      ...s,
      goals: [{ id: uid(), title, area, progress: 0, milestones: [] }, ...s.goals],
    }));
  }, []);

  const addEntry: Ctx["addEntry"] = useCallback((entry) => {
    setState((s) => ({ ...s, journal: [{ ...entry, id: uid() }, ...s.journal] }));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      ready,
      state,
      signIn,
      signOut,
      addBoard,
      addBoardItem,
      removeBoardItem,
      reorderBoardItems,
      toggleMilestone,
      addMilestone,
      addGoal,
      addEntry,
    }),
    [
      ready,
      state,
      signIn,
      signOut,
      addBoard,
      addBoardItem,
      removeBoardItem,
      reorderBoardItems,
      toggleMilestone,
      addMilestone,
      addGoal,
      addEntry,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function useOverallMomentum() {
  const { state } = useApp();
  if (state.goals.length === 0) return 0;
  return Math.round(state.goals.reduce((a, g) => a + g.progress, 0) / state.goals.length);
}
