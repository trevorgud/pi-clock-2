# ---------------------------------------------
# 1) Build Stage: Build the React frontend
# ---------------------------------------------
FROM node:16 AS build
# Create a working directory inside the container
WORKDIR /app
# Copy package.json and package-lock.json (if present) for the client
COPY client/package*.json ./client/
RUN cd client && npm install
# Copy the actual client source
COPY client/ ./client/
# Build React (output to client/build)
RUN cd client && npm run build

# ---------------------------------------------
# 2) Production Stage: Setup Node/Express server
# ---------------------------------------------
FROM node:16 AS production
WORKDIR /app
ENV NODE_ENV=production
# Copy package.json for the server (and lock file if it exists)
COPY server/package*.json ./server/
RUN cd server && npm install --production
# Copy server code
COPY server/ ./server/
# Copy the React build from the build stage
COPY --from=build /app/client/build ./client/build
# Expose port (optional for local usage)
EXPOSE 4000
# Run the server
CMD ["node", "server/index.js"]
