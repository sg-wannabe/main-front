"use client";

import useFiltersStore from "@/features/jobs/components/filter/stores/useFiltersStore";

import { IoMdRefresh } from "react-icons/io";

export default function SelectedChips() {
  const {
    towns,
    setTowns,
    jobCats,
    setJobCats,
    // 고용형태
    employmentType,
    setEmploymentType,
    // 경력
    workExperiences,
    setWorkExperiences,
    // 학력
    educations,
    setEducations,
    selectedDays,
    setSelectedDays,
    dayNegotiable,
    setDayNegotiable,
  } = useFiltersStore();

  // if (selectedFilters.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 my-4">
        {/* // 시군구 */}
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
        {/* // 직군 */}
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
        {/* // 고용형태 */}
        {employmentType && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            <span className="ml-1 text-sm">고용형태: {employmentType}</span>
            <button
              onClick={() => {
                setEmploymentType(null);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove ${employmentType}`}
            >
              &times;
            </button>
          </div>
        )}
        {/* // 경력 */}
        {workExperiences.length > 0 &&
          workExperiences.map((experience) => (
            <div
              key={experience}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">{experience}</span>
              <button
                onClick={() => {
                  setWorkExperiences(workExperiences.filter((e) => e !== experience));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${experience}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 학력 */}
        {educations.length > 0 &&
          educations.map((education) => (
            <div
              key={education}
              className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700"
            >
              <span className="ml-1 text-sm">{education}</span>
              <button
                onClick={() => {
                  setEducations(educations.filter((e) => e !== education));
                }}
                className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
                aria-label={`Remove ${education}`}
              >
                &times;
              </button>
            </div>
          ))}
        {/* // 근무요일 */}
        {selectedDays.length > 0 && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            요일:{" "}
            {["월", "화", "수", "목", "금", "토", "일"]
              .filter((day) => selectedDays.includes(day))
              .join(", ")}
            <button
              onClick={() => {
                setSelectedDays([]);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove ${selectedDays.join(", ")}`}
            >
              &times;
            </button>
          </div>
        )}
        {/* // 요일협의 */}
        {dayNegotiable && (
          <div className="flex items-center bg-gray-100 px-3 py-1 mb-3 rounded-full text-gray-700">
            <span className="ml-1 text-sm">요일협의</span>
            <button
              onClick={() => {
                setDayNegotiable(false);
              }}
              className="ml-2 pb-1 text-gray-500 hover:font-bold hover:scale-105"
              aria-label={`Remove 요일협의`}
            >
              &times;
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 mt-4 mb-4">
        <button
          type="button"
          onClick={() => {}}
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
