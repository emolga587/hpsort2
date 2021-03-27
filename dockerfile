FROM node:15.12-alpine

# Create app directory
RUN mkdir -p /app/
WORKDIR /app/

# Install app dependencies
COPY package*.json /app/
RUN npm ci

# Bundle app source
COPY . /app/

# Build and optimize react app
RUN npm run build
EXPOSE 5000

# Run server
CMD ["./node_modules/.bin/serve", "-s", "build"]