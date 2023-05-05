import React from 'react'
import { Field, reduxForm } from 'redux-form'
import style from './MyPost.module.css'
import Post from './Post/Post.jsx'
import { Textarea } from '../../common/FormsControl/FormsControl'


const MyPost = React.memo((props) => {
  let postElement = props.postData.map(p => <Post message={p.message}
    likeCount={p.likeCount}
    isReacted={p.isReacted}
    key={p.id}
    id={p.id}
    profile={props.profile}
    setReaction={props.setReaction} />)

  let addPost = (value) => {
    props.addPostActionCreator(value.postMessage);
  }

  return <div>
    <div className={style.post_input_container}>
      <AddPostFormRedux onSubmit={addPost} fullName={props.profile.fullName} />
    </div>

    <div >
      {postElement}
    </div>
  </div>
})

const AddPostForm = (props) => {
  const placeHolderText = 'What is on your mind, ' + props.fullName + '?'
  return (<form onSubmit={props.handleSubmit}>
    <div>
      <Field
        rows='5'
        placeholder={placeHolderText}
        name={'postMessage'}
        component={Textarea}
      />
    </div>
    <div className={style.button_style}>
      <button>Add Post</button>
    </div>
  </form>)
}

const AddPostFormRedux = reduxForm({ form: 'postAddPostForm' })(AddPostForm);

export default MyPost;