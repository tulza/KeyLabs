FROM oven/bun:latest

WORKDIR /app

# Copy everything needed to build
COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

CMD ["bun", "start"]