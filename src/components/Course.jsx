import "../App.css";

const Course = ({ course, onClick, chosen, conflicted }) => {
  const { term, number, meets, title } = course;

  return (
    <div
      className={`card ${chosen ? "selected" : conflicted ? "conflicted" : ""}`}
      onClick={onClick}
    >
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
