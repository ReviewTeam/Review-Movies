#!/bin/bash

set -e

IMAGE_NAME="review-everything/app"
TAG="latest"

if docker images "$IMAGE_NAME" | awk '{print $2}' | grep -q "$TAG"; then
    echo "Removing previous image: $IMAGE_NAME:$TAG"
    docker image rm "$IMAGE_NAME:$TAG"
fi

mvn clean install

docker build -t "$IMAGE_NAME:$TAG" .

echo "The new image is:"
docker images "$IMAGE_NAME"

read -p "Press Enter to exit..."