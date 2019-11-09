#!/bin/bash

PROJ_DIR='/home/mike/interdaptdocker/interdapt/'

echo ">>> cd'ing to $PROJ_DIR"
cd "$PROJ_DIR"

echo ">>> Pulling latest code"
git pull

echo ">>> Building Docker image"
docker build . -t interdapt
if [ $? -ne 0 ]; then
  echo "Failed to build Docker image. Ending pipeline..."
  exit 1
fi

echo ">>> Killing existing Docker containers"
docker kill $(docker ps -qf "ancestor=interdapt")

echo ">>> Starting Docker container"
docker run -dp 5555:80 interdapt

exit $?
