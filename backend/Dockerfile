FROM node:20-alpine3.20

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install --omit=dev && apk add --update curl

# Copy the application
COPY . .

# Change ownership of the node_modules directory to the node user
RUN chown -R node:node ./node_modules ./database

# Switch to the node user
USER node

# Expose the port on which the application listens
EXPOSE 9428

HEALTHCHECK --interval=10s --timeout=30s --retries=5 CMD curl -f "http://localhost:9428/api/status" || exit 1

# Start the application
CMD ["npm", "start"]

