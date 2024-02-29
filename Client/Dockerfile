# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.11.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Set the working directory in the container
WORKDIR /app

# Install serve globally to serve the app
RUN npm install -g serve

# Copy the build directory contents into the container at /app
# Make sure to build your Expo web app locally first and remove web-build from .gitignore temporarily if you're copying it directly
COPY ./web-build .

# Tell the world we expose port 5000 (or whichever port you prefer)
EXPOSE 3000

# Command to run the app using serve
CMD ["serve", "-s", ".", "-p", "3000"]
