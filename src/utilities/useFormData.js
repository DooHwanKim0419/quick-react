import { useState } from "react";

const useFormData = (validator = null, values = {}) => {
  const [state, setState] = useState(() => ({ values }));

  const onChange = (event) => {
    const { target } = event;
    const { id, value } = target;

    const error = validator ? validator(id, value) : "";
    event.target.setCustomValidity(error);

    const { values: stateValues, errors: stateErrors } = state;

    const values = { ...stateValues, [id]: value };
    const errors = { ...stateErrors, [id]: error };

    const hasError = Object.values(errors).some(
      (errorString) => errorString !== ""
    );
    const newState = hasError ? { values, errors } : { values };
    setState(newState);
  };

  return [state, onChange];
};

export default useFormData;
