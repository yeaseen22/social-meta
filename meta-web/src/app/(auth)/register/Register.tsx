'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, MenuItem, InputLabel, Select, FormControl, Tabs, Tab, Avatar, IconButton, Fade } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import registerStyles from '@/styles/auth/register.module.scss';
import { useRouter } from 'next/navigation';

const genders = ['Male', 'Female', 'Non-binary', 'Other'];
const professions = ['Student', 'Engineer', 'Designer', 'Developer', 'Other'];

export default function RegisterPage() {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        title: '',
        gender: '',
        birthdate: '',
        profession: '',
        password: '',
        confirmPassword: '',
        profileImage: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { value: unknown }> | any) => {
        const { name, value, type, files } = e.target as HTMLInputElement & { files?: FileList };
        setFormData({
            ...formData,
            [name]: type === 'file' ? files?.[0] || null : value,
        });
    };

    const handleTabChange = (newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleSubmit = () => {
        console.log('Form submitted:', formData);
    };

    const Step1 = () => (
        <Box className={registerStyles.step}>
            <Typography variant="h5">Basic Information</Typography>
            <TextField fullWidth label="First Name" name="firstName" onChange={handleChange} value={formData.firstName} margin="normal" />
            <TextField fullWidth label="Last Name" name="lastName" onChange={handleChange} value={formData.lastName} margin="normal" />
            <TextField fullWidth label="Email" name="email" onChange={handleChange} value={formData.email} margin="normal" />
            <TextField fullWidth multiline minRows={2} label="Bio" name="bio" onChange={handleChange} value={formData.bio} margin="normal" />
            <TextField fullWidth label="Title" name="title" onChange={handleChange} value={formData.title} margin="normal" />
        </Box>
    );

    const Step2 = () => (
        <Box className={registerStyles.step}>
            <Typography variant="h5">Profile Details</Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Select name="gender" value={formData.gender} onChange={handleChange}>
                    {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                            {gender}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                type="date"
                label="Birthdate"
                name="birthdate"
                onChange={handleChange}
                value={formData.birthdate}
                InputLabelProps={{ shrink: true }}
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Profession</InputLabel>
                <Select name="profession" value={formData.profession} onChange={handleChange}>
                    {professions.map((profession) => (
                        <MenuItem key={profession} value={profession}>
                            {profession}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );

    const Step3 = () => (
        <Box className={registerStyles.step}>
            <Typography variant="h5">Security & Profile</Typography>
            <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={formData.password}
                margin="normal"
            />
            <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                value={formData.confirmPassword}
                margin="normal"
            />
            <Box marginTop={2} textAlign="center">
                {formData.profileImage ? (
                    <Avatar src={URL.createObjectURL(formData.profileImage)} className={registerStyles.avatar} />
                ) : (
                    <Avatar className={registerStyles.avatar}>
                        <CloudUploadIcon />
                    </Avatar>
                )}
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleChange} name="profileImage" />
                    Upload Profile Picture
                </IconButton>
            </Box>
        </Box>
    );

    return (
        <Container className={registerStyles.container}>
            {/* Left Section */}
            <Box className={registerStyles.leftSection}>
                <Box className={registerStyles.formWrapper}>
                    <Tabs
                        value={currentTab}
                        onChange={(_, newValue) => handleTabChange(newValue)}
                        centered
                        TabIndicatorProps={{ className: registerStyles.tabIndicator }}
                    >
                        <Tab label="Step 1" />
                        <Tab label="Step 2" />
                        <Tab label="Step 3" />
                    </Tabs>
                    <Fade in={currentTab === 0}><div>{currentTab === 0 ? <Step1 /> : null}</div></Fade>
                    <Fade in={currentTab === 1}><div>{currentTab === 1 ? <Step2 /> : null}</div></Fade>
                    <Fade in={currentTab === 2}><div>{currentTab === 2 ? <Step3 /> : null}</div></Fade>
                    <Box className={registerStyles.actions}>
                        {currentTab > 0 && (
                            <Button startIcon={<ArrowBackIcon />} onClick={() => handleTabChange(currentTab - 1)}>
                                Back
                            </Button>
                        )}
                        {currentTab < 2 && (
                            <Button endIcon={<ArrowForwardIcon />} onClick={() => handleTabChange(currentTab + 1)}>
                                Next
                            </Button>
                        )}
                        {currentTab === 2 && (
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        )}

                        {currentTab === 0 && (
                            <Button variant='text' color="primary" onClick={() => router.push('/login')}>
                                Already have an account?
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Right Section */}
            <Box className={registerStyles.rightSection}>
                <Box className="overlay"></Box>
                <Box className={registerStyles.animatedText}>
                    <Typography variant="h4" className={registerStyles.text}>
                        Join Our Community
                    </Typography>
                    <Typography variant="h4" className={registerStyles.text}>
                        Build Connections
                    </Typography>
                    <Typography variant="h4" className={registerStyles.text}>
                        Grow Together
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
}
