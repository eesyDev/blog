import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Post } from '../components';
import noAvatarImg from '../img/noimage.jpg';
import { useGetPostDetailsQuery } from '../services/postApi';


const SinglePost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState();

  const { data, isFetching } = useGetPostDetailsQuery(id)

  useEffect(() => {
    setPostData(data)
  }, [data, isFetching])

  return (
    <div className='single-post'>
      <div className='container'>
        <div className='single-post-wrap'>
          <Post
            id={postData?._id}
            title={postData?.title}
            commentsCount={postData?.commentsCount || 0}
            createdAt={postData?.createdAt}
            tags={postData?.tags}
            // user={{avatarUrl: {noAvatarImg}, fullName: 'Jon Snow'}}
            userName={postData?.user?.fullName}
            userImg={postData?.user?.imageUrl}
            imageUrl={`http://localhost:4444${postData?.imageUrl}`}
            viewsCount={postData?.viewsCount || 0}

          />
          <div className="text-block">
            {postData?.text}
          </div>
          <div className="comments-block">
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
              <li>
                <div className='comments-block-item'>
                  <img src={noAvatarImg}/>
                  <div className="comments-block-add">
                    <form className='comments-block-form'>
                      <div className='comments-block-field'>
                        <input type="text" name='comment' />
                        <label for='comment'>Add comment</label>
                      </div>
                      <div className="comments-block-submit">
                        <button type='submit' className='btn btn-solid'>Add comment</button>
                      </div>
                    </form>
                  </div>
                </div>
              </li>
            </ul>

          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost;