import React from 'react';
import { Link } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './post.scss';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import noAvatarImg from '../../img/noimage.jpg'
import PostSceleton from './Sceleton';

const Post = ({
  id, title, createdAt, imageUrl, userName, userImg, viewsCount, commentsCount, tags, isLoading, isEditable
}) => {
  if (isLoading) {
    return <PostSceleton/>
  }

  // console.log(isEditable)
  return (
    <div className='post-item'>
      {
          isEditable && (
            <div className='edit-btns'>         
              <Link to={`/posts/${id}/edit`}><EditOutlinedIcon/></Link>
              <button><DeleteOutlineOutlinedIcon/></button>
            </div>
          )
        }
      <img src={imageUrl} className='post-item-img'/>
      <div className='post-item-info'>
        <div className='post-item-user-info'>
          <img src={userImg || noAvatarImg}/>
          <div className='post-item-user-name'>
            <div className="name">{userName}</div>
            <div className="date">{createdAt}</div>
          </div>
        </div>
        <div className='post-item-info-details'>
          <h2 className='post-item-title'>
            <Link to={`/posts/${id}`}>{title}</Link>
          </h2>
          <ul className='post-item-tags'>
            {tags?.map((tag, index) => (
            <li key={tag + index}><Link to='#'>#{tag}</Link></li>
            ))}
          </ul>
          <ul className='post-item-actions'>
            <li>
              <RemoveRedEyeOutlinedIcon/>
              <span>{viewsCount}</span>
            </li>
            <li>
              <ModeCommentOutlinedIcon/>
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Post;