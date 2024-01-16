import React, { useState, useRef, useCallback } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import SimpleMde from 'react-simplemde-editor';
import { useNavigate } from 'react-router-dom';
import "easymde/dist/easymde.min.css";
import noAvatarImg from '../../img/noimage.jpg';
import { useCreatePostMutation, useUploadImageMutation } from '../../services/postApi';


import styles from './AddPost.module.scss';


const AddPost = () => {
  const [ title, setTitle ] = useState('');
  const [ image, setImage ] = useState('');
  const [ tags, setTags ] = useState('');
  const [ text, setText ] = useState('');
  const [imageUrl, setImageUrl ] = useState('');

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const [createPost, {data, error}] = useCreatePostMutation();
  const [uploadImage] = useUploadImageMutation();

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text
      }

      const { data } = await createPost(fields);
      const id = data._id;

      console.log(fields)

      navigate(`/posts/${id}`)

    } catch (err) {
      console.warn(error)
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
    console.log(imageUrl);
  const onChange = useCallback((value) => {
    setText(value)
  }, [])
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
                <img className='' src={`http://localhost:4444${imageUrl}`}/>
              </>
            )
          }    

        </div>
        <br/>
        <br/>
        <TextField onChange={(e) => setTitle(e.target.value)} variant='standard' placeholder='Post title' fullWidth classes={{root: styles.title}}/>
        <TextField onChange={(e) => setTags(e.target.value)} variant='standard' placeholder='Tags' fullWidth classes={{root: styles.tags}}/>
        <SimpleMde className={styles.editor} onChange={onChange}/>
        <div className={styles.buttons}>
          <Button size='large' variant='contained' color='primary' onClick={onSubmit}>Add post</Button>
          <Button size='large' variant='outlined' color='primary'>Cancel</Button>
        </div>
      </div>
    </div>
  )
}

export default AddPost