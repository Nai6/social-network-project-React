import { stopSubmit } from "redux-form"
import { profileAPI } from "../api/api"
import { updateObjectInArray } from "../utils/validators/helpers/object-helpers"

const ADD_POST = 'PROFILE/ADD-POST'
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
const SET_USER_STATUS = 'PROFILE/SET_USER_STATUS'
const SET_REACTION = 'PROFILE/SET_REACTION'
const DELETE_POST = 'PROFILE/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS'
const TOGGLE_IS_FETCHING = 'PROFILE/TOGGLE_IS_FETCHING'
const TOGGLE_IS_PROFILEUPDATED = 'PROFILE/TOGGLE_IS_PROFILEUPDATED'


let initialState = {
    postData: [
        { message: 'Hello and welcome to my first React project! Hope you enjoin using my WebSite. ', id: 1, likeCount: 10, isReacted: null },
        { message: 'In case you find any bugs please contact me on GitHub.', id: 2, likeCount: 5, isReacted: null },
    ],
    profile: null,
    status: '',
    isFetching: false,
    isProfileUpdated: false
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                message: action.message,
                id: state.postData.length + 1,
                likeCount: 0,
                isReacted: null
            };
            return {
                ...state,
                postData: [...state.postData, newPost]
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state, profile: action.profile
            }
        }
        case SET_USER_STATUS: {
            return {
                ...state, status: action.status
            }
        }
        case DELETE_POST: {
            return { ...state, postData: state.postData.filter(p => p.id !== action.postId) }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state, profile: { ...state.profile, photos: action.photos }
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state, isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_PROFILEUPDATED: {
            return {
                ...state, isProfileUpdated: action.IsUpdated
            }
        }
        case SET_REACTION: {
            return {
                ...state,
                postData: updateObjectInArray(state.postData, action.id, 'id', 
                {likeCount: action.likeCount, isReacted: action.isReacted})
            }
        }
        default: {
            return state;
        }
    }
}

export const addPostActionCreator = (message) => ({ type: ADD_POST, message })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const profileIsUpdated = (IsUpdated) => ({ type: TOGGLE_IS_PROFILEUPDATED, IsUpdated })
export const setReaction = (id, likeCount, isReacted) => ({ type: SET_REACTION, id, likeCount, isReacted })


export const userProfiles = (userID) => {
    return async (dispatch) => {
        const response = await profileAPI.profileGet(userID)
        dispatch(setUserProfile(response.data));
    }
}

export const getUserStatus = (userID) => {
    return async (dispatch) => {
        const response = await profileAPI.getUserStatus(userID)
        dispatch(setUserStatus(response.data));
    }
}


export const updateUserStatus = (status) => {
    return async (dispatch) => {
        const response = await profileAPI.setUserStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setUserStatus(status));
        }
    }
}
export const savePhoto = (filePhoto) => {
    return async (dispatch) => {
        dispatch(toggleIsFetching(true))
        const response = await profileAPI.uploadProfilePhoto(filePhoto)
        if (response.data.resultCode === 0) {
            dispatch(savePhotoSuccess(response.data.data.photos));
            dispatch(toggleIsFetching(true))
        }
    }
}

export const updateProfile = (profile) => {
    return async (dispatch, getState) => {
        const response = await profileAPI.uploadProfile(profile)
        const userID = getState().auth.id
        if (response.data.resultCode === 0) {
            dispatch(userProfiles(userID));
            dispatch(profileIsUpdated(true))
        }
        else {
            let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
            dispatch(stopSubmit("edit-profile", { _error: message }))
            return Promise.reject()
        }
    }
}

export default profileReducer