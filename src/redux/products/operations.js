import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/';

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
