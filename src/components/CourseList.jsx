import "../App.css";
import Course from "./Course";

const CourseList = ({ allCourses, choice }) => {
  const filtered = Object.entries(allCourses).filter(
    ([id, course]) => course.term.toUpperCase() === choice.toUpperCase()
  );

  const courses = Object.fromEntries(filtered);

  return (
    <div className="course-schedule">
      {Object.entries(courses).map(([id, course]) => (
        <Course key={id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
