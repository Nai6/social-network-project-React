import React from 'react';
import { connect } from "react-redux";
import { follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUser } from "../../redux/users_reducer";
import Users from './Users';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getPortionSize, getTotalUserCount, getUsers } from '../../redux/user_selectors';

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUser(this.props.currentPage, this.props.pageSize)
        if(this.props.isFetching){
            
        }
    }

    onPageChange = (page) => {
        this.props.setCurrentPage(page)
        this.props.requestUser(page, this.props.pageSize)
    }

    render() {
        return <>
            <Users
                totalUserCount={this.props.totalUserCount}
                pageSize={this.props.pageSize}
                portionSize={this.props.portionSize}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                users={this.props.users}
                onPageChange={this.onPageChange}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}


const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUserCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}

export default compose(
    connect(mapStateToProps, 
        {follow, unfollow, setCurrentPage, toggleFollowingInProgress, requestUser}),
    withAuthRedirect
)(UsersContainer)