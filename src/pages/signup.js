import { Box, Button, Container, FormControl, InputGroup, InputLeftAddon } from '@chakra-ui/react'
import { FormHelperText, FormLabel, Input, Stack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import Link from 'next/link'
import firebase from '../services/firebase'
import * as yup from 'yup'

import { Logo } from '../components/Logo'

const validationSchema = yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Preenchimento obrigatório'),
  password: yup.string().required('Preenchimento obrigatório'),
  username: yup.string().required('Preenchimento obrigatório')
})

export default function Home() {
  const formik = useFormik({
    onSubmit: async (values, form) => {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(values.email, values.password)
        console.log(user)
      } catch(error) {
        console.error(error)
      }
    },
    validationSchema,
    initialValues: {
      email: '',
      password: '',
      username: ''
    }
  })

  return (
    <Container minW='480px' p={ 4 } centerContent>
      <Logo />
      <Box p={ 4 } mt={ 8 }>
        <Text>Crie sua agenda compartilhada</Text>
      </Box>
      <Stack spacing={ 8 } w='100%'>
        <FormControl id='email'isRequired>
          <FormLabel color='gray.400'>E-mail</FormLabel>
          <Input
            size='lg'
            type='email'
            borderColor='gray.400'
            value={ formik.values.email }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          { formik.touched.email && (
            <FormHelperText color='red.400' >
              { formik.errors.email }
            </FormHelperText>
          ) }
        </FormControl>
        <FormControl id='password'isRequired>
          <FormLabel color='gray.400'>Senha</FormLabel>
          <Input
            size='lg'
            type='password'
            borderColor='gray.400'
            value={ formik.values.password }
            onChange={ formik.handleChange }
            onBlur={ formik.handleBlur }
          />
          { formik.touched.password && (
            <FormHelperText color='red.400' >
              { formik.errors.password }
            </FormHelperText>
          ) }
        </FormControl>
        <FormControl id='username' isRequired>
          <InputGroup size='lg'>
            <InputLeftAddon
              color='white'
              borderColor='gray.400'
              background='gray.400'
              children='http://clocker.work/'
            />
              <Input
                size='lg'
                type='text'
                borderColor='gray.400'
                value={ formik.values.username }
                onChange={ formik.handleChange }
                onBlur={ formik.handleBlur }
              />
            </InputGroup>
          { formik.touched.username && (
            <FormHelperText color='red.400' >
              { formik.errors.username }
            </FormHelperText>
          ) }
        </FormControl>
        <Button
          size='lg'
          w='100%'
          colorScheme='blue'
          isLoading={ formik.isSubmitting }
          onClick={ formik.handleSubmit }
        >
          Entrar
        </Button>
        <Box textAlign='center'>
          <Link href='/'>Já tem uma conta? Acesse!</Link>
        </Box>
      </Stack>
    </Container>
  )
}