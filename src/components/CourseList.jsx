import { useState } from "react";
import Course from "./Course";
import "../App.css";

const CourseList = ({ allCourses, choice }) => {
  const [chosen, setChosen] = useState([]);

  const filtered = Object.entries(allCourses).filter(
    ([id, course]) => course.term.toUpperCase() === choice.toUpperCase()
  );

  const courses = Object.fromEntries(filtered);

  const addToChosenList = (id) => {
    if (chosen.includes(id)) {
      const newChosen = chosen.filter((currId) => currId !== id);
      setChosen(newChosen);
    } else {
      setChosen([...chosen, id]);
    }
  };

  return (
    <div className="course-schedule">
      {Object.entries(courses).map(([id, course]) => (
        <Course
          key={id}
          course={course}
          onClick={() => addToChosenList(id)}
          chosen={chosen.includes(id)}
        />
      ))}
    </div>
  );
};

export default CourseList;
