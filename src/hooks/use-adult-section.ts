import { create } from 'zustand';

interface AdultSectionState {
  isUnlocked: boolean;
  unlock: () => void;
  lock: () => void;
}

export const useAdultSection = create<AdultSectionState>((set) => ({
  isUnlocked: false,
  unlock: () => set({ isUnlocked: true }),
  lock: () => set({ isUnlocked: false }),
}));
