FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build 
RUN npm run docs

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./
COPY --from=build /app/docs ./

EXPOSE 8080

CMD ["node", "server.js"]