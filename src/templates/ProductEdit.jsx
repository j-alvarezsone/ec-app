import React, { useState, useCallback } from 'react';
import { TextInput, SelectBox, PrimaryButton } from '../components/UIkit/';
import { useDispatch } from 'react-redux';
import { saveProducts } from '../redux/products/operations';

const ProductEdit = () => {
  const [name, setName] = useState(''),
    [description, setDescription] = useState(''),
    [category, setCategory] = useState(''),
    [gender, setGender] = useState(''),
    [price, setPrice] = useState('');

  const dispatch = useDispatch();

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
        <div className='module-spacer--medium' />
        <div className='center'>
          <PrimaryButton
            label={'Save'}
            onClick={() =>
              dispatch(saveProducts(name, description, category, gender, price))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
