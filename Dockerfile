# Use an official Bun runtime as a parent image
FROM oven/bun:1 as builder

# Set the working directory
WORKDIR /app

# Copy package.json and bun.lockb
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the Nuxt.js application
RUN bun run build

# Use a slim image for the final stage
FROM oven/bun:1-slim as runner

# Set the working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Start the application
CMD [ "bun", ".output/server/index.mjs" ]