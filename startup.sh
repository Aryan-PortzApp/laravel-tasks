# 1. Copy nginx configuration
cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx restart

# 2. Run new DB migration files
php artisan migrate --force

#3. Build frontend assets
#3.1 Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
\. "$HOME/.nvm/nvm.sh"
nvm install 22

#3.2 Install and build Node.js dependencies
npm install
npm run build
