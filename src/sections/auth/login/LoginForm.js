import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Snackbar, Alert} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const handleLogin = () => {
    if (username === process.env.REACT_APP_USER && password === process.env.REACT_APP_PASSWORD) {
      const token = 'seu-token-de-autenticacao';
      localStorage.setItem('token', token);
      navigate('/dashboard', { replace: true });
    } else {
      setOpen(true);
    }
  };

  const handleClose = ( ) => {
    setOpen(false);
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField required={true} name="user" label="Usuário" onChange={(event)=>setUsername(event.target.value)} />

        <TextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          onChange={(event)=>setPassword(event.target.value)}
          required={true}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton sx={{marginTop:'30px'}} fullWidth size="large" type="submit" variant="contained" onClick={handleLogin}>
        Entrar
      </LoadingButton>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="error">
          Credenciais inválidas!
        </Alert>
      </Snackbar>
    </>
  );
}
