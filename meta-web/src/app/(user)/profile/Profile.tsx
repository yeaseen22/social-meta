'use client';
import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { TweetCard } from '@/components/common';

export default function Profile() {
  // Sample data for the profile and tweets
  const userProfile = {
    firstName: 'Ken',
    lastName: 'Thompson',
    bio: 'Full-stack developer passionate about coding and creating amazing applications.',
    email: 'johndoe@example.com',
    dateOfBirth: '1992-05-15',
    avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Ken_Thompson%2C_2019.jpg/220px-Ken_Thompson%2C_2019.jpg',
    // coverImageUrl: 'https://via.placeholder.com/1280x400',
    coverImageUrl: 'https://mycvcreator.com/administrator/postimages/66c080d1a7cc04.52686998.jpg',
    followers: 150,
    following: 200,
  };

  const tweets = [
    { id: 1, content: 'Learning Next.js is fun!', timestamp: '2025-01-01' },
    { id: 2, content: 'Just posted another project 🚀', timestamp: '2025-01-02' },
  ];

  return (
    <Container maxWidth="md" className='profileContainer'>
      {/* Cover Image */}
      <Card className='coverCard'>
        <CardMedia
          component="img"
          height="200"
          image={userProfile.coverImageUrl}
          alt="Cover"
          className='coverImage'
        />
        <Box className='avatarSection'>
          <Avatar
            alt={`${userProfile.firstName} ${userProfile.lastName}`}
            src={userProfile.avatarUrl}
            className='avatar'
          />
        </Box>
      </Card>

      {/* Personal Info Section */}
      <Card className='infoCard'>
        <CardContent>
          <Typography variant="h5" className='name'>
            {userProfile.firstName} {userProfile.lastName}
          </Typography>
          <Typography variant="subtitle1" className='bio'>
            {userProfile.bio}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Email:</strong> {userProfile.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Date of Birth:</strong> {new Date(userProfile.dateOfBirth).toLocaleDateString()}
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card className='statsCard'>
        <CardContent>
          <Box display="flex" justifyContent="space-around">
            <Box textAlign="center">
              <Typography variant="h6">{userProfile.followers}</Typography>
              <Typography variant="body2" color="textSecondary">
                Followers
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6">{userProfile.following}</Typography>
              <Typography variant="body2" color="textSecondary">
                Following
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tweets Section */}
      <Box mt={3}>
        <Typography variant="h6" className='tweetsTitle'>
          My Tweets
        </Typography>
        {tweets.map((tweet) => (
          <Box key={tweet.id} mt={2}>
            <TweetCard post={{
              content: '',
              _id: '',
              createdAt: '',
              likes_count: 0,
              comments_count: 0,
              dislikes_count: 0,
              owner: {
                firstname: '',
                lastname: '',
                profilePhoto: undefined,
                title: '',
                _id: undefined
              }
            }} />
          </Box>
        ))}
      </Box>
    </Container>
  );
}
