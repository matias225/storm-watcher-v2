import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleAuthProvider } from '../firebase/firebaseConfig';
import { types } from '../types/types';
import { updateProfile } from 'firebase/auth';
import { finishLoading, startLoading } from './ui';
import { alertLogout } from './alerts';
import Swal from 'sweetalert2';
import { saveUser } from '../helpers/saveUser';
import { getUser, getUserRole } from '../helpers/getUser';


// export const startLoginEmailPassword = (email, password) => {
//   return (dispatch) => {
//     dispatch( startLoading() );
//     signInWithEmailAndPassword( auth, email, password )
//       .then( ({ user }) => { 
//         dispatch( getUserFromFirestore(user) );
//       }).catch( (e) => {
//         dispatch( finishLoading() );
//         Swal.fire('Error', e.code, 'error');
//       });
//   }
// }

// Optimizacion 
export const  startLoginEmailPassword = (email, password) => {
  return async (dispatch) => {
    dispatch( startLoading() );
    try {
      const { user } = await signInWithEmailAndPassword( auth, email, password )
      dispatch( getUserFromFirestore(user) );
    } catch(e) {
      dispatch( finishLoading() );
      Swal.fire('Error', e.code, 'error');
    };
  }
}

// Funcion para registrar usuarios y loguearlos
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {
  return (dispatch) => {
    dispatch( startLoading() );
    createUserWithEmailAndPassword( auth, email, password )
      .then( async({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch( saveUserInFirestore(user.uid, user.email, user.displayName) );
      }).then(() => {
        dispatch( finishLoading() );
      })
      .catch( e => {
        console.log(e);
        dispatch( finishLoading() );
        Swal.fire('Error', e.code, 'error');
      });
  }
}

// Guarda los usuarios en Firestore y les asigna isAdmin en false por defecto
export const saveUserInFirestore = (uid, email, name) => {
  return (dispatch) => {
    const user = {
      uid: uid,
      email: email,
      name: name,
      isAdmin: false,
    }
    saveUser(user);
    dispatch( updateUser( user.isAdmin ) );
    dispatch( login(uid, name, user.isAdmin) );
  }
}

// Verifica que el usuario no exista en Firestore y si ese es el caso, lo guarda.
// La parte de verificacion de la Firestore y rol funciona, pero el problema 
// es que la pagina carga antes de tener el rol, por lo que el link se sale si no es admin
// o aparece tarde si es admin y si recargo la pagina tambien
// export const getUserFromFirestore = (user) => {
//   return (dispatch) => {
//     getUser(user.uid).then((userExists) => {
//       if (userExists) {
//         getUserRole(user.uid)
//           .then((isAdmin) => {
//             dispatch( updateUser( isAdmin ) );
//           });
//         Swal.close();
//       } else {
//         dispatch( saveUserInFirestore(user.uid, user.email, user.displayName) )
//         Swal.close();
//       }
//     }).then(() => {
//         dispatch( login(user.uid, user.displayName) );
//         dispatch( finishLoading() ) 
//       });
//   }
// }

// Funcion para consultar el rol cuando carga el home por primera vez o recargo el navegador
export const getIsAdminFromFirestore = ( uid ) => {
  return async (dispatch) => {
    try {
      const isAdmin = await getUserRole( uid );
      dispatch( updateUser( isAdmin ) );
    } catch (e) {
      }  
  }
}

// Funcion optimizada para consultar el usuario en Firebase cuando logueo
export const getUserFromFirestore = (user) => {
  return async (dispatch) => {
    try {
      const userExists = await getUser(user.uid);
      if (userExists) {
        const isAdmin = await getUserRole(user.uid);
        // localStorage.setItem("isAdmin", isAdmin);
        dispatch( updateUser( isAdmin ) );
      } else {
        dispatch( saveUserInFirestore(user.uid, user.email, user.displayName) )
      }
    } finally {
      dispatch( login(user.uid, user.displayName) );
      dispatch( finishLoading() );
      Swal.close();
    }
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    signInWithPopup( auth, googleAuthProvider )
      .then( ({ user }) => {
        dispatch( getUserFromFirestore(user) );
    });
  }
}

export const login = (uid, displayName, isAdmin) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
    isAdmin
  }
}) 

export const startLogout = () => {
  return async ( dispatch ) => {
    await signOut(auth);
    dispatch( logout() );
    dispatch( alertLogout() );
  }
}

export const updateUser = (isAdmin) => ({
  type: types.updateUser,
  payload: {
    isAdmin
  }
})

export const logout = () => ({
  type: types.logout
})
