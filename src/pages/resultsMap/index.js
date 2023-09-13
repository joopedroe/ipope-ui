import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, Stack, Typography } from '@mui/material';
import { ResultsMaps } from '../../components/results/container/resultsMaps';


const ResultsPage = () => {

  return (
    <>
      <Helmet>
        <title>
          Resultados
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
            <ResultsMaps />
          </Stack>
        </Container>
      </Box>
    </>);
};


export default ResultsPage;

