import { REGIONS } from "@/constants/regions";
import { formatFilterValue, formatWorkDays } from "@/utils/filters";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// 타입 정의
type FilterSelectedStore = {
  selectedFilters: string[];
  addSelectedFilter: (filter: string) => void;
  removeSelectedFilter: (filter: string) => void;
  clearSelectedFilters: () => void;
  locationChecked: string[];
  setLocationChecked: (value: string[]) => void;
  checkedJobs: string[];
  setCheckedJobs: (value: string[]) => void;
  selectedDays: string[];
  setSelectedDays: (value: string[]) => void;
  dayNegotiable: boolean;
  setDayNegotiable: (value: boolean) => void;
  toggleDay: (day: string) => void;
  toggleDistrict: (
    district: string,
    selectedRegion: string,
    checkedDistricts: string[],
    setCheckedDistricts: (value: string[]) => void,
  ) => void;
  employmentType: string;
  setEmploymentType: (value: string) => void;
  education: string;
  setEducation: (value: string) => void;
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;
};

export const useSelectedFilterStore = create<FilterSelectedStore>()(
  persist(
    (set, get) => ({
      selectedFilters: [],
      addSelectedFilter: (filter) =>
        set((state) => ({
          selectedFilters: [...state.selectedFilters, filter],
        })),
      removeSelectedFilter: (filter) => {
        const isLocationFilter = filter.includes(":") && REGIONS[filter.split(":")[0]];

        set((state) => ({
          selectedFilters: state.selectedFilters.filter((f) => f !== filter),
        }));

        if (isLocationFilter) {
          const [region] = filter.split(":");
          const rest = get().selectedFilters.filter((f) => !f.startsWith(`${region}:`));
          const updatedLocationChecked = get().locationChecked.filter((d) => !filter.includes(d));
          set({
            locationChecked: updatedLocationChecked,
            selectedFilters: rest,
          });
        }
      },
      clearSelectedFilters: () => set({ selectedFilters: [] }),
      locationChecked: [],
      setLocationChecked: (value) => set({ locationChecked: value }),
      checkedJobs: [],
      setCheckedJobs: (value) => set({ checkedJobs: value }),
      selectedDays: [],
      setSelectedDays: (value) => set({ selectedDays: value }),

      dayNegotiable: false,
      setDayNegotiable: (value) => set({ dayNegotiable: value }),

      employmentType: "",
      setEmploymentType: (value) => set({ employmentType: value }),
      education: "",
      setEducation: (value) => set({ education: value }),
      searchKeyword: "",
      setSearchKeyword: (value) => set({ searchKeyword: value }),

      toggleDay: (day: string) => {
        const currentDays = get().selectedDays;
        const isSelected = currentDays.includes(day);
        const updated = isSelected ? currentDays.filter((d) => d !== day) : [...currentDays, day];
        set({ selectedDays: updated });

        const label = formatWorkDays(updated);
        const filters = get().selectedFilters.filter((f) => !f.startsWith("근무요일:"));
        set({
          selectedFilters: updated.length > 0 ? [...filters, label] : filters,
        });
      },
      toggleDistrict: (
        district: string,
        selectedRegion: string,
        checkedDistricts: string[],
        setCheckedDistricts: (value: string[]) => void,
      ) => {
        let updated = checkedDistricts.includes(district)
          ? checkedDistricts.filter((d) => d !== district)
          : [...checkedDistricts, district];

        const currentRegionDistricts = REGIONS[selectedRegion] || [];
        currentRegionDistricts.forEach((d) => {
          if (d !== district) {
            updated = updated.filter((item) => item !== d);
          }
        });

        if (district.endsWith("전체") && checkedDistricts.includes(district)) {
          updated = checkedDistricts.filter((d) => d !== district);
          const filters = get().selectedFilters.filter(
            (f) => !f.startsWith(formatFilterValue(selectedRegion, "")),
          );
          setCheckedDistricts(updated);
          get().setLocationChecked(updated);
          useSelectedFilterStore.setState({
            selectedFilters: filters,
          });
          return;
        }

        const label = formatFilterValue(selectedRegion, district);
        const filters = get().selectedFilters.filter((f) => !f.startsWith(`${selectedRegion}:`));
        setCheckedDistricts(updated);
        get().setLocationChecked(updated);
        set({
          selectedFilters: [...filters, label],
        });
      },
    }),
    {
      name: "job-filter-storage",
    },
  ),
);

export const resetFilters = () => {
  useSelectedFilterStore.setState({
    selectedFilters: [],
    locationChecked: [],
    checkedJobs: [],
    selectedDays: [],
    dayNegotiable: false,
  });
};
