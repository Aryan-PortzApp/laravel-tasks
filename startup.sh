#!/bin/bash
set -e  # Exit on error

# 1. Copy nginx configuration
cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx restart

# 2. Run migrations
php artisan migrate --force

# 3. Check if assets are already built
if [ ! -d "/home/site/wwwroot/public/build" ]; then
    echo "Building frontend assets..."

    # Check if Node.js is installed
    if ! command -v node &> /dev/null; then
        # Install Node.js (consider using apt instead of nvm for speed)
        curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
        apt-get install -y nodejs
    fi

    # Build assets
    cd /home/site/wwwroot
    npm ci --production=false  # Use ci instead of install
    npm run build

    # Clear Laravel caches
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
else
    echo "Assets already built, skipping..."
fi
