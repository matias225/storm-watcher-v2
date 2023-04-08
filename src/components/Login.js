import { Link } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'


export function Login() {

  return (
    <>
      <Box p={3} m={3}>
        <Heading as="h1" size="lg" m={4}>
            Iniciar Sesion
        </Heading>
      </Box>
      <Box p={3} m={3}>
        <FormControl isRequired>
          <FormLabel>Correo Electronico</FormLabel>
          <Input type='email' />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Contraseña</FormLabel>
          <Input type='password' />
        </FormControl>
          <Link to={`/welcome`}>
            <Button 
              mt={4}
              colorScheme='teal'
              type='submit'
            >
              Login
            </Button> 
          </Link>
      </Box>
    </>
  )
}