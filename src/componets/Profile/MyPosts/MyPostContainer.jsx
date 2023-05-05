import { connect } from 'react-redux';
import { compose } from 'redux';
import { addPostActionCreator, setReaction } from '../../../redux/profile_reduser'
import MyPost from './MyPost'

let mapStateToProps = (state) => {
  return {
    postData: state.profilePage.postData,
    profile: state.profilePage.profile
  }
}


export default compose(
  connect(mapStateToProps, {addPostActionCreator, setReaction})
)(MyPost);