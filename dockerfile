FROM denoland/deno:2.8.1

# Create app directory
RUN mkdir -p /app/
WORKDIR /app/

# Install app dependencies
COPY deno.json deno.lock* vite.config.ts index.html /app/
COPY src /app/src
RUN deno cache vite.config.ts

# Bundle app source
COPY . /app/

# Build and optimize react app
RUN deno task build
EXPOSE 5000

# Run server
CMD ["deno", "task", "preview", "--port", "5000"]
