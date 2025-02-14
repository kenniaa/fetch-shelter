FROM node:23-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm i

# Build
COPY pages ./pages
COPY public ./public
COPY components ./components
COPY hooks ./hooks
COPY contexts ./contexts
COPY rest ./rest
COPY lib ./lib

COPY tsconfig.json next-env.d.ts next.config.js ./
RUN npm run build

# Run
CMD HOSTNAME="0.0.0.0" npm run start
