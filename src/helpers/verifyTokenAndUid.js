import { checkTokenInFirestore } from "./checkTokenInFirestore"

export const verifyTokenAndUid = async (uid) => {
  const tokenInFirebase = await checkTokenInFirestore(uid);

  // Verifico que si el token no existe o ya esta en Firestore
  if (!tokenInFirebase || tokenInFirebase[0] === undefined) {
    console.log('Token not found in firebase');
    return {
      tokenExists: false,
      userHasToken: false,
    };
  }
  return {
    tokenExists: true,
    userHasToken: true,
    tokenFound: tokenInFirebase[0]
  };
}