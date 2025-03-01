import { create } from 'zustand';

interface FilterState {
  status: string | undefined;
  gender: string | undefined;
  page: number;
  setStatus: (status: string | undefined) => void;
  setGender: (gender: string | undefined) => void;
  setPage: (page: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  status: undefined,
  gender: undefined,
  page: 1,
  setStatus: (status) => set({ status }),
  setGender: (gender) => set({ gender }),
  setPage: (page) => set({ page }),
}));