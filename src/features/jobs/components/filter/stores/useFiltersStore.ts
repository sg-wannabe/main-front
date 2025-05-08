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

export type EmploymentType = "정규직" | "계약직" | "무관";
interface ConditionFilterState {
  employmentType: EmploymentType | undefined;
  setEmploymentType: (employmentType: EmploymentType | undefined) => void;
}

export type WorkExperienceType = "경력" | "무관";

interface ConditionFilterState {
  workExperiences: WorkExperienceType[];
  setWorkExperiences: (workExperiences: WorkExperienceType[]) => void;
}

export type EducationType = "고졸" | "대졸이상" | "무관";

interface ConditionFilterState {
  educations: EducationType[];
  setEducations: (educations: EducationType[]) => void;
}

export type DayType = "월" | "화" | "수" | "목" | "금" | "토" | "일";
interface ConditionFilterState {
  selectedDays: string[];
  setSelectedDays: (selectedDays: string[]) => void;
}

interface ConditionFilterState {
  dayNegotiable: boolean;
  setDayNegotiable: (dayNegotiable: boolean) => void;
}

const useFiltersStore = create<
  LocationFiltersState & JobCategoryFilterState & ConditionFilterState
>((set) => {
  // Initialize the store with default values
  return {
    // Location Filter
    // 시.도, 시.군.구, 동
    city: undefined,
    setCity: (city: City) => set({ city }),
    district: undefined,
    setDistrict: (district: District) => set({ district }),
    towns: [],
    setTowns: (towns: HoleTown[]) => set({ towns }),
    // Job Category Filter
    // 대분류, 중분류
    cat: undefined,
    setCat: (category: Category) => set({ cat: category }),
    jobCats: [],
    setJobCats: (jobCats: JobCat[]) => set({ jobCats }),
    //
    // Condition Filter
    // 고용형태
    employmentType: undefined,
    setEmploymentType: (employmentType: EmploymentType | undefined) => set({ employmentType }),

    // 경력
    workExperiences: [],
    setWorkExperiences: (workExperiences: WorkExperienceType[]) => set({ workExperiences }),

    // 학력
    educations: [],
    setEducations: (educations: EducationType[]) => set({ educations }),

    // 요일
    selectedDays: [],
    setSelectedDays: (selectedDays: string[]) => set({ selectedDays }),
    // 요일 협의
    dayNegotiable: false,
    setDayNegotiable: (dayNegotiable: boolean) => set({ dayNegotiable }),
  };
});

export default useFiltersStore;
