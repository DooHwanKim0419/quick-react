import "../App.css";

const Course = ({ course }) => {
  const { term, number, meets, title } = course;

  return (
    <div className="card">
      <div className="class-information">
        <h1 className="title">
          {term} CS {number}
        </h1>
        <p className="course-title">{title}</p>
      </div>
      <hr />
      <p className="text-center time-schedule">{meets}</p>
    </div>
  );
};

export default Course;
