import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

type SearchJobResult = {
  job_posting_id: string;
  company_id: string;
  job_posting_title: string;
  address: string;
  city: string;
  district: string;
  town: string;
  work_day: string[];
  posting_type: string;
  employment_type: string;
  education: string;
  description?: string;
  [key: string]: any; // 만약 추가적인 필드가 있다면
};

export function useSearchJobs() {
  // const {} = useFiltersStore();
  const [result, setResult] = useState<SearchJobResult[] | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.get("https://senior-naeil.life/api/search/", {
        params: {
          // city: selectedFilters.locationChecked,
          // district: [],
          // town: [],
          // work_day: selectedFilters.selectedDays,
          // posting_types: selectedFilters.checkedJobs[0] || "",
          // employment_type: selectedFilters.employmentType,
          // education: selectedFilters.education,
          // search: selectedFilters.searchKeyword,
        },
      });
      return response.data;
    },
    onSuccess: (data) => {
      setResult(data);
    },
  });

  return {
    result,
    isLoading: mutation.isPending,
    error: mutation.error,
    search: mutation.mutate, // 검색 실행 함수
  };
}
