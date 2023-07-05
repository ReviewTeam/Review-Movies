import './TextBox.css';

function TextBox({ placeholder, type, value, onChange }) {
  return (
    <div className="textbox">
      <input className = "textinput"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default TextBox;
