"use client";
import { useState } from 'react';
import { Button, TextField, Typography, Box, Link } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (!email) {
      setEmailError('Email ou número de telefone é obrigatório.');
      return;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('A senha é obrigatória.');
      return;
    } else {
      setPasswordError('');
    }

    // Autenticação via NextAuth usando o provedor 'credentials'
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (!result.ok) {
      setLoginError('Usuário ou senha incorretos');
    } else {
      setLoginError('');
      // Redirecionar para a página inicial ou outra após login bem-sucedido
      window.location.href = '/'; // exemplo de redirecionamento
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fb',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: { xs: '90%', sm: '480px' },
          padding: '50px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Box mb={3}>
          <Image src="/bazar.png" alt="Bazaar Logo" width={120} height={100} />
        </Box>

        <Typography variant="h4" sx={{ fontFamily: 'Poppins, sans-serif', fontSize: '24px', mb: 2, color: '#2f3349' }}>
          Bem-vindo ao Bazaar
        </Typography>

        <TextField
          id="email"
          fullWidth
          label="Email ou número de telefone"
          placeholder="exemplo.email.com"
          variant="outlined"
          margin="normal"
          error={!!emailError}
          helperText={emailError}
        />

        <Box position="relative" width="100%">
          <TextField
            id="password"
            fullWidth
            label="Senha"
            placeholder="**********"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            onClick={togglePasswordVisibility}
            sx={{ position: 'absolute', right: 2, top: 28 }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </Button>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: '#ff4b5c',
            color: '#fff',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
              backgroundColor: '#ff4b5c',
            },
          }}
          onClick={handleLogin}
        >
          Entrar
        </Button>

        {loginError && (
          <Typography variant="body2" sx={{ color: '#f44336', fontFamily: 'Poppins, sans-serif', mt: 1 }}>
            {loginError}
          </Typography>
        )}

        <Typography variant="body1" sx={{ fontFamily: 'Poppins, sans-serif', color: '#777', mt: 2 }}>
          ou
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginBottom: 1,
            backgroundColor: '#4285F4', // Azul do Google
            color: '#fff',
            padding: '10px',
            fontSize: '14px',
            textTransform: 'none',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#357ae8',
            },
          }}
          onClick={() => signIn('google')}
          startIcon={<GoogleIcon sx={{ mr: 1 }} />}
        >
          Continuar com Google
        </Button>

        {/* Botão de login com Facebook, ainda não implementado */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            marginBottom: 2,
            backgroundColor: '#1877F2', // Azul do Facebook
            color: '#fff',
            padding: '10px',
            fontSize: '14px',
            textTransform: 'none',
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#166fe5',
            },
          }}
          startIcon={<FacebookIcon sx={{ mr: 1 }} />}
        >
          Continuar com Facebook
        </Button>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            marginTop: '10px',
            alignItems: 'center',
          }}
        >
          <Link
            href="#"
            underline="hover"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#2f3349',
              mb: 1,
              border: '1px solid #ccc',
              padding: '10px',
              width: '100%',
              textAlign: 'center',
              borderRadius: '5px',
            }}
          >
            Esqueceu a senha?
          </Link>
          <Link
            href="#"
            underline="hover"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '14px',
              color: '#2f3349',
              border: '1px solid #ccc',
              padding: '10px',
              width: '100%',
              textAlign: 'center',
              borderRadius: '5px',
            }}
          >
            Criar conta
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
