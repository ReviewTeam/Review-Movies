import ProfilePicture from './ProfilePicture/ProfilePicture';
import TextFieldFrame from './TextFieldFrame/TextFieldFrame';
import TermsAgreement from './TermsAgreement/TermsAgreement';
import SubmitButton from './SubmitButton/SubmitButton';
import NavbarSignUp from '../Header/Navbar/NavbarSignUpPage';
import './SignUpPage.css';

function SignUpPage() {
  return (
    
    <div className="signup-page">
      <NavbarSignUp/>
      <div className="signup-content">
        <div className="signup-element">
          <ProfilePicture />
        </div>
        <div className="signup-element">
          <TextFieldFrame />
        </div>
        <div className="signup-element">
          <TermsAgreement />
        </div>
        <div className="signup-element">
          <SubmitButton />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;

