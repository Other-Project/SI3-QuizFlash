FROM node:20-alpine3.20

ENV BACK_URL=http://backend:9428

# Healthcheck dependency
RUN apk add --update curl

# Switch to the node user
USER node

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Install the application dependencies
RUN npm config set prefix '~/.local/' && npm install -g @angular/cli && npm install

# Copy the application
COPY --chown=node:node . .

# Expose the port on which the application listens
EXPOSE 4200

HEALTHCHECK --interval=10s --timeout=30s --retries=5 CMD curl -f "http://localhost:4200" || exit 1

# Start the application
CMD ["npm", "start"]
