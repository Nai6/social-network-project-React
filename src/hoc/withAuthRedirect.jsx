import React from 'react'
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

let withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render () {
            if (!this.props.isAuth) return <Navigate to={'/login'} />
            return <Component {...this.props} />;
        }
    }
    let ConnectedAuthRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectedAuthRedirectComponent;
}




export default withAuthRedirect;