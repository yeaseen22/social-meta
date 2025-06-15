# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy rest of the app
COPY . .

# Build TypeScript
RUN npm run build

# Expose port (default Express port)
EXPOSE 8080

# Run the server (adjust if your entry file is different)
CMD ["node", "dist/server.js"]
