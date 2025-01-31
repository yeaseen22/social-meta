"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  Fade,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import registerStyles from "@/styles/auth/register.module.scss";
import { useRouter } from "next/navigation";
import { useRegisterMutation, setCredentials } from "@/redux/slice/auth.slice";
import { useDispatch } from "react-redux";
import toaster from "react-hot-toast";

const genders = ["Male", "Female", "Non-binary", "Other"];
const professions = ["Student", "Engineer", "Designer", "Developer", "Other"];

export default function RegisterPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState(0);
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    title: "",
    gender: "",
    birthdate: "",
    profession: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { value: unknown }> | any
  ) => {
    const { name, value, type, files } = e.target as HTMLInputElement & {
      files?: FileList;
    };

    console.log("TYPING...", type, files, name, value);

    setFormData({
      ...formData,
      [name]: type === "file" ? files?.[0] || null : value,
    });
  };

  const handleTabChange = (newValue: number) => {
    setCurrentTab(newValue);
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.email || !formData.password) {
      toaster.error("Please fill out all required fields.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toaster.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  // const handleSubmit = async () => {
  //   console.log("Form submitted:", formData);

  //   if (!validateForm()) return;

  //   const formDataToSubmit = {
  //     ...formData,
  //     profileImage: formData.profileImage ? formData.profileImage : null,
  //   };

  //   try {
  //     const response = await register(formDataToSubmit).unwrap();
  //     dispatch(setCredentials(response));
  //     toaster.success("Registration successful!");
  //     router.push("/");
  //   } catch (error: any) {
  //     toaster.error(error?.data?.message || "Registration failed.");
  //   }
  // };

  const handleSubmit = async () => {
    if (!validateForm()) return;
  
    const formDataToSubmit = new FormData();
  
    // Append form data while safely checking types
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "profileImage" && typeof value !== "string") {
          // Safe check for non-string, assuming it's the file
          formDataToSubmit.append(key, value as Blob);
        } else {
          formDataToSubmit.append(key, value as string);
        }
      }
    });
  
    try {
      const response = await register(formDataToSubmit).unwrap();
      dispatch(setCredentials(response));
      toaster.success("Registration successful!");
      router.push("/");
    } catch (error: any) {
      toaster.error(error?.data?.message || "Registration failed.");
    }
  };
  


  // region Step-1
  const Step1 = () => (
    <Box className={registerStyles.step}>
      <Typography variant="h5">Basic Information</Typography>

      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        type="firstName"
        onChange={handleChange}
        value={formData.firstName}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        onChange={handleChange}
        value={formData.lastName}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Email"
        name="email"
        onChange={handleChange}
        value={formData.email}
        margin="normal"
      />

      <TextField
        fullWidth
        multiline
        minRows={2}
        label="Bio"
        name="bio"
        onChange={handleChange}
        value={formData.bio}
        margin="normal"
      />

      <TextField
        fullWidth
        label="Title"
        name="title"
        onChange={handleChange}
        value={formData.title}
        margin="normal"
      />
    </Box>
  );

  // region Step-2
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
        <Select
          name="profession"
          value={formData.profession}
          onChange={handleChange}
        >
          {professions.map((profession) => (
            <MenuItem key={profession} value={profession}>
              {profession}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );

  // region Step-3
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
          <Avatar
            src={URL.createObjectURL(formData.profileImage)}
            className={registerStyles.avatar}
          />
        ) : (
          <Avatar className={registerStyles.avatar}>
            <CloudUploadIcon />
          </Avatar>
        )}
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleChange}
            name="profileImage"
          />
          Upload Profile Picture
        </IconButton>
      </Box>
    </Box>
  );

  // region UI
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
          <Fade in={currentTab === 0}>
            <div>{currentTab === 0 ? <Step1 /> : null}</div>
          </Fade>
          <Fade in={currentTab === 1}>
            <div>{currentTab === 1 ? <Step2 /> : null}</div>
          </Fade>
          <Fade in={currentTab === 2}>
            <div>{currentTab === 2 ? <Step3 /> : null}</div>
          </Fade>
          <Box className={registerStyles.actions}>
            {currentTab > 0 && (
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => handleTabChange(currentTab - 1)}
              >
                Back
              </Button>
            )}
            {currentTab < 2 && (
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleTabChange(currentTab + 1)}
              >
                Next
              </Button>
            )}
            {currentTab === 2 && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}

            {currentTab === 0 && (
              <Button
                variant="text"
                color="primary"
                onClick={() => router.push("/login")}
              >
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
