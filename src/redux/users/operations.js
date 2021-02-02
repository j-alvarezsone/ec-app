import { signInAction } from './actions';
import { push } from 'connected-react-router';
import { auth, FirebaseTimestamp, db } from '../../firebase/index';
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

        db.collection('users')
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
    if (
      username === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Required field are not entered');
      return false;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return false;
    }
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
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

          db.collection('users')
            .doc(uid)
            .set(userInitialData)
            .then(() => {
              dispatch(push('/'));
            });
        }
      });
  };
};
