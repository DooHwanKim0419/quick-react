import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FormButtons from "./FormButtons";
import InputField from "./InputField";
import {
  isProperTimeFormat,
  isWithoutLeadingZero,
} from "../utilities/CourseValidate";
import { useDbUpdate } from "../utilities/Firebase";
import { useNavigate } from "react-router-dom";
import "../App.css";

const validateCourseInput = (name, value) => {
  if (name === "title") {
    return value.length < 2
      ? "Course title need to have at least two characters"
      : "";
  }

  if (name === "meets") {
    if (value === "") {
      return "";
    }

    const splitted = value.split(" ");
    if (splitted.length != 2) {
      return "Meeting time must contain whitespace (ex: MWF 9:00-9:50)";
    }

    const uniqueDays = ["M", "TU", "W", "TH", "F"];
    const [courseDays, interval] = splitted;

    let counter = {
      M: 0,
      Tu: 0,
      W: 0,
      Th: 0,
      F: 0,
    };

    let tempDay = "";

    for (let i = 0; i < courseDays.length; i++) {
      if (courseDays[i] === "M" || courseDays === "W" || courseDays === "F") {
        counter[courseDays[i]] += 1;
      } else if (courseDays[i] === "T") {
        tempDay += "T";
      } else {
        tempDay += courseDays[i];
        counter[tempDay] += 1;
        tempDay = "";
      }
    }

    for (const [key, value] of Object.entries(counter)) {
      if (value > 1) {
        return "No duplicate meeting days.";
      }

      if (!uniqueDays.includes(key.toUpperCase())) {
        return "Not available meeting day";
      }
    }

    if (!interval.includes("-")) {
      return "Interval must have -";
    }

    let [from, to] = interval.split("-");
    if (!isProperTimeFormat(from) || !isProperTimeFormat(to)) {
      return "Need to have proper time format (00:00-23:59)";
    }

    if (from.length < 4 || to.length < 4) {
      return "Time must be in the format like this: 9:00, 09:00";
    }

    if (isWithoutLeadingZero(from) && from.length == 4) {
      from = from.padStart(5, "0");
    }

    if (isWithoutLeadingZero(to) && to.length == 4) {
      to = to.padStart(5, "0");
    }

    const fromDay = new Date(`2023-10-01T${from}:00`);
    const toDay = new Date(`2023-10-01T${to}:00`);
    const dayBegin = new Date("2023-10-01T00:00");
    const dayEnds = new Date("2023-10-01T23:59");

    if (fromDay >= toDay) {
      return "Starting time must be less than the ending time";
    }

    if (
      fromDay < dayBegin ||
      toDay > dayEnds ||
      fromDay > dayEnds ||
      toDay < dayBegin
    ) {
      return "Time must be in between 00:00-23:59";
    }

    return "";
  }
};

const CourseForm = () => {
  const { state } = useLocation();
  const [courseState, setCourseState] = useState({ values: state });
  const { id } = useParams();
  const [updateData] = useDbUpdate(`/courses/${id}`);
  const navigate = useNavigate();

  const onChange = (event) => {
    const { target } = event;
    const { id, value } = target;

    const errorMessage = validateCourseInput(id, value);
    const { values: stateValues, errors: stateErrors } = courseState;

    const values = { ...stateValues, [id]: value };
    const errors = { ...stateErrors, [id]: errorMessage };

    const hasAtLeastOneError = Object.values(errors).some(
      (errorString) => errorString !== ""
    );

    let newState = { values };
    setCourseState(hasAtLeastOneError ? { ...newState, errors } : newState);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const { values, errors } = courseState;

    if (!errors) {
      updateData(values);
      navigate("/");
    }
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={submitForm} noValidate>
        <InputField fieldKey="title" value={courseState} onChange={onChange} />
        <InputField fieldKey="meets" value={courseState} onChange={onChange} />
        <FormButtons submitForm={submitForm} />
      </form>
    </div>
  );
};

export default CourseForm;
