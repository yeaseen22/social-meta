'use client';
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  IconButton,
  Typography,
} from '@mui/material';
import { TweetCard } from '@/components/common';
import { useGetCurrentUserQuery, useGetUserPostsQuery, useUploadCoverPhotoMutation, useUploadProfilePhotoMutation } from '@/redux/slice/post.slice';
import { useParams } from 'next/navigation';
import { CloudUpload } from '@mui/icons-material';


type UserProfile = {
  firstName: string;
  lastName: string;
  bio: string;
  email: string;
  dateOfBirth: string;
  avatarUrl: string;
  coverImageUrl: string;
  followers: number;
  following: number;
};

export default  function page() {
  const { id } = useParams();
  const [uploadProfilePhoto] = useUploadProfilePhotoMutation();
  const [uploadCoverPhoto] = useUploadCoverPhotoMutation();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const { data: userData, isFetching: userFetching } = useGetCurrentUserQuery(id);
  const { data: userPosts, isFetching: postsFetching, isError, error } = useGetUserPostsQuery(id);

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);


  useEffect(() => {
    if (userData?.userById) {
      const user = userData.userById;
      setUserProfile({
        firstName: user.firstname,
        lastName: user.lastname,
        bio: user.bio,
        email: user.email,
        dateOfBirth: user.birthdate,
        avatarUrl: user.profilePhoto,
        coverImageUrl: user.coverPhoto,
        followers: user.followers_count,
        following: user.followings_count,
      });
    }
  }, [userData]);

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'profile' | 'cover'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    if (type === 'profile') {
      setProfilePreview(URL.createObjectURL(file));
      const response = await uploadProfilePhoto({ userId: id, formData });

      if ('data' in response && response.data?.profilePhoto) {
        setUserProfile((prev) =>
          prev
            ? {
              ...prev,
              avatarUrl: response.data.profilePhoto,
            }
            : prev
        );
      }
    } else {
      setCoverPreview(URL.createObjectURL(file));
      const response = await uploadCoverPhoto({ userId: id, formData });

      if ('data' in response && response.data?.coverPhoto) {
        setUserProfile((prev) =>
          prev
            ? {
              ...prev,
              coverImageUrl: response.data.coverPhoto,
            }
            : prev
        );
      }
    }
  };

  return (
    <Container maxWidth="md" className="profileContainer">
      {/* Cover Image */}
      <Card className="coverCard">
        <CardMedia
          component="img"
          height="200"
          image={ userProfile?.coverImageUrl}
          alt="Cover"
          className="coverImage"
        />
        <input type="file" accept="image/*" id="cover-upload" style={{ display: 'none' }} onChange={(e) => handleUpload(e, 'cover')} />
        <label htmlFor="cover-upload">
          <IconButton component="span" className="coverUploadButton">
            <CloudUpload />
          </IconButton>
        </label>
        <Box className="avatarSection">
          <Avatar
            alt={`${userProfile?.firstName} ${userProfile?.lastName}`}
            src={ userProfile?.avatarUrl}
            className="avatar"
          />
          <input type="file" accept="image/*" id="profile-upload" style={{ display: 'none' }} onChange={(e) => handleUpload(e, 'profile')} />
          <label htmlFor="profile-upload">
            <IconButton component="span" className="profileUploadButton">
              <CloudUpload />
            </IconButton>
          </label>
        </Box>
      </Card>

      {/* Personal Info Section */}
      <Card className="infoCard">
        <CardContent>
          <Typography variant="h5" className="name">
            {userProfile?.firstName} {userProfile?.lastName}
          </Typography>
          <Typography variant="subtitle1" className="bio">
            {userProfile?.bio}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Email:</strong> {userProfile?.email}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <strong>Date of Birth:</strong>{' '}
            {userProfile?.dateOfBirth ? new Date(userProfile.dateOfBirth).toLocaleDateString() : 'N/A'}
          </Typography>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card className="statsCard">
        <CardContent>
          <Box display="flex" justifyContent="space-around">
            <Box textAlign="center">
              <Typography variant="h6">{userProfile?.followers}</Typography>
              <Typography variant="body2" color="textSecondary">
                Followers
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="h6">{userProfile?.following}</Typography>
              <Typography variant="body2" color="textSecondary">
                Following
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tweets Section */}
      <Box mt={3}>
        <Typography variant="h6" className="tweetsTitle">
          My Tweets
        </Typography>

        {postsFetching ? (
          <Typography>Loading posts...</Typography>
        ) : isError ? (
          <Typography color="error">Failed to load posts: {(error as Error)?.message || 'Unknown error'}</Typography>
        ) : userPosts?.length > 0 ? (
          userPosts.map((post: { _id: string; content: any; createdAt: any; likes_count: any; comments_count: any; owner: { _id: any; firstname: any; lastname: any; profilePhoto: any; title: any; }; }) => (
            <Box key={post._id} mt={2}>
              <TweetCard post={{
                _id: post._id,
                content: post.content,
                createdAt: post.createdAt,
                likes_count: post.likes_count,
                comments_count: post.comments_count,
                dislikes_count: 0, // Default value since backend doesn't return it
                owner: {
                  _id: post.owner._id,
                  firstname: post.owner.firstname,
                  lastname: post.owner.lastname,
                  profilePhoto: post.owner.profilePhoto,
                  title: post.owner.title
                }
              }} />
            </Box>
          ))) : (
          <Typography>No posts found.</Typography>
        )}
      </Box>
    </Container>
  );
}