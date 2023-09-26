import "../App.css";

const CourseList = ({ courses }) => {
  return (
    <div className="course-schedule">
      {Object.entries(courses).map(([id, course]) => (
        <h2 key={id}>
          {course.term} CS{course.number}: {course.title}
        </h2>
      ))}
    </div>
  );
};

export default CourseList;
