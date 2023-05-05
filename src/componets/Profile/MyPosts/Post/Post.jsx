import React from 'react'
import style from './Post.module.css'
import Like from '../../../../assets/images/CommonIcons/Like.png'
import Dislike from '../../../../assets/images/CommonIcons/Dislike.png'
import UserPhoto from '../../../../assets/images/CommonIcons/userPhoto.png'



const Post = (props) => {
  return (
    <div className={style.posts_container}>
      <div className={style.posts_container_avatar}>
        <img src={props.profile.photos.small || UserPhoto} alt="PostImg" />
      </div>

      <div className={style.posts_container_info}>
        <h3>{props.profile.fullName}</h3>
        <p className={(props.likeCount > 0 && style.likes)
          || (props.likeCount < 0 && style.dislikes)}>Likes:{props.likeCount}</p>
      </div>

      <div className={style.posts_container_text}>
        <p>{props.message}</p>
      </div>

      <div className={style.post_container_reactions}>
        <button
          onClick={() => {
            props.isReacted === null ?
              props.setReaction(props.id, props.likeCount + 1, true) :
              props.setReaction(props.id, props.likeCount - 1, null)
          }}
          disabled={props.isReacted === false}
        >
          <img src={Like} alt="Like" className={props.isReacted === false ? style.shadowed : null} />
        </button>

        <button
          onClick={() => {
            props.isReacted === null ?
              props.setReaction(props.id, props.likeCount - 1, false) :
              props.setReaction(props.id, props.likeCount + 1, null)
          }}
          disabled={props.isReacted === true}
        >
          <img src={Dislike} alt="Dislike" className={props.isReacted === true ? style.shadowed : null} />
        </button>

      </div>
      {/* <button onClick={() => props.setReaction(props.id, props.likeCount + 1, true)}>+ / -</button> */}
    </div>
  )
}

export default Post;