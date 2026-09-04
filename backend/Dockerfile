FROM node:18-alpine
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --production || true

# copy rest
COPY . .

# generate prisma client (if present)
RUN npx prisma generate || true

ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/index.js"]
