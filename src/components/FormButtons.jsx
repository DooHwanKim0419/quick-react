import { useNavigate } from "react-router-dom";
import "../App.css";

const FormButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="form-button-area">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => navigate("/")}
      >
        Cancel
      </button>
    </div>
  );
};

export default FormButtons;
