import axios from 'axios';
import AxiosErrorHandler from '../utils/validators/helpers/AxiosErrorHandler';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        "API-KEY": "014119d0-d3a7-4a87-871b-7bce2a55a75a"
    }
    
})

AxiosErrorHandler(instance)


export const  userAPI = {
    getUser(currentPage = 1, pageSize = 10){
            return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then (response => {
                return response.data
            })
    },

    userUnfollow(userID){
            return instance.delete(`follow/${userID}`)
            .then (response => {
                return response.data
            })            
    },

    userFollow(userID){
            return instance.post (`follow/${userID}`)
            .then (response => {
                return response.data
            })            
    }
}

export const profileAPI = {
    profileGet (userID) {
            return instance.get(`profile/` + userID)
    },
    getUserStatus (userID){
            return instance.get(`profile/status/` + userID)
     
    },
    setUserStatus(status){
            return instance.put(`profile/status`, { status: status })
        
    },
    uploadProfilePhoto(photoFile){
            const formData = new FormData();
            formData.append("image", photoFile)
            return instance.put(`profile/photo`, formData)

    },
    uploadProfile(profile){
            return instance.put('profile', profile)

    }
    
}

export const authAPI = {
    headerGet () {
            return instance.get(`/auth/me`)
    },
    login (email, password, rememberMe=false, captcha=null) {
            return instance.post(`/auth/login`, {email, password, rememberMe, captcha})
    },
    logout(){
            return instance.delete(`/auth/login`)
    }
}

export const secureAPI = {
    getCaptcha(){
            return instance.get('/security/get-captcha-url')
    }
}


export default userAPI;