import { useState } from "react";
import CourseList from "./CourseList";

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
    <label className="btn btn-outline-primary mb-3 mt-1" htmlFor={filter}>
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

  return (
    <div>
      <FilterSelector choice={choice} setChoice={setChoice} />
      <CourseList allCourses={allCourses} choice={choice} />
    </div>
  );
};

export default TermPage;
