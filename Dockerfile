# Sử dụng Node.js 16 làm hình ảnh cơ bản
FROM node:16-buster

# Cài đặt Nginx
RUN apt-get update && apt-get install -y nginx \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy cấu hình Nginx và file ứng dụng
COPY . /app
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html

# Khởi động Nginx khi container chạy
CMD ["nginx", "-g", "daemon off;"]
