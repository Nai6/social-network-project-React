import React from 'react'
import Header from './Header'
import { logout } from '../../redux/auth_reducer'
import { connect } from 'react-redux';
import { compose } from 'redux';


class HeaderContainer extends React.Component{
    render(){
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    profile: state.profilePage.profile
})

export default compose (
    connect(mapStateToProps, {logout})
)(HeaderContainer) 