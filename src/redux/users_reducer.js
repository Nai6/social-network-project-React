import userAPI from "../api/api"
import { updateObjectInArray } from "../utils/validators/helpers/object-helpers"

const FOLLOW = 'USER/FOLLOW'
const UNFOLLOW = 'USER/UNFOLLOW'
const SET_USERS = 'USER/SET_USERS'
const SET_CURRENT_PAGE = 'USER/SET_CURRENT_PAGE'
const SET_TOTAL_USER_COUNT = 'USER/SET_TOTAL_USER_COUNT'
const TOGGLE_IS_FETCHING = 'USER/TOGGLE_IS_FETCHING'
const FOLLOWING_IN_PROGRESS = 'USER/FOLLOWING_IN_PROGRESS'

let initialState = {
    users: [],
    pageSize: 10,
    portionSize: 10,
    totalUserCount: 100,
    currentPage: 1,
    isFetching: null,
    followingInProgress: [{ userId: null, isFetching: false }]

}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, 'id', { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.usersID, 'id', { followed: false })
            }
        case SET_USERS:
            return { ...state, users: [...action.users] }
        case SET_CURRENT_PAGE:
            return { ...state, currentPage: action.currentPage }
        case SET_TOTAL_USER_COUNT:
            return { ...state, totalUserCount: action.totalUsers }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        case FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
        default:
            return state;
    }
}

export const followSuccess = (usersID) => ({ type: FOLLOW, usersID })
export const unfollowSuccess = (usersID) => ({ type: UNFOLLOW, usersID })
export const setUsers = (users) => ({ type: SET_USERS, users })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setTotalUserCount = (totalUsers) => ({ type: SET_TOTAL_USER_COUNT, totalUsers })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingInProgress = (isFetching, userID) => ({ type: FOLLOWING_IN_PROGRESS, isFetching, userID })

export const requestUser = (page, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page))
        const data = await userAPI.getUser(page, pageSize)
        
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUserCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch, userID, methodAPI, actionCreator) => {
    try {
        dispatch(toggleFollowingInProgress(true, userID));
        const data = await methodAPI(userID)
    
        if (data.resultCode === 0) {
            dispatch(actionCreator(userID));
            dispatch(toggleFollowingInProgress(false, userID));
        }
        if(data.message){
            console.error(data.message)
        }
    } catch (error) {
        console.error(error)
    }

}

export const follow = (userID) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, await userAPI.userFollow.bind(userAPI), followSuccess)
    }
}


export const unfollow = (userID) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userID, await userAPI.userUnfollow.bind(userAPI), unfollowSuccess)
    }
}


export default userReducer;