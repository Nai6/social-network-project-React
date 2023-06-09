import { createSelector } from "reselect"

const getUser = (state) => {
    return state.usersPage.users;
}

export const getUsers = createSelector ( getUser, (users) => {
    return users
})
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getTotalUserCount = (state) => {
    return state.usersPage.totalUserCount;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
}

export const getPortionSize = (state) =>{
    return state.usersPage.portionSize
}
