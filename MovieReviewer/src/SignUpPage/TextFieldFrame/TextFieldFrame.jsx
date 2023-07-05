import { useState } from 'react';
import TextBox from '../TextBox/TextBox';

function TextFieldFrame() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div class = "TextBoxFrame">
      <TextBox
        placeholder="Enter your first name"
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
      />

      <TextBox
        placeholder="Enter your last name"
        type="text"
        value={lastName}
        onChange={handleLastNameChange}
      />

      <TextBox
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={handleEmailChange}
      />

      <TextBox
        placeholder="Enter your username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />

      <TextBox
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />

      <TextBox
        placeholder="Confirm your password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
      />
    </div>
  );
}

export default TextFieldFrame;
