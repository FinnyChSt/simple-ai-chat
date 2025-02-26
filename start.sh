#!/bin/sh
echo "Waiting for Ollama service to be ready..."
until curl -s ${OLLAMA_HOST:-http://ollama:11434}/api/tags > /dev/null 2>&1; do
  echo "Ollama not ready yet, waiting..."
  sleep 2
done
echo "Ollama is ready!"

# Start the application
echo "Starting application server..."
node --import=tsx server.ts