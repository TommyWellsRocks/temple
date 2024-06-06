# Use a Node.js base image
FROM node:22.2

# Set the working directory in the container
WORKDIR /workout

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to run the application
CMD ["npx","tsx", "exercises.ts", "8000"]