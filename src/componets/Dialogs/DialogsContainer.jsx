import { connect } from 'react-redux';
import { compose } from 'redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { NewMessageActionCreator } from '../../redux/dialog_reducer'
import Dialogs from './Dialogs';

let mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage,
        auth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {NewMessageActionCreator}),
    withAuthRedirect
    )(Dialogs);