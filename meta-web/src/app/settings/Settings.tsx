'use client';
import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Divider
} from '@mui/material';
import settingsStyles from '@/styles/settings/settings.module.scss';

export default function SettingsPage() {
  return (
    <Container maxWidth="md" className={settingsStyles.settingsContainer}>
      <Typography variant="h4" gutterBottom className={settingsStyles.heading}>
        Settings
      </Typography>

      {/* Personal Information Section */}
      <Card className={settingsStyles.settingsCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="First Name" variant="outlined" defaultValue="John" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Last Name" variant="outlined" defaultValue="Doe" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" type="email" variant="outlined" defaultValue="johndoe@example.com" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                variant="outlined"
                defaultValue="1992-05-15"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Box textAlign="right" mt={2}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider className={settingsStyles.divider} />

      {/* Account Settings Section */}
      <Card className={settingsStyles.settingsCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Account Settings
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Username" variant="outlined" defaultValue="johndoe123" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Password" type="password" variant="outlined" defaultValue="password" />
            </Grid>
          </Grid>
          <Box textAlign="right" mt={2}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>

      <Divider className={settingsStyles.divider} />

      {/* Preferences Section */}
      <Card className={settingsStyles.settingsCard}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Preferences
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notification Preferences"
                variant="outlined"
                placeholder="Enter preferences (e.g., Email, SMS)"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Privacy Settings"
                variant="outlined"
                placeholder="Privacy preferences (e.g., Public, Private)"
              />
            </Grid>
          </Grid>
          <Box textAlign="right" mt={2}>
            <Button variant="contained" color="primary">
              Save Changes
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
