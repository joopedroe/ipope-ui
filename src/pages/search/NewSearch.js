import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Form } from '../../components/formSearch/container/Form';


const Page = () => {

  return (
    <>
      <Helmet>
        <title>
          Editar pesquisa
        </title>
      </Helmet>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Form />
          </Stack>
        </Container>
      </Box>
    </>);
};


export default Page;

