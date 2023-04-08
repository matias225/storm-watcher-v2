import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Box, Heading } from "@chakra-ui/react";

// Este componente es un ejemplo de como interactuar con la db, no tiene relacion con el proyecto
export function GetUser() {

  const [userName, setUserName] = useState('Usuario');

  useEffect(() => {
    
    const getData = async() => {
      await getDocs(collection(db ,"users"))
        .then(datos => {
          const uname = datos.docs[0].data().name;
          setUserName(uname);
        });
    }
    getData();
  }, []);
  
  return (
    <>
      <Box p={3} m={3}>
        { userName === "Usuario" ? (
          <Heading as="h1" size="lg" m={4}>
            Loading... 
          </Heading>
        ) : (
          <Heading as="h1" size="lg" m={4}>
            Bienvenido { userName }
          </Heading>
        )}
      </Box>
    </>
  )
}
  