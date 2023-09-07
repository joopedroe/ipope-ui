import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Results } from '../../components/results/container/results';


const ResultsPage = () => {

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
            <Results />
          </Stack>
        </Container>
      </Box>
    </>);
};


export default ResultsPage;

