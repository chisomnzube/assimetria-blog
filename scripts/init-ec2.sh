#!/bin/bash

# EC2 Initialization Script for AI Blog Application
# This script sets up the EC2 instance to run the blog application

set -e

echo "=== Starting EC2 Setup ==="

# Update system
echo "Updating system packages..."
sudo yum update -y

# Install Docker
echo "Installing Docker..."
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install AWS CLI v2
echo "Installing AWS CLI..."
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
rm -rf aws awscliv2.zip

# Create application directory
echo "Creating application directory..."
mkdir -p /home/ec2-user/blog-app
cd /home/ec2-user/blog-app

# Set environment variables (replace with your actual values)
cat > .env << EOF
DATABASE_URL=your_database_url_here
OPENAI_API_KEY=your_openai_api_key_here
EOF

echo "=== EC2 Setup Complete ==="
echo "Next steps:"
echo "1. Configure AWS credentials for ECR access"
echo "2. Run deploy.sh to pull and start the application"
