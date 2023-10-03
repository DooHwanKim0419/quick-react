import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FormButtons from "./FormButtons";
import InputField from "./InputField";
import "../App.css";

const CourseForm = () => {
  const { state } = useLocation();
  const [meets, setMeets] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const initialize = () => {
      const { title, meets } = state;
      setTitle(title);
      setMeets(meets);
    };

    initialize();
  }, []);

  const submitForm = (event) => {
    event.preventDefault();
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={submitForm} noValidate>
        <InputField
          name="Title"
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <InputField
          name="Meeting Time"
          label="Meeting Time"
          value={meets}
          onChange={(event) => setMeets(event.target.value)}
        />
        <FormButtons />
      </form>
    </div>
  );
};

export default CourseForm;
