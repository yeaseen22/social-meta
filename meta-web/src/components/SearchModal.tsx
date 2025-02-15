"use client"

import { useState } from "react"
import { Modal, Box, Typography, TextField, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material"

interface Post {
  id: number
  author: string
  content: string
  avatar: string
}

const mockPosts: Post[] = [
  { id: 1, author: "Alice", content: "Just finished a great book! 📚", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, author: "Bob", content: "Beautiful sunset today! 🌅", avatar: "/placeholder.svg?height=40&width=40" },
  {
    id: 3,
    author: "Charlie",
    content: "New recipe turned out amazing! 🍳",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  { id: 4, author: "Diana", content: "First day at the new job! 💼", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, author: "Ethan", content: "Just adopted a puppy! 🐶", avatar: "/placeholder.svg?height=40&width=40" },
]

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="search-modal-title" variant="h6" component="h2" gutterBottom>
          Search Posts
        </Typography>
        <TextField
          fullWidth
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          variant="outlined"
          margin="normal"
        />
        <List sx={{ mt: 2, maxHeight: 300, overflow: "auto" }}>
          {filteredPosts.map((post) => (
            <ListItem key={post.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={post.author} src={post.avatar} />
              </ListItemAvatar>
              <ListItemText primary={post.author} secondary={post.content} />
            </ListItem>
          ))}
          {filteredPosts.length === 0 && (
            <Typography align="center" color="text.secondary" sx={{ py: 2 }}>
              No posts found
            </Typography>
          )}
        </List>
      </Box>
    </Modal>
  )
}

