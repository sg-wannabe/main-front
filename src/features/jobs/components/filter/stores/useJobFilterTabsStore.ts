import { create } from "zustand";

type FilterTabStore = {
  showLocation: boolean;
  showJobs: boolean;
  showOtherConditions: boolean;
  setShowLocation: (value: boolean) => void;
  setShowJobs: (value: boolean) => void;
  setShowOtherConditions: (value: boolean) => void;
};

export const useFilterTabStore = create<FilterTabStore>((set) => ({
  showLocation: false,
  showJobs: false,
  showOtherConditions: false,
  setShowLocation: (value) =>
    set(() => ({
      showLocation: value,
      showJobs: false,
      showOtherConditions: false,
    })),
  setShowJobs: (value) =>
    set(() => ({
      showJobs: value,
      showLocation: false,
      showOtherConditions: false,
    })),
  setShowOtherConditions: (value) =>
    set(() => ({
      showOtherConditions: value,
      showLocation: false,
      showJobs: false,
    })),
}));
