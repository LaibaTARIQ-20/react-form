import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }
    // TODO: Replace with your actual API call
    setMessage('Password reset link sent to your email!');
    console.log('Reset password for:', email);
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
              bgcolor: '#FF5722',
              width: 56,
              height: 56,
            }}
          >
            <BoltIcon sx={{ fontSize: 32 }} />
          </Avatar>

          <Typography
            component="h1"
            variant="h5"
            sx={{
              mt: 1,
              mb: 1,
              color: '#333',
              fontWeight: 'bold',
            }}
          >
            Forgot Password?
          </Typography>

          <Typography
            variant="body2"
            sx={{
              mb: 3,
              color: '#666',
              textAlign: 'center',
            }}
          >
            Email Address
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF5722',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF5722',
                  },
                },
              }}
            />

            {message && (
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  color: '#4caf50',
                  textAlign: 'center',
                }}
              >
                {message}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#2c3e50',
                color: 'white',
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#1a252f',
                },
              }}
            >
              Reset Password
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link
                onClick={() => navigate('/signin')}
                variant="body2"
                sx={{
                  color: '#e71010ff',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Back to Login
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ForgotPassword;