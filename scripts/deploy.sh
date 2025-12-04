#!/bin/bash

# Deployment Script for EC2
# Pulls latest Docker images from ECR and restarts the application

set -e

# Configuration (replace with your actual values)
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="your-account-id"
ECR_BACKEND_REPO="blog-backend"
ECR_FRONTEND_REPO="blog-frontend"

echo "=== Starting Deployment ==="

# Login to ECR
echo "Logging in to Amazon ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# Pull latest images
echo "Pulling latest Docker images..."
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_BACKEND_REPO:latest
docker pull $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_FRONTEND_REPO:latest

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down || true

# Start new containers
echo "Starting new containers..."
docker-compose up -d

# Show running containers
echo "Deployment complete! Running containers:"
docker ps

echo "=== Deployment Complete ==="
