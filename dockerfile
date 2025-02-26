FROM node:22-alpine AS web-app-builder
WORKDIR /app
COPY service/routes.ts ./service/routes.ts
COPY types ./types
COPY web-app ./web-app
WORKDIR /app/web-app
RUN npm install && npm run build


FROM ollama/ollama:latest AS ollama-stage
RUN cp /usr/local/bin/ollama /ollama-binary/ollama


FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY --from=web-app-builder /app/web-app/dist ./web-app/dist
COPY tsconfig.json ./tsconfig.json
COPY server.ts ./server.ts
COPY utils ./utils
COPY service ./service


COPY --from=ollama-stage /ollama-binary/ollama /usr/local/bin/ollama
RUN chmod +x /usr/local/bin/ollama


COPY start.sh ./start.sh
RUN chmod +x ./start.sh

EXPOSE 8080 11434
CMD [ "./start.sh" ]