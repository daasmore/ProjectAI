# ══════════════════════════════════════════════════════════════
# Nginx Reverse Proxy — Wedding Invitation SaaS
# ══════════════════════════════════════════════════════════════
FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create log directory
RUN mkdir -p /var/log/nginx

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
