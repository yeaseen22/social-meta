'use client';
import React from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Divider,
} from '@mui/material';
// import loginStyles from '@/styles/auth/login.module.scss';
import { useRouter } from 'next/navigation';
import { useLoginMutation, setCredentials } from '@/redux/slice/auth.slice';
import { useDispatch } from 'react-redux';
import { useFormHandler } from '@/hooks/useForm'; 
import toast from 'react-hot-toast';
import { setAuthCookie } from "@/lib/authToken";


// Validation Rules
const validationRules = {
  email: (value: string) =>
    !value ? 'Email is required.' : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
      ? 'Invalid email format.'
      : '',
  password: (value: string) =>
    value.length < 6 ? 'Password must be at least 6 characters.' : '',
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    validateForm,
  } = useFormHandler(
    { email: '', password: '', rememberMe: false },
    validationRules
  );

 const handleLogin = async (event: React.FormEvent) => {
  event.preventDefault();

  if (!validateForm()) return;

  try {
    const { data } = await login({
      email: formData.email,
      password: formData.password,
    }).unwrap();

    // 1. Dispatch to Redux
    dispatch(setCredentials({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    }));

    // 2. Store in localStorage for persistence
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    // 3. Redirect or show toast
    toast.success("Login successful!");
    setAuthCookie(data.accessToken)
    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed.");
  }
};


  return (
    <Container maxWidth={false} className='loginContainer'>
      {/* Left Section */}
      <Box className='leftSection'>
        <Box className="overlay"></Box>
        <Box className='animatedText'>
          <Typography variant="h4" className='text'>
            Welcome to Our Community
          </Typography>
          <Typography variant="h4" className='text'>
            Share your moments.
          </Typography>
          <Typography variant="h4" className='text'>
            Connect with your friends.
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box className='rightSection'>
        <Box className='formBox'>
          <Typography variant="h5" className='title'>
            Login to Your Account
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
              className="textField"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.password}
              helperText={errors.password}
              className="textField"
            />
            <Box className='actions'>
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                }
                label="Remember Me"
              />
              <Button className='forgotPassword' size="small">
                Forgot Password?
              </Button>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className='loginButton'
              type="submit"
              disabled={isLoading}
            >
              Login
            </Button>
            <Divider className='divider'>or</Divider>

            <Button variant="text" color="primary" onClick={() => router.push('/register')}>
              Want to create account?
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
}
