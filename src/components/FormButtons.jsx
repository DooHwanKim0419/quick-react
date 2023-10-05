import { useNavigate } from "react-router-dom";
import "../App.css";

const FormButtons = ({ submitForm }) => {
  const navigate = useNavigate();

  return (
    <div className="form-button-area">
      <button
        type="button"
        className="btn btn-danger me-3"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
      <button type="button" className="btn btn-primary" onClick={submitForm}>
        Submit
      </button>
    </div>
  );
};

export default FormButtons;
