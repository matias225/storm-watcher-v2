import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { updateProfile } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import { alertLogout } from './alerts';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch( startLoading() );
    signInWithEmailAndPassword( auth, email, password )
      .then( ({ user }) => {
        dispatch( login(user.uid, user.displayName) );
        dispatch( finishLoading() );
      }).catch( (e) => {
        console.log(e);
        dispatch( finishLoading() );
      });
  }
}

export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  return (dispatch) => {
    createUserWithEmailAndPassword( auth, email, password )
      .then( async({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch( login( user.uid, user.displayName ));
      })
      .catch( e => {
        console.log(e);
      });
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup( auth, googleAuthProvider )
      .then( ({ user }) => {
        dispatch( login( user.uid, user.displayName ));
    });
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
}) 

export const startLogout = () => {
  return async ( dispatch ) => {
    await signOut(auth);
    dispatch( logout() );
    dispatch( alertLogout() );
  }
}

export const logout = () => ({
  type: types.logout
})
