import { Heading } from "@/components/ui/Heading";
import { FaCaretDown } from "react-icons/fa";

import { useFilterTabStore } from "@/features/jobs/components/filter/stores/useJobFilterTabsStore";
import { useSearchJobs } from "@/features/jobs/hooks/useSearchJobs";
import FilterJobs from "./filter/JobCategoryFilter";
import FilterOtherConditions from "./filter/JobConditionsFilter";
import JobLocationFilter from "./filter/JobLocationFilter";
import useFiltersStore from "./filter/stores/useFiltersStore";

export default function JobFilter() {
  const {
    showLocation,
    showJobs,
    showOtherConditions,
    setShowLocation,
    setShowJobs,
    setShowOtherConditions,
  } = useFilterTabStore();

  const navBtnClassName =
    "w-full border border-gray-300 px-2 py-3 rounded-md flex justify-center items-center gap-2 text-gray-500";

  const navBtnSelectedClassName = "border-primary font-bold text-primary";
  const towns = useFiltersStore((state) => state.towns);
  const jobCats = useFiltersStore((state) => state.jobCats);
  const selectedDays = useFiltersStore((state) => state.selectedDays);
  const dayNegotiable = useFiltersStore((state) => state.dayNegotiable);

  const { result, isLoading, error, search } = useSearchJobs();

  return (
    <>
      <section className="w-full max-w-7xl mx-auto my-8">
        <div className="flex flex-col mb-4">
          <Heading sizeOffset={3} className="font-bold py-6 break-keep">
            <span className="text-primary">검색 조건을</span> 설정하실 수 있어요🙂
          </Heading>
          <div className="flex gap-2 mt-4 justify-between items-center mb-3">
            <button
              className={`${navBtnClassName} ${showLocation ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowLocation(!showLocation)}
            >
              지역
              {towns.length > 0 && <span className="text-primary">{towns.length}</span>}
              <span
                className={`transition-transform duration-300 ${showLocation ? "rotate-180" : ""}`}
              >
                <FaCaretDown />
              </span>
            </button>
            <button
              className={`${navBtnClassName} ${showJobs ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowJobs(!showJobs)}
            >
              직종
              {jobCats.length > 0 && <span className="text-primary">{jobCats.length}</span>}
              <span className={`transition-transform duration-300 ${showJobs ? "rotate-180" : ""}`}>
                <FaCaretDown />
              </span>
            </button>
            <button
              className={`${navBtnClassName} ${showOtherConditions ? navBtnSelectedClassName : ""}`}
              onClick={() => setShowOtherConditions(!showOtherConditions)}
            >
              상세
              {selectedDays.length + (dayNegotiable ? 1 : 0) > 0 && (
                <span className="text-primary">
                  {selectedDays.length + (dayNegotiable ? 1 : 0)}
                </span>
              )}
              <span
                className={`transition-transform duration-300 ${showOtherConditions ? "rotate-180" : ""}`}
              >
                <FaCaretDown />
              </span>
            </button>

            <button
              className="w-full bg-primary text-white px-2 py-3 rounded-md flex justify-center items-center gap-2"
              onClick={() => search()}
            >
              검색하기
            </button>
          </div>
          {showLocation && <JobLocationFilter setOpen={setShowLocation} open={showLocation} />}
          {showJobs && <FilterJobs setShowJobs={setShowJobs} showJobs={showJobs} />}
          {showOtherConditions && (
            <FilterOtherConditions
              setShowOtherConditions={setShowOtherConditions}
              showOtherConditions={showOtherConditions}
            />
          )}

          <div className="mt-6">
            {isLoading && <p>로딩중...</p>}
            {error && <p>에러 발생</p>}
            {result && result.results && (
              <div className="grid grid-cols-1 gap-4">
                {result.results.map((job: any) => (
                  <div key={job.id} className="p-4 border rounded-md shadow-sm">
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    {/* 필요에 따라 추가 정보 렌더링 */}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
