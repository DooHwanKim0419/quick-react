import getNameFromLabel from "../utilities/CourseNameMapper";
import "../App.css";

const InputField = ({ fieldKey, value, onChange }) => (
  <div className="input-field-area">
    <label htmlFor={fieldKey} className="form-label">
      {getNameFromLabel(fieldKey)}
    </label>
    <input
      className={`form-control ${
        value.errors && value.errors[fieldKey] ? "is-invalid" : "is-valid"
      }`}
      id={fieldKey}
      name={fieldKey}
      defaultValue={value.values?.[fieldKey]}
      onChange={onChange}
    />
    {value.errors ? (
      <div className="invalid-feedback">{value.errors[fieldKey]}</div>
    ) : (
      <div className="valid-feedback">Valid Input!</div>
    )}
  </div>
);

export default InputField;
