"use client";

import { City, District, filterApi, Town } from "@/api/filter";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import useFiltersStore, { HoleTown } from "./stores/useFiltersStore";

/**
 * 도,시 (경기도, 서울특별시 등) 컴포넌트
 */
function CityComponent({
  cities,
  selectedCity,
  setSelectedCity,
}: {
  cities: City[];
  selectedCity?: City;
  setSelectedCity: (city: City) => void;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {cities.map((city) => (
        <div
          key={city.id}
          className={`p-2 cursor-pointer ${selectedCity?.id === city.id ? "text-green-700 font-bold" : ""}`}
          onClick={() => {
            setSelectedCity(city);
          }}
        >
          {city.name} &rsaquo;
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
  districts,
  selectedDistrict,
  setSelectedDistrict,
}: {
  districts: District[];
  selectedDistrict?: District;
  setSelectedDistrict: (d: District) => void;
}) {
  return (
    <div className="w-60 max-h-80 border-r overflow-y-auto p-2 scroll-auto">
      {districts.map((d) => (
        <div
          key={d.id}
          className={`p-2 cursor-pointer ${selectedDistrict?.id === d.id ? "text-green-700 font-bold" : ""}`}
          onClick={() => setSelectedDistrict(d)}
        >
          {d.name} &rsaquo;
        </div>
      ))}
    </div>
  );
}

function TownComponent({
  towns,
  checkedTowns,
  onHandleTownClick,
}: {
  towns: Town[];
  checkedTowns: Town[];
  onHandleTownClick: (town: Town) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-3 p-4 w-full max-h-80 h-full overflow-y-auto">
      {towns.map((dong) => (
        <label key={dong.id} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={checkedTowns.some((town) => town.id === dong.id)}
            onChange={() => onHandleTownClick(dong)}
          />
          {dong.name}
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
  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: () => filterApi.getLocationList(),
    staleTime: 1000 * 60 * 5, // 5분 캐시
  });

  const { towns, setTowns, district, setDistrict, city, setCity } = useFiltersStore();

  const [selectedCity, setSelectedCity] = useState<City>(city);
  const [selectedDistrict, setSelectedDistrict] = useState<District>(district);
  const [checkedTowns, setCheckedTowns] = useState<HoleTown[]>(towns);

  /** 시.도 초기화 */
  React.useEffect(() => {
    if (cities.length > 0 && !selectedCity) {
      setSelectedCity(cities[0]);
    }
  }, [cities]);

  /** 시.군.구 선택 되었을때 */
  React.useEffect(() => {
    // 시.군.구가 선택되면 동을 초기화
    setSelectedDistrict(undefined);
    if (!selectedCity) return;
    // store 에 저장
    setCity(selectedCity);
    // 시.군.구가 선택되면 동을 첫번째 걸루 초기화
    if (selectedCity.districts.length > 0) {
      setSelectedDistrict(selectedCity.districts[0]);
    }
  }, [selectedCity]);

  /**
   * 시.군.구가 선택 되었을때 스토어에 저장
   */
  React.useEffect(() => {
    if (!selectedCity) return;
    setDistrict(selectedDistrict);
  }, [selectedDistrict]);

  React.useEffect(() => {
    // towns와 checkedTowns가 다를 때만 set
    if (
      towns.length !== checkedTowns.length ||
      towns.some((t, i) => t.id !== checkedTowns[i]?.id)
    ) {
      setCheckedTowns(towns);
    }
  }, [towns]);

  React.useEffect(() => {
    // checkedTowns와 towns가 다를 때만 set
    if (
      checkedTowns.length !== towns.length ||
      checkedTowns.some((t, i) => t.id !== towns[i]?.id)
    ) {
      setTowns(checkedTowns);
    }
  }, [checkedTowns]);

  if (isLoading) {
    return <div className="p-4">지역 정보를 불러오는 중...</div>;
  }

  return (
    <>
      <div className="flex border border-b-0 bg-white overflow-hidden">
        {/* 시군구 */}
        <CityComponent
          cities={cities}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />

        {/* 구 */}
        <DistrictComponent
          districts={selectedCity?.districts || []}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
        />

        {/* 동 */}
        <TownComponent
          towns={
            selectedDistrict
              ? // [
                //     { id: selectedDistrict.id, name: `${selectedDistrict.name} 전체` },
                //     ...selectedDistrict.towns,
                // ]
                selectedDistrict.towns
              : []
          }
          checkedTowns={checkedTowns}
          onHandleTownClick={(town) => {
            setCheckedTowns((prev) => {
              // 이미 체크되어있는지 확인
              const isChecked = prev.some((t) => t.id === town.id);
              if (isChecked) {
                // 만약에 체크 되어있다면 체크 해제
                return prev.filter((t) => t.id !== town.id);
              } else {
                return [
                  ...prev,
                  {
                    ...town,
                    district: {
                      id: selectedDistrict?.id || "",
                      name: selectedDistrict?.name || "",
                    },
                    city: {
                      id: selectedCity?.id || "",
                      name: selectedCity?.name || "",
                    },
                  },
                ];
              }
            });
          }}
        />
      </div>
      <CloseButton open={open} setOpen={setOpen} />
    </>
  );
}
