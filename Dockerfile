# Build Stage
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve Stage
RUN npm install -g serve
EXPOSE 8080

# Cloud Run defaults to port 8080
CMD ["serve", "-s", "dist", "-l", "8080"]