import { push } from 'connected-react-router';
import { db, FirebaseTimestamp } from '../../firebase/';

const productRef = db.collection('products');
export const saveProducts = (name, description, category, gender, price) => {
  return async (dispatch) => {
    const timeStamp = FirebaseTimestamp.now();

    const data = {
      category: category,
      description: description,
      gender: gender,
      name: name,
      price: parseInt(price, 10),
      update: timeStamp,
    };

    const ref = productRef.doc();
    const id = ref.id;
    data.id = id;
    data.created_at = timeStamp;

    return productRef
      .doc(id)
      .set(data)
      .then(() => {
        dispatch(push('/'));
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
};
