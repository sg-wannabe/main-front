import { City, District, Town } from "@/api/filter";
import { create } from "zustand";

interface FiltersState {
  city?: City;
  setCity: (city: City) => void;
}

interface FiltersState {
  district?: District;
  setDistrict: (district: District) => void;
}

interface FiltersState {
  towns: Town[];
  setTowns: (towns: Town[]) => void;
}

const useFiltersStore = create<FiltersState>((set) => {
  // Initialize the store with default values
  return {
    city: undefined,
    setCity: (city: City) => set({ city }),
    district: undefined,
    setDistrict: (district: District) => set({ district }),
    towns: [],
    setTowns: (towns: Town[]) => set({ towns }),
  };
});

export default useFiltersStore;
