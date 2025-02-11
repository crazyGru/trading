import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import "./signup.css";
import Axios from '../../config/axios';
import { Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function SignUp() {
  const [error, setError] = React.useState("");
  const { isLoggedIn, setUser, setTokens, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn)
      navigate("/apartment")
  }, [isLoggedIn])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const confirm_password = data.get('confirm_password');
    const password = data.get('password');
    if(confirm_password != password) setError("Password doesn't match. Please enter your password correctly.");
    else{
      const registerBody = {
        email: data.get('email'),
        name: data.get('username'),
        password: data.get('password'),
        invite_code: data.get('invite_code')
      };
  
      Axios.post('/auth/register', registerBody)
        .then(res => {
          const { user, tokens } = res.data;
          setUser(user);
          setTokens(tokens);
          setIsLoggedIn(true);
        })
        .catch(error => {
          const msg = error.data.message;
          setError(msg);
        })
    }
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm_password"
                label="Confirm Password"
                type="password"
                id="confirm_password"
                autoComplete="confirm-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="invite_code"
                label="Invite Code"
                id="invite_code"
                autoComplete="invite-code"
              />
            </Grid>
          </Grid>
          {
            error && <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          }
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login">
                Already have an account? Sign in
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}