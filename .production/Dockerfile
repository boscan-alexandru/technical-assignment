# Stage 1: Build
FROM node:latest AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install sharp for image optimization
RUN npm install sharp

# Copy the rest of the application code
COPY . .

# Set environment variables for build stage
ARG NODE_ENV
ARG DATABASE_URL
ARG JWT_SECRET
ARG MINIO_ENDPOINT
ARG MINIO_USE_SSL
ARG MINIO_ACCESS_KEY
ARG MINIO_SECRET_KEY
ARG MINIO_BUCKET_NAME
ARG NEXT_PUBLIC_WS_URL

# Set environment variables in build
ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV MINIO_ENDPOINT=$MINIO_ENDPOINT
ENV MINIO_USE_SSL=$MINIO_USE_SSL
ENV MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
ENV MINIO_SECRET_KEY=$MINIO_SECRET_KEY
ENV MINIO_BUCKET_NAME=$MINIO_BUCKET_NAME
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

# Generate Prisma Client
RUN npx prisma generate

RUN npx prisma migrate deploy

# Build the application
RUN npm run build

# Stage 2: Production
FROM node:latest

# Set working directory
WORKDIR /app

# Copy the build output and dependencies from the builder stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --production

# Install sharp for image optimization
RUN npm install sharp

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables for runtime stage
ENV NODE_ENV=$NODE_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV JWT_SECRET=$JWT_SECRET
ENV MINIO_ENDPOINT=$MINIO_ENDPOINT
ENV MINIO_USE_SSL=$MINIO_USE_SSL
ENV MINIO_ACCESS_KEY=$MINIO_ACCESS_KEY
ENV MINIO_SECRET_KEY=$MINIO_SECRET_KEY
ENV MINIO_BUCKET_NAME=$MINIO_BUCKET_NAME
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL

# Start the application
# CMD ["node", "server.js"] # working
CMD ["npm", "run", "start"]