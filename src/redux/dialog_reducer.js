const ADD_MESSAGE = 'DIALOG/ADD-MESSAGE'

let initialState = {
    dialogsData: [
        { name: 'Edward Daniels', id: 1, avatar: 'https://blob.sololearn.com/avatars/f06671c8-ecbd-4e32-8755-d87bd806f78f.jpg' },
        { name: 'Oscar Cortez', id: 2, avatar: 'https://preview.redd.it/seiw9jl6t7uz.png?auto=webp&s=bc8d37e6c6ee4c85021423e8c0f128d8080f20e3' },
        { name: 'Lucille Harris', id: 3, avatar: 'https://styles.redditmedia.com/t5_d6amd/styles/profileIcon_jvffdn59exa01.png?width=256&height=256&crop=256:256,smart&s=0783c34e9797fa0a302d8a21532bb4d4ddfe72e0' },
        { name: 'Elizabeth Price', id: 4, avatar: 'https://cdn2.steamgriddb.com/file/sgdb-cdn/icon_thumb/30999ce1f0a35aeff9a456e4487f9924.png' },
        { name: 'Robert Rodriquez', id: 5, avatar: 'https://i.pinimg.com/280x280_RS/cd/b4/47/cdb4470c98c3865ecfc53dac5909011c.jpg' },
        { name: 'Jason James', id: 6, avatar: 'https://gamehag.com/static/avatar/5930123_max.jpg' }
    ],
    messageData: [
        { message: 'Hello my friends.', id: 7 },
        { message: 'I belive you are doing well on my website.', id: 8 },
        { message: 'Please share your opinion with me about this project.', id: 9 },
    ],
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:{
            let message = action.message
            return{
                ...state,
                messageData: [...state.messageData, {id: initialState.messageData.length + 1, message: message}]
            }
        }
        default:
            return state;
    }
}

export const NewMessageActionCreator = (message) => ({ type: ADD_MESSAGE, message })

export default dialogReducer;