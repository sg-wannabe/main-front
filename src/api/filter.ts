import { API_ENDPOINTS } from "@/constants/apiEndPoints";
import { fetcher } from "@/lib/fetcher";

export type SearchJobRequest = {
  city?: string[];
  district?: string[];
  town?: string[];
  work_day?: string[];
  posting_types?: string;
  employment_type?: string;
  education?: string;
  search?: string;
  job_keyword_main?: string[];
  job_keyword_sub?: string[];
};

export interface Town {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  towns: Town[];
}

export interface City {
  id: string;
  name: string;
  districts: District[];
}

export type SubCategory = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  children: SubCategory[];
};

export const filterApi = {
  getSearchJobList: () => {
    return fetcher.get<Category[]>(API_ENDPOINTS.JOB_FILTER.CATEGORY);
  },
  getLocationList: async () => {
    return await fetcher.get<City[]>(API_ENDPOINTS.JOB_FILTER.LOCATION);
  },
};
