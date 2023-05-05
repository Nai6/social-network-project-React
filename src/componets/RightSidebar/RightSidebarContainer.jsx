import { connect } from 'react-redux';
import { compose } from 'redux';
import RightSidebar from './RightSidebar';

let mapStateToProps = (state) => {
    return{
        dialogsData: state.dialogsPage.dialogsData,
        isAuth: state.auth.isAuth
    }
}


export default compose(    
    connect(mapStateToProps, {}),
    )(RightSidebar);