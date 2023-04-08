import React from "react";
import { Link } from 'react-router-dom';
import { Box, Button, Flex, Heading } from '@chakra-ui/react'


export function Login() {
  return (
    <>
    <Box p={3} m={3}>
      <Heading as="h1" size="lg" m={4}>
          Aca va el componente de Login
      </Heading>
      <Flex >
          <Link to={`/welcome`}>
            <Button colorScheme="green">
              Login
            </Button> 
          </Link>
        </Flex>
    </Box>
    </>
  )
}