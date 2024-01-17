import React, { useState, useEffect } from 'react';
import { Sidebar, Post } from '../components';
import { useSelector } from 'react-redux';
import { useGetPostsQuery } from '../services/postApi';
import { useGetTagsQuery } from '../services/tagsApi';

import placeImage from '../img/place.jpeg'

const Home = () => {

    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);

    const postsQuery = useGetPostsQuery();
    const tagsQuery = useGetTagsQuery();

    const postsList = postsQuery.data;
    const postsIsFetching = postsQuery.isFetching;

    const tagsList = tagsQuery.data;
    const tagsIsFetching = tagsQuery.isFetching;

    const userData = useSelector((state) => state.authSlice.data)
    useEffect(() => {
        if (postsList) {
            setPosts(postsList)
        }
    }, [postsList, postsIsFetching]);

    useEffect(() => {
        if (tagsQuery) {
            setTags(tagsList)
        }
    }, [tagsList, tagsIsFetching]);

	const userId = localStorage.getItem('current_user_id');


    // console.log(userData?.data?._id)

    return (
        <div className='home'>
            <div className='container'>
                <div className='tabs'>
                    <div className='tab'>Newest</div>
                    <div className='tab'>Popular</div>
                </div>
                <div className='home-wrapper'>
                    <div className='home-posts'>
                        {
                            (postsIsFetching ? [...Array(5)] : posts).map((post, index) => (
                                postsIsFetching ? (
                                    <Post isLoading={true} key={index}/>
                                ) : (
                                    // console.log(post.imageUrl)

                                    <Post
                                        key={post._id}
                                        id={post?._id}
                                        title={post?.title}
                                        imageUrl={post?.imageUrl ? `http://localhost:4444${post?.imageUrl}` : placeImage}
                                        userName={post?.user?.fullName}
                                        userImg={post?.user?.image}
                                        createdAt={post?.createdAt}
                                        viewsCount={post?.viewsCount}
                                        commentsCount={post?.commentsCount}
                                        tags={post?.tags}
                                        isEditable={userData?.data?._id === post?.user?._id}
                                    />
                                )
                            ))
                        }
                    </div>
                    <div className='home-sidebar'>
                        <Sidebar tags={tags}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home