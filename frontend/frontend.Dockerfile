FROM node:20-alpine3.20

ENV BACK_URL=http://backend:9428

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the application dependencies
RUN npm install -g @angular/cli && npm install && apk add --update curl

# Copy the application
COPY . .

# Change ownership of the node_modules directory to the node user
RUN chown -R node:node .

# Switch to the node user
USER node

# Expose the port on which the application listens
EXPOSE 4200

HEALTHCHECK --interval=10s --timeout=30s --retries=5 CMD curl -f "http://localhost:4200" || exit 1

# Start the application
CMD ["npm", "start"]
