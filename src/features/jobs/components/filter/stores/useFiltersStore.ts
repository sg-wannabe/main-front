import { Category, City, District, SubCategory, Town } from "@/api/filter";
import { create } from "zustand";

export interface JobCat extends SubCategory {
  parent: {
    id: string;
    name: string;
  };
}

export interface HoleTown extends Town {
  district: {
    id: string;
    name: string;
  };
  city: {
    id: string;
    name: string;
  };
}

interface LocationFiltersState {
  city?: City;
  setCity: (city: City) => void;
  district?: District;
  setDistrict: (district: District) => void;
  towns: HoleTown[];
  setTowns: (towns: HoleTown[]) => void;
}

interface JobCategoryFilterState {
  cat?: Category;
  setCat: (category: Category) => void;
  jobCats?: JobCat[];
  setJobCats: (jobCats: JobCat[]) => void;
}

const useFiltersStore = create<LocationFiltersState & JobCategoryFilterState>((set) => {
  // Initialize the store with default values
  return {
    city: undefined,
    setCity: (city: City) => set({ city }),
    district: undefined,
    setDistrict: (district: District) => set({ district }),
    towns: [],
    setTowns: (towns: HoleTown[]) => set({ towns }),
    cat: undefined,
    setCat: (category: Category) => set({ cat: category }),
    jobCats: [],
    setJobCats: (jobCats: JobCat[]) => set({ jobCats }),
  };
});

export default useFiltersStore;
