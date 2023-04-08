import { Link } from 'react-router-dom'
import { Box, Button, Flex, Heading } from '@chakra-ui/react'

export function MainPage() {
  return (
    <>
      <Box p={3} m={3}>
        <Heading as="h1" size="lg" m={4}>
            Bienvenido a StormApp
        </Heading>

        <Flex >
          <Link to={`/login`}>
            <Button p={3} m={2} colorScheme="green">
              Ingresar
            </Button> 
          </Link>
          <Link to={`/register`}>
            <Button p={3} m={2} colorScheme="blue">
              Registrar
            </Button> 
          </Link>
        </Flex>
      </Box>
    </>
  )
}