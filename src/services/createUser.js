import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';


// Esta mal, mirar curso de REACT para ver como se hace
export function createUser(userData) {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, userData.name, userData.email)
   .then((userCredential) => {
    const user = userCredential.user;
    console.log('Usuario creado: ', user);
   })
   .catch((error) => {
    const errorMessage = error.mesage;
    console.log(errorMessage);
   }); 
}