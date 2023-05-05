import profileReducer, { addPostActionCreator,deletePost } from "./profile_reduser"

let state = {postData: [
    { message: 'Hello, how are you?', id: 1, likeCount: 10 },
    { message: 'It`s my first post!', id: 2, likeCount: 15 },
],}

it ('new post should be added', () => {
    let action = addPostActionCreator('TESTTEXT')
    let newState = profileReducer(state,action)
    expect (newState.postData.length).toBe(3)
})

it ('the text of new post should be "TESTTEXT"', () => {
    let action = addPostActionCreator('TESTTEXT')
    let newState = profileReducer(state,action)
    expect (newState.postData[2].message).toBe('TESTTEXT')
})


it ('post should be deleted', () => {
    let action = deletePost(1)
    let newState = profileReducer(state,action)
    expect (newState.postData.length).toBe(1)
})