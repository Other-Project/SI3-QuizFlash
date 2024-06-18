FROM node:20-alpine3.20

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install --omit=dev

# Copy the application
COPY . .

# Change ownership of the node_modules directory to the node user
RUN chown -R node:node ./node_modules

# Switch to the node user
USER node

# Expose the port on which the application listens
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
