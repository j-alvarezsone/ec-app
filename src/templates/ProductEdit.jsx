import React, { useState, useCallback, useEffect } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit/';
import { useDispatch } from 'react-redux';
import { saveProducts } from '../redux/products/operations';
import ImageArea from '../components/Products/ImageArea';
import { db } from '../firebase/index';
import { SetSizesArea } from '../components/Products';
const ProductEdit = () => {
  const dispatch = useDispatch();
  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== '') {
    id = id.split('/')[1];
  }

  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [images, setImages] = useState([]),
    [price, setPrice] = useState(''),
    [sizes, setSizes] = useState([]);

  useEffect(() => {
    if (id !== '') {
      db.collection('products')
        .doc(id)
        .get('products')
        .then((snapshot) => {
          const data = snapshot.data();
          setImages(data.images);
          setName(data.name);
          setDescription(data.description);
          setCategory(data.category);
          setPrice(data.price);
          setGender(data.gender);
          setSizes(data.sizes);
        });
    }
  }, [id]);

  const inputName = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (e) => {
      setDescription(e.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (e) => {
      setPrice(e.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: 'tops', name: 'Tops' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'pants', name: 'Pants' },
  ];

  const genders = [
    { id: 'all', name: 'All' },
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' },
  ];

  return (
    <section>
      <h2 className='u-text__headline u-text-center'>
        Product registration and editing
      </h2>
      <div className='c-section-container'>
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={'Product name'}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={'text'}
        />
        <TextInput
          fullWidth={true}
          label={'Description'}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={'text'}
        />
        <SelectBox
          label={'Category'}
          required={true}
          options={categories}
          select={setCategory}
          value={category}
        />
        <SelectBox
          label={'Gender'}
          required={true}
          options={genders}
          select={setGender}
          value={gender}
        />
        <TextInput
          fullWidth={true}
          label={'Price'}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={'number'}
        />
        <div className='module-spacer--small' />
        <SetSizesArea sizes={sizes} setSizes={setSizes} />
        <div className='module-spacer--small' />
        <div className='center'>
          <PrimaryButton
            label={'Save'}
            onClick={() =>
              dispatch(
                saveProducts(
                  name,
                  description,
                  category,
                  gender,
                  price,
                  images,
                  id,
                  sizes
                )
              )
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
