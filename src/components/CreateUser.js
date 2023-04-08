import { useState } from 'react';
import { createUser } from '../services/createUser';
import { Box, Button, Heading, FormControl, FormLabel, Input } from '@chakra-ui/react';

export function CreateUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pass: ''
  });

  // Manejador de cambios en el formulario
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };
  
  // Manejador de envio de formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    createUser(formData);
  };

  return (
    <>
      <Box p={3} m={3}>
        <Heading as="h1" size="lg" m={4}>
            Registarse a StormApp
        </Heading>  
      </Box>
      <Box p={3} m={3} >
        <form onSubmit={handleSubmit}>
          <FormControl isRequired >
            <FormLabel>Nombre</FormLabel>
            <Input type='text' id="name" name="name" value={formData.name} onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Correo Electronico</FormLabel>
            <Input type='email' id="email" name="email" value={formData.email} onChange={handleChange}/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contraseña</FormLabel>
            <Input type='password' id="pass" name="pass" value={formData.pass} onChange={handleChange}/>
          </FormControl>
          <Button mt={4} colorScheme='teal' type='submit'>
            Enviar
          </Button>
        </form>
      </Box>
    </>
  )
}