import React from 'react'
import { connect } from 'react-redux';
import { userProfiles, getUserStatus, updateUserStatus, savePhoto, updateProfile } from '../../redux/profile_reduser'
import Profile from './Profile'
import { useParams } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import Preloader from '../common/Preloader/Preloader';

export function withRouter(Children) {
  return (props) => {

    const match = { params: useParams() };
    return <Children {...props} match={match} />
  }
}

class ProfileContainer extends React.Component {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push('/login')
      }
    }
    this.props.userProfiles(userId)
    this.props.getUserStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile();
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.match && this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    } else if (!this.props.match && this.props.match !== prevProps.match) {
      this.refreshProfile();
    }
  }

  render() {
    if (!this.props.profile) {
      return <Preloader />
    }

    return       <Profile {...this.props} profile={this.props.profile}
        status={this.props.status}
        updateUserStatus={this.props.updateUserStatus}
        isOwner={!this.props.match.params.userId}
        isFetching={this.props.isFetching}
        updateProfile={this.props.updateProfile}
        isProfileUpdated={this.props.isProfileUpdated} />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  isFetching: state.profilePage.isFetching,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  isProfileUpdated: state.profilePage.isProfileUpdated
})


export default compose(
  connect(mapStateToProps, { userProfiles, getUserStatus, updateUserStatus, savePhoto, updateProfile }),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

