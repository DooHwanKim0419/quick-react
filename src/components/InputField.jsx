import getNameFromLabel from "../utilities/CourseNameMapper";
import "../App.css";

const InputField = ({ fieldKey, label, value, onChange }) => (
  <div className="input-field-area">
    <label htmlFor={fieldKey} className="form-label">
      {getNameFromLabel(label)}
    </label>
    <input
      className="form-control"
      id={fieldKey}
      name={fieldKey}
      defaultValue={value.values?.[fieldKey]}
      onChange={onChange}
    />
    <div className="invalid-feedback">{value.errors?.[fieldKey]}</div>
  </div>
);

export default InputField;
