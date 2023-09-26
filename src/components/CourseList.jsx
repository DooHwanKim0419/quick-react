import "../App.css";
import Course from "./Course";

const CourseList = ({ courses }) => {
  return (
    <div className="course-schedule">
      {Object.entries(courses).map(([id, course]) => (
        <Course key={id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
