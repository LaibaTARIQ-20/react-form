import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = React.useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => {
    // simple email regex
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, confirmPassword } = values;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Signing up with', values);
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 4,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            width: '100%',
            maxWidth: '450px',
            margin: '0 auto',
          }}
        >
          <Avatar 
            sx={{ 
              m: 1, 
              bgcolor: '#d82008ff',
              width: 56,
              height: 56,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          
          <Typography 
            component="h1" 
            variant="h5"
            sx={{
              mt: 1,
              mb: 2,
              color: '#333',
              fontWeight: 'bold',
            }}
          >
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={values.name}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#FF5722' },
                  '&.Mui-focused fieldset': { borderColor: '#FF5722' },
                },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }

              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#FF5722' },
                  '&.Mui-focused fieldset': { borderColor: '#FF5722' },
                },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }

              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={values.password}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#FF5722' },
                  '&.Mui-focused fieldset': { borderColor: '#FF5722' },
                },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }

              }}
            
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#ddd' },
                  '&:hover fieldset': { borderColor: '#FF5722' },
                  '&.Mui-focused fieldset': { borderColor: '#FF5722' },
                },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#FF5722' }
              }}
            />

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <Button 
              type="submit" 
              fullWidth 
              variant="contained" 
              sx={{ 
                mt: 3, 
                mb: 2,
                backgroundColor: '#e03213ff',
                color: 'white',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                '&:hover': { backgroundColor: '#e93212ff' },
              }}
            >
              Sign Up
            </Button>

            <Grid container spacing={2} justifyContent="Center" alignItems="center">
              <Grid item>
                <Link 
                  href="/signin" 
                  variant="body2"
                  sx={{ color: '#e42517ff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}