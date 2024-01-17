import React, { useState, useRef, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import SimpleMde from 'react-simplemde-editor';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "easymde/dist/easymde.min.css";
import { useCreatePostMutation, useUploadImageMutation, useGetPostDetailsQuery } from '../../services/postApi';

import styles from './AddPost.module.scss';
import customAxios from '../../axios.js';


const AddPost = () => {
  const [ title, setTitle ] = useState('');
  const [ image, setImage ] = useState('');
  const [ tags, setTags ] = useState('');
  const [ text, setText ] = useState('');
  const [imageUrl, setImageUrl ] = useState('');
  const { id } = useParams();
  const inputRef = useRef(null);
  const isAuth = useSelector((state) => state.authSlice.isLoggedIn);
  const navigate = useNavigate();

  const isEditing = Boolean(id);

  // const { data } = useGetPostDetailsQuery(id);
  // console.log(isEditing);

  // const [createPost] = useCreatePostMutation();
  const [uploadImage] = useUploadImageMutation();

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags,
        text
      }
      // const { data } = await createPost(fields);
      // const id = data._id;

      const { data } = isEditing ? await customAxios.patch(`/posts/${id}`, fields) : await customAxios.post('/posts', fields);

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`)

    } catch (err) {
      console.warn(err)
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl('')
  }

  const handleChangeFile = async (event) => {
    const formData = new FormData();
    const file = event.target.files[0]

    formData.append('image', file);

    const { data } = await uploadImage(formData);

    setImageUrl(data.url)
  }
  const onChange = useCallback((value) => {
    setText(value)
  }, []);

  useEffect(() => {
    if (id) {
      customAxios
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setText(data.text);
          setImageUrl(data.imageUrl);
          setTags(data.tags.join(','));
        })
        .catch((err) => {
          console.warn(err);
          alert('Ошибка при получении статьи!');
        });
    }
  }, []);

  if (!window.localStorage.getItem('token') && !isAuth) {
    navigate('/')
  }
  return (
    <div className='post-editor'>
      <div className="container">
        <div className="image">
          <Button variant='outlined' size='large' onClick={() => inputRef.current.click()}>Load preview</Button>
          <input ref={inputRef} type='file' hidden onChange={handleChangeFile}/>
          {
            imageUrl && (
              <>
                <Button variant='contained' color="error" onClick={onClickRemoveImage}>Delete</Button>
                <img className='' src={`${process.env.REACT_APP_API_URL}${imageUrl}`}/>
              </>
            )
          }    

        </div>
        <br/>
        <br/>
        <TextField  value={title || ''} onChange={(e) => setTitle(e.target.value)} variant='standard' placeholder='Post title' fullWidth classes={{root: styles.title}}/>
        <TextField value={tags || ''} onChange={(e) => setTags(e.target.value)} variant='standard' placeholder='Tags' fullWidth classes={{root: styles.tags}}/>
        <SimpleMde className={styles.editor} onChange={onChange} value={text || ''}/>
        <div className={styles.buttons}>
          <Button size='large' variant='contained' color='primary' onClick={onSubmit}>Add post</Button>
          <Button size='large' variant='outlined' color='primary'>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default AddPost