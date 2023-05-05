import React from 'react';
import loader from '../../../assets/images/preloader.gif'


let Preloader = (props) => {
        return <div>
                <img src={loader} alt='preloader' />
        </div>

}

export default Preloader;