#!/bin/bash

ollama serve &

echo 'Waiting for Ollama server to start...'
sleep 5

echo 'Pulling deepseek-r1:8b model...'
ollama pull deepseek-r1:8b
echo 'Model pulled successfully'

tail -f /dev/null