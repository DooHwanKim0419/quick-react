import "../App.css";

const ChosenCoursesList = ({ courses }) => {
  return (
    <div className="course-schedule-list">
      <h1 className="mb-5">{`You have selected ${courses.length} ${
        courses.length === 1 ? "course" : "courses"
      }`}</h1>
      <table>
        <thead>
          <tr>
            <th>Meets</th>
            <th>Number</th>
            <th>Term</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td>{course.meets}</td>
              <td>{`CS ${course.number}`}</td>
              <td>{course.term}</td>
              <td>{course.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChosenCoursesList;
