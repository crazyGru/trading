import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import "./signup.css";
import Axios from '../../config/axios';
import { Alert } from '@mui/material';
import useAuth from '../../hooks/useAuth';

export default function SignUp() {
  const [error, setError] = React.useState("");
  const { setUser, setTokens, setIsLoggedIn } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const registerBody = {
      email: data.get('email'),
      name: data.get('username'),
      role: data.get('role'),
      password: data.get('password'),
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
            <Grid item xs={12} sm={6} className="role-select">
              <input type="radio" name="role" id="user" value="user" defaultChecked />
              <label htmlFor="user">
                Join as User
              </label>
            </Grid>
            <Grid item xs={12} sm={6} className="role-select">
              <input type="radio" name="role" id="realtor" value="realtor" />
              <label htmlFor="realtor">
                Join as Realtor
              </label>
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