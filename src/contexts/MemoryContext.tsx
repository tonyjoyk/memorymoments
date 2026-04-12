import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Memory, EmotionType, ActionStep } from '@/lib/constants';

type Action =
  | { type: 'ADD_MEMORY'; payload: Memory }
  | { type: 'UPDATE_MEMORY'; payload: Memory }
  | { type: 'DELETE_MEMORY'; payload: string }
  | { type: 'TOGGLE_ACTION'; payload: { memoryId: string; actionId: string } }
  | { type: 'COMPLETE_MEMORY'; payload: { id: string; reflection?: string; emotions?: EmotionType[] } }
  | { type: 'LOAD'; payload: Memory[] };

interface MemoryState {
  memories: Memory[];
}

const reducer = (state: MemoryState, action: Action): MemoryState => {
  switch (action.type) {
    case 'ADD_MEMORY':
      return { memories: [action.payload, ...state.memories] };
    case 'UPDATE_MEMORY':
      return {
        memories: state.memories.map(m => m.id === action.payload.id ? action.payload : m),
      };
    case 'DELETE_MEMORY':
      return { memories: state.memories.filter(m => m.id !== action.payload) };
    case 'TOGGLE_ACTION':
      return {
        memories: state.memories.map(m => {
          if (m.id !== action.payload.memoryId) return m;
          return {
            ...m,
            actions: m.actions.map(a =>
              a.id === action.payload.actionId ? { ...a, completed: !a.completed } : a
            ),
          };
        }),
      };
    case 'COMPLETE_MEMORY':
      return {
        memories: state.memories.map(m => {
          if (m.id !== action.payload.id) return m;
          return {
            ...m,
            isCompleted: true,
            reflection: action.payload.reflection || m.reflection,
            emotions: action.payload.emotions || m.emotions,
          };
        }),
      };
    case 'LOAD':
      return { memories: action.payload };
    default:
      return state;
  }
};

const STORAGE_KEY = 'memory-moments-data';

function loadMemories(): Memory[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

interface MemoryContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void;
  deleteMemory: (id: string) => void;
  toggleAction: (memoryId: string, actionId: string) => void;
  completeMemory: (id: string, reflection?: string, emotions?: EmotionType[]) => void;
  getMemory: (id: string) => Memory | undefined;
}

const MemoryContext = createContext<MemoryContextType | null>(null);

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { memories: loadMemories() });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.memories));
  }, [state.memories]);

  const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>) => {
    dispatch({
      type: 'ADD_MEMORY',
      payload: {
        ...memory,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    });
  };

  const deleteMemory = (id: string) => {
    dispatch({ type: 'DELETE_MEMORY', payload: id });
  };

  const toggleAction = (memoryId: string, actionId: string) => {
    dispatch({ type: 'TOGGLE_ACTION', payload: { memoryId, actionId } });
  };

  const completeMemory = (id: string, reflection?: string, emotions?: EmotionType[]) => {
    dispatch({ type: 'COMPLETE_MEMORY', payload: { id, reflection, emotions } });
  };

  const getMemory = (id: string) => state.memories.find(m => m.id === id);

  return (
    <MemoryContext.Provider value={{ memories: state.memories, addMemory, deleteMemory, toggleAction, completeMemory, getMemory }}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemories() {
  const ctx = useContext(MemoryContext);
  if (!ctx) throw new Error('useMemories must be used within MemoryProvider');
  return ctx;
}
