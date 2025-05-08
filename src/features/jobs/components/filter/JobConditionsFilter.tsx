"use client";

import { FaCaretUp } from "react-icons/fa";
import useFiltersStore, {
  EducationType,
  EmploymentType,
  WorkExperienceType,
} from "./stores/useFiltersStore";

export default function JobConditionsFilter({ setShowOtherConditions, showOtherConditions }) {
  const {
    // 고용 형태
    employmentType,
    setEmploymentType,
    // 경력
    workExperiences,
    setWorkExperiences,
    //  학력
    educations,
    setEducations,
    // 근무요일
    selectedDays,
    setSelectedDays,
    // 요일 협의
    dayNegotiable,
    setDayNegotiable,
  } = useFiltersStore();

  return (
    <>
      <div className="border border-b-0 bg-white p-4 grid gap-x-4 gap-y-7">
        <div className="grid grid-cols-[4rem_2fr] items-start gap-x-3">
          <span className="w-16 font-bold">고용형태</span>
          <div className="flex gap-4 flex-wrap">
            {["무관", "정규직", "계약직"].map((option: EmploymentType) => {
              return (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="radio"
                    checked={employmentType === option}
                    onChange={() => {
                      setEmploymentType(option);
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-[4rem_2fr] items-start gap-x-3">
          <span className="w-16 font-bold">경력 여부</span>
          <div className="flex gap-4 flex-wrap">
            {["경력무관", "경력"].map((option: WorkExperienceType) => {
              return (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={workExperiences.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setWorkExperiences([...workExperiences, option]);
                      } else {
                        setWorkExperiences(workExperiences.filter((exp) => exp !== option));
                      }
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-[4rem_2fr] items-start gap-x-3">
          <span className="w-16 font-bold">학력</span>
          <div className="flex gap-4 flex-wrap">
            {["학력무관", "고졸", "대졸이상"].map((option: EducationType) => {
              return (
                <label key={option} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={educations.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setEducations([...educations, option]);
                      } else {
                        setEducations(educations.filter((e) => e !== option));
                      }
                    }}
                  />
                  {option}
                </label>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-[4rem_1fr] items-start gap-x-3">
          <span className="w-16 font-bold">근무요일</span>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-x-2 gap-y-2">
              {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    const currentDays = selectedDays;
                    const isSelected = currentDays.includes(day);
                    const updated = isSelected
                      ? currentDays.filter((d) => d !== day)
                      : [...currentDays, day];
                    setSelectedDays(updated);

                    // const label = formatWorkDays(updated);
                    // const filters = selectedFilters.filter((f) => !f.startsWith("근무요일:"));
                    // setSelectedFilters(updated.length > 0 ? [...filters, label] : filters);
                  }}
                  className={`px-4 py-2 border rounded ${
                    Array.isArray(selectedDays) && selectedDays.includes(day)
                      ? "bg-primary text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={dayNegotiable}
                onChange={() => {
                  setDayNegotiable(!dayNegotiable);
                }}
              />
              요일 협의
            </label>
          </div>
        </div>
      </div>
      {/* 닫기 영영 */}
      <div className="border flex justify-center rounded-md rounded-t-none py-2">
        <button
          className="flex items-center "
          onClick={() => setShowOtherConditions(!showOtherConditions)}
        >
          닫기
          <span className="px-2">
            <FaCaretUp />
          </span>
        </button>
      </div>
    </>
  );
}
