import style from './App.module.css';
import React, { Suspense } from 'react'
import HeaderContainer from './componets/Header/HeaderContainer';
import { Navigate, Route, Routes } from 'react-router-dom';
import Music from './componets/Music/Music';
import News from './componets/News/News';
import Settings from './componets/Settings/Settings';
import UsersContainer from './componets/Users/UsersContainer';
import { withRouter } from './componets/Profile/ProfileContainer';
import Login from './componets/Login/Login';
import { initializeApp } from './redux/app_reducer'
import Preloader from './componets/common/Preloader/Preloader';
import { compose } from 'redux';
import { connect } from 'react-redux';

const ProfileContainer = React.lazy(() => import('./componets/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./componets/Dialogs/DialogsContainer'));
const NavContainer = React.lazy(() => import('./componets/Nav/NavContainer'));
const RightSidebarContainer = React.lazy(() => import('./componets/RightSidebar/RightSidebarContainer'));

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized)
      return <Preloader />
    return (
      <Suspense fallback={<Preloader />}>
        <HeaderContainer />
        <div className={this.props.isAuth ? style.container : style.login_page}>
          <NavContainer />
          <div className={style.main_content}>
            <Routes>
              <Route path="/profile" element={<ProfileContainer />}>
                <Route path=":userId" element={<ProfileContainer />} />
              </Route>
              <Route exact path="/" element={<Navigate to='/profile' />}></Route>
              <Route path="*" element={<Navigate to='/profile' />}></Route>
              <Route path='/dialogs/*'
                element={<DialogsContainer
                  store={this.props.store} />} />
              <Route path='/users/*'
                element={<UsersContainer
                  store={this.props.store} />} />
              <Route path='/login'
                element={<Login />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/400' element={<div>CODE 4**: Client Error</div>} />
              <Route path='/500' element={<div>CODE 5**: Server Error</div>} />
            </Routes>
          </div>
          <RightSidebarContainer />
        </div>
      </Suspense>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  isError: state.app.isError,
  errorStatus: state.app.errorStatus,
  isAuth: state.auth.isAuth
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))
  (App);
