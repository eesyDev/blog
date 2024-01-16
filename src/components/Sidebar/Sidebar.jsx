import React from 'react';
import { Link } from 'react-router-dom';
import TagIcon from '@mui/icons-material/Tag'
import noAvatarImg from '../../img/noimage.jpg';
import './sidebar.scss';

const Sidebar = ({tags}) => {
  const uniqueTags = Array.from(new Set(tags));
  return (
    <div className='sidebar'>
      <div className='tags-block side-block'>
        <div className="tags-block-title">Tags</div>
        <ul>
          {uniqueTags?.map(tag => <li key={tag}><div><TagIcon/><Link to='#'>{tag}</Link></div></li>)}
        </ul>
      </div>
      <div className="comments-block side-block">
        <div className="comments-block-title">Comments</div>
        <ul>
          <li>
            <div className='comments-block-item'>
              <img src={noAvatarImg}/>
              <div className="comments-block-item-info">
                <div className="comments-block-item-name">Petya Duduchkin</div>
                <div className="comments-block-item-txt">Lorem ipsum dolor saepe. Officiis vitae!</div>
              </div>
            </div>
          </li>
          <li>
            <div className='comments-block-item'>
              <img src={noAvatarImg}/>
              <div className="comments-block-item-info">
                <div className="comments-block-item-name">Petya Duduchkin</div>
                <div className="comments-block-item-txt">Lorem ipsum dolor saepe. Officiis vitae!</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar