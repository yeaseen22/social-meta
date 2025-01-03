'use client';
import React, { useState } from 'react';
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
// import GoogleIcon from '@mui/icons-material/Google';
import loginStyles from '@/styles/auth/login.module.scss';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleLogin = () => {
        console.log('Login form submitted:', formValues);
    };

    return (
        <Container maxWidth={false} className={loginStyles.loginContainer}>
            {/* Left Section */}
            <Box className={loginStyles.leftSection}>
                <Box className="overlay"></Box>
                <Box className={loginStyles.animatedText}>
                    <Typography variant="h4" className={loginStyles.text}>
                        Welcome to Our Community
                    </Typography>
                    <Typography variant="h4" className={loginStyles.text}>
                        Share your moments.
                    </Typography>
                    <Typography variant="h4" className={loginStyles.text}>
                        Connect with your friends.
                    </Typography>
                </Box>
            </Box>

            {/* Right Section */}
            <Box className={loginStyles.rightSection}>
                <Box className={loginStyles.formBox}>
                    <Typography variant="h5" className={loginStyles.title}>
                        Login to Your Account
                    </Typography>
                    <form>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            variant="outlined"
                            margin="normal"
                            value={formValues.email}
                            onChange={handleChange}
                            className="textField"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            value={formValues.password}
                            onChange={handleChange}
                            className="textField"
                        />
                        <Box className={loginStyles.actions}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={formValues.rememberMe}
                                        onChange={handleChange}
                                    />
                                }
                                label="Remember Me"
                            />
                            <Button className={loginStyles.forgotPassword} size="small">
                                Forgot Password?
                            </Button>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={loginStyles.loginButton}
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Divider className={loginStyles.divider}>or</Divider>

                        <Button variant='text' color="primary" onClick={() => router.push('/register')}>
                            Want to create account?
                        </Button>

                        {/* NOT USING THE GOOGLE OR ANY THIRD PARTY LOGIN */}
                        {/* <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            className={loginStyles.socialButton}
                        >
                            Continue with Google
                        </Button> */}
                    </form>
                </Box>
            </Box>
        </Container>
    );
}
