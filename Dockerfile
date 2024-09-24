# Stage 1: Compile and build Angular Codebase

# Use Official node image as a base image
FROM node:latest as build
# Set the working directory
WORKDIR /usr/local/app

# Add Source code to app
COPY ./ /usr/local/app
# Install all the dependencies
RUN npm install
# Generate the build of the application
RUN npm run build


# stage 2: Serve app with nginx server

# Use official nginx image as a base image
FROM nginx:latest

COPY --from=build /usr/local/app/dist/demo-ans /usr/share/nginx/html

EXPOSE 80