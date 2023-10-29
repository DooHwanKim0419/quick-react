import { useEffect, useState } from "react";
import CourseList from "./CourseList";
import CourseScheduleModal from "./CourseScheduleModal";
import NoCourseChosen from "./NoCourseChosen";
import ChosenCoursesList from "./ChosenCoursesList";

const filters = ["Fall", "Winter", "Spring"];

const FilterButton = ({ filter, choice, setChoice }) => (
  <>
    <input
      id={filter}
      type="radio"
      className="btn-check"
      checked={filter === choice}
      onChange={() => setChoice(filter)}
    />
    <label
      className="btn btn-outline-primary"
      htmlFor={filter}
      data-cy={filter}
    >
      {filter}
    </label>
  </>
);

const FilterSelector = ({ choice, setChoice }) => (
  <div className="btn-group">
    {filters.map((filter) => (
      <FilterButton
        key={filter}
        filter={filter}
        choice={choice}
        setChoice={setChoice}
      />
    ))}
  </div>
);

const TermPage = ({ allCourses }) => {
  const [choice, setChoice] = useState("Fall");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chosenClasses, setChosenClasses] = useState([]);
  const [handledClasses, setHandledClasses] = useState([]);

  useEffect(() => {
    const handleChosenClasses = () => {
      if (!isModalOpen) {
        setHandledClasses([]);
      } else {
        const tempCourses = [];
        chosenClasses.forEach((courseInfo) => {
          if (courseInfo.length !== 2) {
            return null;
          }

          const [, info] = courseInfo;
          tempCourses.push(info);
        });

        setHandledClasses(tempCourses);
      }
    };

    handleChosenClasses();
  }, [isModalOpen]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="action-buttons">
        <FilterSelector choice={choice} setChoice={setChoice} />
        <button className="btn btn-info schedule-modal" onClick={openModal}>
          Course Schedule
        </button>
      </div>
      <CourseList
        allCourses={allCourses}
        choice={choice}
        updateChosenClasses={setChosenClasses}
      />
      <CourseScheduleModal isModalOpen={isModalOpen} closeModal={closeModal}>
        {chosenClasses.length === 0 ? (
          <NoCourseChosen />
        ) : (
          <ChosenCoursesList courses={handledClasses} />
        )}
      </CourseScheduleModal>
    </div>
  );
};

export default TermPage;
