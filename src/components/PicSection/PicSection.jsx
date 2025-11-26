// components/PicSection/PicSection.jsx
import './index.css';

const PicSection = () => {
    return (
        <div
            className='picContainer'
            style={{
                display: 'flex',
                width: '80%',
                maxWidth: '1320px',
                margin: '100px 0 118px 0',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <img className='image-main' src='/icons/picturesMainPage.svg' alt="picture" />
            <div className='blur-block'>
                <img
                    className='big-blur'
                    src='/icons/bigBlur.svg'
                    alt="picture2"
                    style={{ width: '100%', maxWidth: '276px', height: 'auto' }}
                />
                <img
                    className='small-blur'
                    src='/icons/smallBlur.svg'
                    alt="picture3"
                    style={{ width: '90%', maxWidth: '158px', height: 'auto', marginTop: '99px' }}
                />
            </div>
        </div>
    );
};

export default PicSection;
