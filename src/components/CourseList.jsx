import { useEffect, useState } from "react";
import Course from "./Course";
import {
  getSelectedTimes,
  meetsToObjectArray,
  getAllConflictedIds,
} from "../utilities/TimeConfilict";
import { useAdminChecker } from "../utilities/AdminChecker";
import "../App.css";

const CourseList = ({ allCourses, choice, updateChosenClasses }) => {
  const [chosen, setChosen] = useState([]);
  const [conflictedIds, setConflictedIds] = useState([]);
  const [isAdmin] = useAdminChecker();

  useEffect(() => {
    const updateClasses = () => {
      const chosenClasses = Object.entries(allCourses).filter(([id, course]) =>
        chosen.includes(id)
      );

      updateChosenClasses(chosenClasses);

      const times = getSelectedTimes(chosenClasses);
      const timeInfo = meetsToObjectArray(times);
      const allConflictedIds = getAllConflictedIds(timeInfo, allCourses);

      setConflictedIds(allConflictedIds);
    };

    updateClasses();
  }, [chosen]);

  const filtered = Object.entries(allCourses).filter(
    ([id, course]) => course.term.toUpperCase() === choice.toUpperCase()
  );

  const courses = Object.fromEntries(filtered);

  const addToChosenList = (id) => {
    if (conflictedIds.includes(id)) {
      return;
    }

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
          id={id}
          course={course}
          onClick={() => addToChosenList(id)}
          chosen={chosen.includes(id)}
          conflicted={conflictedIds.includes(id)}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default CourseList;
