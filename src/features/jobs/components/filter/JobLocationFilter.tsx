"use client";

import { filterApi } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";

/**
 * 도,시 (경기도, 서울특별시 등) 컴포넌트
 */
function CityComponent({
  regions,
  selectedCity,
  setSelectedCity,
  setSelectedDistrict,
}: {
  regions: string[];
  selectedCity: string;
  setSelectedCity: (city: string) => void;
  setSelectedDistrict: (gu: string) => void;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {regions.map((region) => (
        <div
          key={region}
          className={`p-2 cursor-pointer ${selectedCity === region ? "text-green-700 font-bold" : ""}`}
          onClick={() => {
            setSelectedCity(region);
            setSelectedDistrict("");
          }}
        >
          {region} &rsaquo;
        </div>
      ))}
    </div>
  );
}

/**
 * DistrictComponent는 특정 지역의 동을 표시하는 컴포넌트입니다.
 * 추가적인 기능이 필요할 경우 구현할 수 있습니다.
 */
function DistrictComponent({
  guList,
  selectedDistrict,
  setSelectedDistrict,
}: {
  guList: string[];
  selectedDistrict: string;
  setSelectedDistrict: (gu: string) => void;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {guList.map((gu) => (
        <div
          key={gu}
          className={`p-2 cursor-pointer ${selectedDistrict === gu ? "text-green-700 font-bold" : ""}`}
          onClick={() => setSelectedDistrict(gu)}
        >
          {gu} &rsaquo;
        </div>
      ))}
    </div>
  );
}

function TownComponent({
  dongList,
  checkedTowns,
  toggleDong,
}: {
  dongList: string[];
  checkedTowns: string[];
  toggleDong: (dong: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 p-4 w-full max-h-80 h-full overflow-y-auto">
      {dongList.map((dong) => (
        <label key={dong} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedTowns.includes(dong)}
            onChange={() => toggleDong(dong)}
          />
          {dong}
        </label>
      ))}
    </div>
  );
}

function CloseButton({ open, setOpen }: { open: boolean; setOpen: (show: boolean) => void }) {
  return (
    <div className="border flex justify-center rounded-md rounded-t-none py-2">
      <button className="flex items-center " onClick={() => setOpen(!open)}>
        닫기
        <span className="px-2">
          <FaCaretUp />
        </span>
      </button>
    </div>
  );
}

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

  const [selectedCity, setSelectedCity] = useState("서울특별시");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [checkedTowns, setCheckedTowns] = useState<string[]>([]);

  const toggleDong = React.useCallback(
    (dong: string) => {
      const isSelected = checkedTowns.includes(dong);
      let updated: string[] = [];

      if (dong.endsWith("전체")) {
        updated = isSelected ? checkedTowns.filter((d) => d !== dong) : [dong];
        setCheckedTowns(updated);

        return;
      }

      if (checkedTowns.includes(`${selectedDistrict} 전체`)) {
        updated = [...checkedTowns.filter((d) => d !== `${selectedDistrict} 전체`), dong];
      } else {
        updated = isSelected ? checkedTowns.filter((d) => d !== dong) : [...checkedTowns, dong];
      }

      setCheckedTowns(updated);
    },
    [checkedTowns, selectedDistrict],
  );

  const [guList, setGuList] = useState<string[]>([]);
  const [dongList, setDongList] = useState<string[]>([]);

  React.useEffect(() => {
    setGuList(Object.keys(regions[selectedCity] || {}));
    setSelectedDistrict(""); // Reset selectedDistrict when selectedCity changes
  }, [selectedCity, regions]);

  React.useEffect(() => {
    setDongList(selectedDistrict ? regions[selectedCity][selectedDistrict] || [] : []);
  }, [selectedDistrict, selectedCity, regions]);

  if (isLoading) {
    return <div className="p-4">지역 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <div className="flex border border-b-0 bg-white overflow-hidden">
        {/* 시군구 */}
        <CityComponent
          regions={Object.keys(regions)}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* 구 */}
        <DistrictComponent
          guList={guList}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* 동 */}
        <TownComponent dongList={dongList} checkedTowns={checkedTowns} toggleDong={toggleDong} />
      </div>
      <CloseButton open={open} setOpen={setOpen} />
    </>
  );
}
