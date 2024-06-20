FROM node:20-alpine3.20 AS build

# Global dependencies
RUN npm install -g @angular/cli

# Switch to the node user
USER node

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Copy the package.json and package-lock.json files
COPY --chown=node:node package*.json ./

# Install the application dependencies
RUN npm install

# Copy the application
COPY --chown=node:node . .

RUN npm run build


FROM nginx:1.27.0-alpine-slim

# Expose the port on which the application listens
EXPOSE 80
ENV BACK_URL=http://backend:9428
HEALTHCHECK --interval=10s --timeout=30s --start-period=10s --retries=5 CMD curl -f "http://localhost" || exit 1

RUN apk add --no-cache --update curl
COPY nginx-default.conf.template /etc/nginx/templates/default.conf.template
COPY --chown=nginx:nginx --from=build /home/node/app/dist/front-end /usr/share/nginx/html



