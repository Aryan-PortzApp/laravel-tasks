cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx restart
php artisan migrate --force
