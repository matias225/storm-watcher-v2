import { Box, Button, Flex, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function MainPage() {
  return (
    <>
      <Box p={3} m={3}>
        <Heading as="h1" size="lg" m={4}>
            Bienvenido a StormApp
        </Heading>

        <Flex >
          <Link to={`/login`}>
            <Button colorScheme="green">
              Login
            </Button> 
          </Link>
        </Flex>
      </Box>
    </>
  )
}