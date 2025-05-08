"use client";

import useFiltersStore from "@/features/jobs/components/filter/stores/useFiltersStore";

import { IoMdRefresh } from "react-icons/io";

export default function SelectedChips() {
  const { towns, setTowns, jobCats, setJobCats } = useFiltersStore();

  // if (selectedFilters.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 my-4">
        {towns.length > 0 &&
          towns.map((town) => (
            <div
              key={town.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">
                {town.district.name} {town.name}
              </span>
              <button
                onClick={() => {
                  setTowns(towns.filter((t) => t.id !== town.id));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${town.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        {jobCats.length > 0 &&
          jobCats.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">
                {cat.parent.name} {cat.name}
              </span>
              <button
                onClick={() => {
                  setJobCats(jobCats.filter((c) => c.id !== cat.id));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${cat.name}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* {selectedFilters.map((filter, index) => (
          <div
            key={`${filter}-${index}`}
            className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
          >
            {" "}
            <Heading sizeOffset={-1}> {filter}</Heading>
            <button
              onClick={() => {
                removeSelectedFilter(filter);
                // 직종 필터 제거 처리
                if (
                  filter &&
                  Object.values(useSelectedFilterStore.getState().checkedJobs).includes(filter)
                ) {
                  const updatedCheckedJobs = useSelectedFilterStore
                    .getState()
                    .checkedJobs.filter((job) => job !== filter);
                  useSelectedFilterStore.getState().setCheckedJobs(updatedCheckedJobs);
                }

                // 지역 필터 제거 처리
                if (filter.includes(":")) {
                  const [region] = filter.split(":");
                  const rest = useSelectedFilterStore
                    .getState()
                    .selectedFilters.filter((f) => !f.startsWith(`${region}:`));
                  const updatedLocationChecked = useSelectedFilterStore
                    .getState()
                    .locationChecked.filter((d) => !filter.includes(d));
                  useSelectedFilterStore.setState({
                    locationChecked: updatedLocationChecked,
                    selectedFilters: rest,
                  });
                }

                // 근무요일 그룹 제거 처리
                if (filter.startsWith("근무요일:")) {
                  useSelectedFilterStore.setState({
                    selectedDays: [],
                  });
                }

                // 학력/경력여부/고용형태 그룹 제거 처리 bug:하나 uncheck하면, 모두 unchecked
                const [group, label] = filter.split(":");
                if (group === "학력" || group === "경력여부" || group === "고용형태") {
                  removeSelectedFilter(`${group}:${label}`);
                }

                if (filter === "요일 협의") {
                  useSelectedFilterStore.setState({
                    dayNegotiable: false,
                  });
                }
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove ${filter}`}
            >
              <Heading sizeOffset={2}> &times;</Heading>
            </button>
          </div>
        ))} */}
      </div>
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <button
          type="button"
          onClick={() => resetFilters()}
          className="w-32 group flex justify-center items-center border gap-2  px-4 py-2 rounded-md text-sm text-gray-800 cursor-pointer"
        >
          <span className="group-hover:rotate-180 transform transition-transform duration-300">
            <IoMdRefresh />
          </span>
          초기화
        </button>
        <button className="w-44 md:w-32 grid-rows-5 bg-primary text-white  px-2 py-3 rounded-md flex justify-center items-center gap-2">
          검색하기
        </button>
      </div>
    </>
  );
}
