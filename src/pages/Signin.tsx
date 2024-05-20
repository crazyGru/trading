import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from '../config/axios';
import { Alert } from '@mui/material';
import useAuth from '../hooks/useAuth';

export default function SignIn() {
  const [error, setError] = useState("");
  const { isLoggedIn, setUser, setTokens, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn)
      navigate("/apartment")
  }, [isLoggedIn])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginBody = {
      email: data.get('email'),
      password: data.get('password'),
    };
    Axios.post('/auth/login', loginBody)
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
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
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <NavLink to="/register">
                Don't have an account? Sign Up
              </NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}