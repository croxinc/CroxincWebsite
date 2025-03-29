# # Build stage
# FROM node:18-alpine AS build-stage

# WORKDIR /app

# # Copy package files
# COPY package*.json ./

# # Install dependencies
# RUN npm ci

# # Copy project files
# COPY . .

# # Build the project
# RUN npm run build

# # Production stage
# FROM node:18-alpine AS production-stage

# WORKDIR /app

# COPY --from=build-stage /app/.output /app/.output

# # Expose port 3000
# EXPOSE 3000

# # Start the application
# CMD ["node", ".output/server/index.mjs"]

# 1. 使用 Node.js 來建置 Nuxt 3 應用
FROM node:18-alpine AS builder
WORKDIR /app

# 2. 複製專案檔案
COPY . .

# 3. 安裝相依套件並建置
RUN npm install
RUN npm run build

# 4. 使用最輕量的 Node.js 來執行
FROM node:18-alpine AS runtime
WORKDIR /app

# 5. 複製已建置的 Nuxt 3 應用
COPY --from=builder /app/.output .output
COPY --from=builder /app/public public
COPY --from=builder /app/node_modules node_modules

# 6. 設定環境變數
ENV NUXT_PORT=3000
EXPOSE 3000

# 7. 直接執行 Nuxt 3
CMD ["node", ".output/server/index.mjs"]
