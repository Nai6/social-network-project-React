import { connect } from 'react-redux';
import { compose } from 'redux';
import Nav from './Nav';

let mapStateToProps = (state) => {
    return{
        isAuth: state.auth.isAuth
    }
}


export default compose(    
    connect(mapStateToProps, {}),
    )(Nav);