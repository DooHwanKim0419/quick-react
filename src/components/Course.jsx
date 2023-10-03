import { useNavigate } from "react-router-dom";
import "../App.css";

const Course = ({ id, course, onClick, chosen, conflicted }) => {
  const { term, number, meets, title } = course;
  const navigate = useNavigate();

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
      <div className="edit-button">
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate(`/course/edit/${id}`, { state: course })}
        >
          Edit
        </button>
      </div>
      <hr />
      <p className="text-center time-schedule">{meets}</p>
    </div>
  );
};

export default Course;
