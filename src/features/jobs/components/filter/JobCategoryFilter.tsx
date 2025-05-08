"use client";

import { useState } from "react";

import { Category, filterApi, SubCategory } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import { FaCaretUp } from "react-icons/fa";

export default function JobCategoryFilter({ setShowJobs, showJobs }) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["search-job"],
    queryFn: () => filterApi.getSearchJobList(),
  });

  const [selectedCat, setSelected] = useState<Category>();
  const [checkedSubCat, setCheckedSubCat] = useState<SubCategory[]>([]);

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
                      setCheckedSubCat([...checkedSubCat, sub]);
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
      <div className="p-4">
        <h3>선택된 중분류:</h3>
        <ul>
          {checkedSubCat.map((sub) => (
            <li key={sub.id}>{sub.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
