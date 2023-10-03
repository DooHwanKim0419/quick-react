import "../App.css";

const InputField = ({ name, label, value, onChange }) => (
  <div className="input-field-area">
    <label htmlFor={name} className="form-label">
      {label}
    </label>
    <input
      className="form-control"
      id={name}
      name={name}
      defaultValue={value}
      onChange={onChange}
    />
  </div>
);

export default InputField;
