import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/';
import { deleteProductAction, fetchProductsAction } from './actions';

const productRef = db.collection('products');
export const saveProducts = (
  name,
  description,
  category,
  gender,
  price,
  images,
  id,
  sizes
) => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      sizes: sizes,
      updated_at: timeStamp,
    };

    if (id === '') {
      const ref = productRef.doc();
      data.created_at = timeStamp;
      id = ref.id;
      data.id = id;
    }

    return productRef
      .doc(id)
      .set(data, { merge: true })
      .then(() => {
        dispatch(push('/'));
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};

export const fetchProducts = () => {
  // orderBy() will sort the type of query
  return async (dispatch) => {
    productRef
      .orderBy('updated_at', 'desc')
      .get()
      .then((snapshots) => {
        const productList = [];
        snapshots.forEach((snapshot) => {
          const product = snapshot.data();
          productList.push(product);
        });
        dispatch(fetchProductsAction(productList));
      });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    productRef
      .doc(id)
      .delete()
      .then(() => {
        const prevProducts = getState().products.list;
        const nextProducts = prevProducts.filter(
          (product) => product.id !== id
        );
        dispatch(deleteProductAction(nextProducts));
      });
  };
};
