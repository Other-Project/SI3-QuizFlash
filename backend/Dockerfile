FROM node:20-alpine3.20

# Healthcheck dependency
RUN apk add --no-cache --update curl

# Switch to the node user
USER node

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Install the application dependencies
RUN npm install --omit=dev

# Copy the application
COPY --chown=node:node . .

# Expose the port on which the application listens
EXPOSE 9428

HEALTHCHECK --interval=10s --timeout=30s --retries=5 CMD curl -f "http://localhost:9428/api/status" || exit 1

# Start the application
ENTRYPOINT ["npm", "run"]
CMD ["start"]
