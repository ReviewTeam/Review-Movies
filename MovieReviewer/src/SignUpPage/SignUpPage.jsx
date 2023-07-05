import ProfilePicture from './ProfilePicture/ProfilePicture';
import TextFieldFrame from './TextFieldFrame/TextFieldFrame';
import TermsAgreement from './TermsAgreement/TermsAgreement';
import Navbar from '../Header/Navbar/Navbar';
import './SignUpPage.css';

function SignUpPage() {
  return (
    
    <div className="signup-page">
      <Navbar/>
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
      </div>
    </div>
  );
}

export default SignUpPage;

