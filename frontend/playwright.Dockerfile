FROM mcr.microsoft.com/playwright:v1.44.1-jammy

ENV FRONT_URL=http://frontend:4200

# Create a working directory for the application and move into it
WORKDIR /home/node/app

# Install the application dependencies
RUN npm i -D @playwright/test playwright && npx playwright install

# Copy the application
COPY . .

# Expose the port on which the application listens
EXPOSE 9323

# Start the test
CMD ["npx", "playwright", "test"]
