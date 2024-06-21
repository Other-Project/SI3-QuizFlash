FROM node:20-alpine

ENV FRONT_URL=http://frontend
ENV HEADLESS=true

# Install Chromium
RUN apk add --no-cache --update chromium ttf-freefont font-noto-emoji wqy-zenhei ffmpeg
COPY local.conf /etc/fonts/local.conf

#USER node
WORKDIR /app

# Playwright
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CI=true
RUN mkdir -p ~/.cache/ms-playwright/ffmpeg-1009 \
    && ln -s /usr/bin/ffmpeg ~/.cache/ms-playwright/ffmpeg-1009/ffmpeg-linux \
    && npm i -D @playwright/test playwright

# Copy the application
COPY --chown=node . .

# Expose the port on which the application listens
EXPOSE 9323

# Start the test
CMD ["npx", "playwright", "test"]
