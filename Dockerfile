# Use an official Node.js runtime as a parent image
FROM node:18-alpine
ENV REACT_APP_BACKEND_BASE_URL="http://localhost"
ENV REACT_APP_BACKEND_PORT_NUM="5000"

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package.json /app

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . /app

# Build the app for production
RUN npm run build

# Serve the app on port 3000
EXPOSE 3000
CMD ["npm", "run", "start"]