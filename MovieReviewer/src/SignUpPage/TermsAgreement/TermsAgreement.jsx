import './TermsAgreement.css';

function TermsAgreement({ checked, onChange }) {
  return (
    <div className="terms-agreement">
      <div className="terms-agreement-checkbox">
        <input
          type="checkbox"
          id="agreeTerms"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor="agreeTerms"></label>
      </div>
      <div className="terms-agreement-text">
        I agree to the terms and conditions.
      </div>
    </div>
  );
}

export default TermsAgreement;