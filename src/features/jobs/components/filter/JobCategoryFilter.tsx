"use client";

import React, { useState } from "react";

import { Category, filterApi } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import { FaCaretUp } from "react-icons/fa";
import useFiltersStore, { JobCat } from "./stores/useFiltersStore";

export default function JobCategoryFilter({ setShowJobs, showJobs }) {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["search-job"],
    queryFn: () => filterApi.getSearchJobList(),
    staleTime: 1000 * 60 * 5,
    // 5분 캐시
  });

  const {
    // 대분류
    cat,
    setCat,
    // 중분류
    jobCats,
    setJobCats,
  } = useFiltersStore();

  const [selectedCat, setSelected] = useState<Category>(cat);
  const [checkedSubCat, setCheckedSubCat] = useState<JobCat[]>(jobCats ?? []);

  // 대분류 초기화
  React.useEffect(() => {
    if (categories.length > 0 && !selectedCat) {
      setSelected(categories[0]);
    }
  }, [categories]);

  // 대분류 선택 되었을때 스토어에 저장
  React.useEffect(() => {
    if (!selectedCat) return;
    setCat(selectedCat);
  }, [selectedCat]);

  // 중분류 선택 되었을때 스토어에 저장
  React.useEffect(() => {
    if (checkedSubCat.length > 0) {
      setJobCats(checkedSubCat);
    } else {
      setJobCats([]);
    }
  }, [checkedSubCat]);

  // jobCats가 변경될 때 checkedSubCat 동기화
  React.useEffect(() => {
    if (
      jobCats.length !== checkedSubCat.length ||
      jobCats.some((c, i) => c.id !== checkedSubCat[i]?.id)
    ) {
      setCheckedSubCat(jobCats);
    }
  }, [jobCats]);

  // checkedSubCat이 변경될 때 jobCats 동기화
  React.useEffect(() => {
    if (
      checkedSubCat.length !== jobCats.length ||
      checkedSubCat.some((c, i) => c.id !== jobCats[i]?.id)
    ) {
      setJobCats(checkedSubCat);
    }
  }, [checkedSubCat]);

  if (isLoading) {
    return <div className="p-4">불러오는 중...</div>;
  }

  return (
    <>
      <div className="flex border border-b-0  bg-white overflow-hidden">
        {/* 대분류*/}
        <div className="w-70 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`p-2 cursor-pointer ${
                selectedCat?.id === category.id ? "text-green-700 font-bold" : ""
              }`}
              onClick={() => setSelected(category)}
            >
              {category.name} &rsaquo;
            </div>
          ))}
        </div>

        {/* 중분류 */}
        <div className="grid grid-col md:grid-cols-2 max-h-80 gap-x-2 gap-y-3 p-4 w-full h-full overflow-y-auto">
          {selectedCat &&
            selectedCat.children.map((sub) => (
              <label key={sub.id} className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={checkedSubCat.some((cat) => cat.id === sub.id)}
                  onChange={() => {
                    if (checkedSubCat.some((cat) => cat.id === sub.id)) {
                      setCheckedSubCat(checkedSubCat.filter((cat) => cat.id !== sub.id));
                    } else {
                      setCheckedSubCat([
                        ...checkedSubCat,
                        { ...sub, parent: { id: selectedCat.id, name: selectedCat.name } },
                      ]);
                    }
                  }}
                  className="mt-1.5"
                />
                {sub.name}
              </label>
            ))}
        </div>
      </div>
      <div className="border flex justify-center rounded-md rounded-t-none py-2">
        <button type="button" className="flex items-center " onClick={() => setShowJobs(!showJobs)}>
          닫기
          <span className="px-2">
            <FaCaretUp />
          </span>
        </button>
      </div>
    </>
  );
}
