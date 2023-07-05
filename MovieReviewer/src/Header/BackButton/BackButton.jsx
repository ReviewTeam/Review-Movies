import LeftPointingArrow from '../../assets/logos/leftPointingArrow.svg'
import './BackButton.css'

function BackButton() {
    return (
        <button className="back-button">
        <img src={LeftPointingArrow} alt="Back" className="back-icon" />
      </button>
    );
  }
  
  export default BackButton;