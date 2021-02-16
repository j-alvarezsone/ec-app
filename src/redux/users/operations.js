import { signInAction, signOutAction, fetchProductsInCartAction } from './actions';
import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';

const usersRef = db.collection('users');

// check if is sign in
export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        dispatch(push('/signin'));
      }
    });
  };
};
export const signIn = (email, password) => {
  return async (dispatch) => {
    // validation
    if (email === '' || password === '') {
      alert('Required field are not entered');
      return false;
    }
    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        usersRef
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // validation
    if (username === '' || email === '' || password === '' || confirmPassword === '') {
      alert('Required field are not entered');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return false;
    }
    return auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timeStamp = FirebaseTimestamp.now();

        const userInitialData = {
          created_at: timeStamp,
          email: email,
          role: 'customer',
          uid: uid,
          updated_at: timeStamp,
          username: username,
        };

        usersRef
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            dispatch(push('/'));
          });
      }
    });
  };
};

export const signOut = () => {
  return async (dispatch) => {
    auth.signOut().then(() => {
      dispatch(signOutAction());
      dispatch(push('/signin'));
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === '') {
      alert('Required field are not entered');
      return false;
    } else {
      auth
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Please confirm that we have sent a password reset email to the address you entered');
          dispatch(push('/signin'));
        })
        .catch(() => {
          alert('This is a , fail address that has not been registered. Please check it once.');
        });
    }
  };
};

export const addProductToCart = (addedProduct) => {
  return async (dispatch, getState) => {
    const uid = getState().users.uid;
    const cartRef = usersRef.doc(uid).collection('cart').doc();
    addedProduct['cartId'] = cartRef.id;
    await cartRef.set(addedProduct);
    dispatch(push('/'));
  };
};

export const fetchProductsInCart = (products) => {
  return async (dispatch) => {
    dispatch(fetchProductsInCartAction(products));
  };
};
