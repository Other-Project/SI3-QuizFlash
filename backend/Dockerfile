FROM node:20-alpine3.20 as build

# Switch to the node user
USER node

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Install the application dependencies
RUN npm install --omit=dev
COPY --chown=node:node . .
RUN rm package*.json && mv database/init/* database/

FROM busybox:1.35.0-uclibc as busybox
FROM gcr.io/distroless/nodejs22-debian12

# Expose the port on which the application listens
EXPOSE 9428
ENV CLEAR_DB=""
ENV INIT_DB=""
ENV DB_FOLDER=""
HEALTHCHECK --interval=10s --timeout=30s --start-period=10s --retries=5 CMD ["/nodejs/bin/node", "healthcheck.js"]

COPY --from=busybox /bin/sh /bin/sh
WORKDIR /app
COPY --from=build /home/node/app .

# Start the application
ENTRYPOINT /nodejs/bin/node init_db.js && /nodejs/bin/node app/index.js
