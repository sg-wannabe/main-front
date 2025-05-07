"use client";

import { useState } from "react";

import { filterApi } from "@/api/filter";
import { useSelectedFilterStore } from "@/features/jobs/components/filter/stores/job-filters/useSelectedFiltersStore";
import { useQuery } from "@tanstack/react-query";
import { FaCaretUp } from "react-icons/fa";

export default function JobCategoryFilter({ setShowJobs, showJobs }) {
  const { checkedJobs, setCheckedJobs, addSelectedFilter, removeSelectedFilter } =
    useSelectedFilterStore();
  const [selectedCategory, setSelectedCategory] = useState("외식·음료");

  const { data, isLoading } = useQuery({
    queryKey: ["search-job"],
    queryFn: () => filterApi.getSearchJobList(),
  });

  const jobCategories = data ?? [];

  const selectedCategoryItem = jobCategories.find(category => category.name === selectedCategory);
  const subCategories = selectedCategoryItem?.children ?? [];

  const toggleCheck = (item: string) => {
    const isSelected = checkedJobs.includes(item);

    if (item.includes("전체")) {
      const subItems = subCategories || [];

      if (isSelected) {
        setCheckedJobs([]);
        removeSelectedFilter(item);
      } else {
        setCheckedJobs([item]);

        // Remove all subItems from chips
        subItems.forEach((sub) => {
          removeSelectedFilter(sub.name);
        });

        // Add the '전체' item to chips
        addSelectedFilter(item);
      }

      return;
    }

    const updated = isSelected
      ? checkedJobs.filter((v) => v !== item)
      : [...checkedJobs.filter((v) => !v.includes("전체")), item];

    setCheckedJobs(updated);
    useSelectedFilterStore.setState({ checkedJobs: updated });

    if (isSelected) {
      removeSelectedFilter(item);
    } else {
      addSelectedFilter(item);
      checkedJobs.forEach((job) => {
        if (job.includes("전체")) {
          removeSelectedFilter(job);
        }
      });
    }
  };

  return (
    <div>
      <div className="flex border border-b-0  bg-white overflow-hidden">
        {/* 대분류*/}
        <div className="w-70 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
          {isLoading && <p>로딩중...</p>}
          {jobCategories.map((category) => (
            <div
              key={category.id}
              className={`p-2 cursor-pointer ${
                selectedCategory === category.name ? "text-green-700 font-bold" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name} &rsaquo;
            </div>
          ))}
        </div>

        {/* 중분류 */}
        <div className="grid grid-col md:grid-cols-2 max-h-80 gap-x-2 gap-y-3 p-4 w-full h-full overflow-y-auto">
          {subCategories.map((sub) => (
            <label key={sub.id} className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={checkedJobs.includes(sub.name)}
                onChange={() => toggleCheck(sub.name)}
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
    </div>
  );
}
