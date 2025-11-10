# Stage 1: build vite app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve bằng nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
# Copy build output
COPY --from=build /app/dist ./
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy env script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]