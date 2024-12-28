# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --silent

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

CMD [ "yarn", "start:prod" ]