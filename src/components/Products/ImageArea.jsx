import React, { useCallback } from 'react';
// material ui
import { IconButton } from '@material-ui/core';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { makeStyles } from '@material-ui/core/styles';
// redux
// import { useDispatch } from 'react-redux';
// firebase
import { storage } from '../../firebase/index';

import ImagePreview from './ImagePreview';

const useStyles = makeStyles({
  icon: {
    height: 48,
    width: 48,
  },
});

const ImageArea = (props) => {
  const { setImages, images } = props;
  const classes = useStyles();

  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files;
      let blob = new Blob(file, { type: 'image/jpeg' });

      // Generate random 16 digits strings
      const S =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join('');

      const uploadRef = storage.ref('images').child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          setImages((prevState) => [...prevState, newImage]);
        });
      });
    },
    [setImages]
  );

  const deleteImage = useCallback(
    async (id) => {
      const ret = window.confirm('Are you sure you want to delete?');
      if (!ret) {
        return false;
      } else {
        const newImages = images.filter((image) => image.id !== id);
        setImages(newImages);
        return storage.ref('images').child(id).delete();
      }
    },
    [images, setImages]
  );

  return (
    <div>
      <div className='p-grid__list-images'>
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview
              id={image.id}
              path={image.path}
              key={image.id}
              delete={deleteImage}
            />
          ))}
      </div>
      <div className='u-text-right'>
        <span>Register the product image</span>
        <IconButton className={classes.icon}>
          <label style={{ cursor: 'pointer' }}>
            <AddPhotoAlternateIcon />
            <input
              type='file'
              className='u-display-none'
              id='image'
              onChange={(e) => uploadImage(e)}
            />
          </label>
        </IconButton>
      </div>
    </div>
  );
};

export default ImageArea;
