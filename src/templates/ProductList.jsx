import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductCard } from '../components/Products';
import { fetchProducts } from '../redux/products/operations';
import { getProducts } from '../redux/products/selectors';

const ProductList = () => {
  const dispatch = useDispatch();
  const selectors = useSelector((state) => state);
  const products = getProducts(selectors);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className='c-section-wrapin'>
      <div className='p-grid__row'>
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              images={product.images}
              price={product.price}
            />
          ))}
      </div>
    </section>
  );
};

export default ProductList;
