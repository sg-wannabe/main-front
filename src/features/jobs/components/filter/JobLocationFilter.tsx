"use client";

import { filterApi } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaCaretUp } from "react-icons/fa";

interface JobLocationFilterProps {
  open: boolean;
  setOpen: (show: boolean) => void;
}

export default function JobLocationFilter({ open, setOpen }: JobLocationFilterProps) {
  const { data: regions = {}, isLoading } = useQuery({
    queryKey: ["regions"],
    queryFn: () => filterApi.getLocationList(),
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  const [selectedSiGunGu, setSelectedSiGunGu] = useState("서울특별시");
  const [selectedGu, setSelectedGu] = useState("");
  const [checkedDongs, setCheckedDongs] = useState<string[]>([]);

  const toggleDong = (dong: string) => {
    const isSelected = checkedDongs.includes(dong);
    let updated: string[] = [];

    if (dong.endsWith("전체")) {
      updated = isSelected ? checkedDongs.filter((d) => d !== dong) : [dong];
      setCheckedDongs(updated);

      return;
    }

    if (checkedDongs.includes(`${selectedGu} 전체`)) {
      updated = [...checkedDongs.filter((d) => d !== `${selectedGu} 전체`), dong];
    } else {
      updated = isSelected ? checkedDongs.filter((d) => d !== dong) : [...checkedDongs, dong];
    }

    setCheckedDongs(updated);
  };

  const guList = Object.keys(regions[selectedSiGunGu] || {});
  const dongList = selectedGu ? regions[selectedSiGunGu][selectedGu] || [] : [];

  if (isLoading) {
    return <div className="p-4">지역 정보를 불러오는 중...</div>;
  }

  return (
    <div>
      <div className="flex border border-b-0 bg-white overflow-hidden">
        {/* 시군구 */}
        <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
          {Object.keys(regions).map((region) => (
            <div
              key={region}
              className={`p-2 cursor-pointer ${selectedSiGunGu === region ? "text-green-700 font-bold" : ""}`}
              onClick={() => {
                setSelectedSiGunGu(region);
                setSelectedGu("");
              }}
            >
              {region} &rsaquo;
            </div>
          ))}
        </div>

        {/* 구 */}
        <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
          {guList.map((gu) => (
            <div
              key={gu}
              className={`p-2 cursor-pointer ${selectedGu === gu ? "text-green-700 font-bold" : ""}`}
              onClick={() => setSelectedGu(gu)}
            >
              {gu} &rsaquo;
            </div>
          ))}
        </div>

        {/* 동 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 p-4 w-full max-h-80 h-full overflow-y-auto">
          {dongList.map((dong) => (
            <label key={dong} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checkedDongs.includes(dong)}
                onChange={() => toggleDong(dong)}
              />
              {dong}
            </label>
          ))}
        </div>
      </div>
      <div className="border flex justify-center rounded-md rounded-t-none py-2">
        <button className="flex items-center " onClick={() => setOpen(!open)}>
          닫기
          <span className="px-2">
            <FaCaretUp />
          </span>
        </button>
      </div>
    </div>
  );
}
