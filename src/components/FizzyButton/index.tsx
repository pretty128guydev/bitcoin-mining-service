
import './index.css'


interface FizzyButtonProps {
    isDisabled: boolean;
    onClick: () => void;
}

const FizzyButton: React.FC<FizzyButtonProps> = ({ isDisabled, onClick }) => {
    return <div className='button' id='fizzyButton'
        onClick={!isDisabled ? onClick : undefined} // Disable click when isDisabled
        style={{
            opacity: isDisabled ? 0.5 : 1, // Make it transparent when disabled
            pointerEvents: isDisabled ? 'none' : 'auto', // Disable interaction when disabled
        }}>
        <input id='button' type='checkbox' />
        <label htmlFor='button'>
            <div className='button_inner q'>
                <i className='l ion-log-in'></i>
                <span className='t'>Get Daily Earining</span>
                <span>
                    <i className='tick ion-checkmark-round'></i>
                </span>
                <div className='b_l_quad' style={{
                    position: "relative",
                    top: "5px",
                    left: -"5px",
                }}>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                    <div className='button_spots'></div>
                </div>
            </div>
        </label>
    </div>
}

export default FizzyButton;