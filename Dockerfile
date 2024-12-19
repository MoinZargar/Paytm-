FROM node:20.12.0-alpine3.19

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
COPY turbo.json ./

# Copy all project files
COPY . .

# Install dependencies
RUN npm install

# Generate prisma client
RUN npm run db:generate

# Build all applications
RUN npm run build

# Your apps run on these ports
EXPOSE 3000 3002 3003

CMD ["npm", "run", "dev"]