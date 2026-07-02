# Về dự án
Đây là bản demo code để pin vào profile nên sẽ không commit toàn bộ code và những phần quan trọng sẽ bị ẩn đi. Do đó pipeline sẽ chỉ có 1 commit toàn bộ dự án.


# Coin Frontend

Frontend quản trị và theo dõi dữ liệu coin, xây dựng trên Vue 2 và Element UI. Dự án cung cấp các màn hình dashboard, danh sách coin, coin đã lưu, biểu đồ nến, copy trading, simulator, thông báo và các trang xác thực người dùng.

## Công nghệ sử dụng

- Vue 2, Vue Router, Vuex
- Vue CLI 4
- Element UI
- Tailwind CSS
- Axios
- ECharts, ApexCharts, TradingVue
- Jest, ESLint, Prettier
- Nginx/Docker để phục vụ bản build tĩnh

## Yêu cầu môi trường

- Node.js >= 8.9 theo cấu hình dự án
- Khuyến nghị dùng Node.js 14 hoặc 16 để tương thích tốt với Vue CLI 4 và các dependency hiện tại
- npm >= 3

## Cài đặt

```bash
npm install
```

## Cấu hình môi trường

Dự án dùng biến môi trường của Vue CLI. Có thể tạo hoặc chỉnh các file sau:

- `.env`: cấu hình mặc định
- `.env.development`: cấu hình khi chạy local
- `.env.staging`: cấu hình khi build staging
- `.env.example`: mẫu cấu hình

Biến quan trọng:

```env
ENV = 'development'
VUE_APP_BASE_API = 'http://localhost:3000/api/v1/'
```

`VUE_APP_BASE_API` là base URL backend API được dùng bởi Axios trong `src/utils/request.js`.

## Chạy local

```bash
npm run dev
```

Ứng dụng sẽ chạy ở:

```text
http://localhost:1234
```

Có thể đổi port bằng biến môi trường hoặc tham số npm:

```bash
npm run dev -- --port 9527
```

## Build

Build staging:

```bash
npm run build:stage
```

Build production:

```bash
npm run build:prod
```

Kết quả build nằm trong thư mục `dist/`.

## Kiểm tra chất lượng code

Chạy lint:

```bash
npm run lint
```

Tự động sửa lỗi lint nếu có thể:

```bash
npm run lint -- --fix
```

Chạy unit test:

```bash
npm run test:unit
```

Chạy kiểm tra CI:

```bash
npm run test:ci
```

## Preview bản build

```bash
npm run preview
```

Preview kèm phân tích static resource:

```bash
npm run preview -- --report
```

## Docker

Dự án có sẵn `Dockerfile` và `nginx.conf` để phục vụ nội dung trong `dist/` bằng Nginx.

Build frontend trước:

```bash
npm run build:prod
```

Build Docker image:

```bash
docker build -t coin-frontend .
```

Chạy container:

```bash
docker run -p 8080:80 coin-frontend
```

Sau đó mở:

```text
http://localhost:8080
```

## Cấu trúc thư mục chính

```text
src/
  api/              API resource và request theo từng module
  assets/           Ảnh, favicon, theme và static assets
  components/       Component dùng chung
  directive/        Custom directive
  filters/          Vue filters
  icons/            SVG icon sprite
  lang/             Cấu hình đa ngôn ngữ
  layout/           Layout chính của admin
  networking/       Cấu hình networking bổ sung
  router/           Route tĩnh và route theo module
  store/            Vuex store
  styles/           SCSS global và style Element UI
  utils/            Helper, request, auth, permission
  views/            Các màn hình nghiệp vụ
```

## Các module chính

- `dashboard`: trang tổng quan
- `coin`: danh sách và chi tiết coin
- `save_coin`: danh sách coin đã lưu
- `candle_chart`: biểu đồ nến
- `copy_trading`: sao chép giao dịch
- `simulator`: mô phỏng giao dịch
- `announcement`: thông báo từ Binance
- `login`, `register`, `profile`: xác thực và tài khoản người dùng

## Ghi chú phát triển

- Alias `@` trỏ tới thư mục `src`.
- API client dùng `axios.create` với `baseURL = process.env.VUE_APP_BASE_API`.
- Ứng dụng dùng route dạng hash mặc định. Nếu bật history mode trong `src/router/index.js`, cần cấu hình server trả về `index.html` cho các route frontend.
- `nginx.conf` hiện đã cấu hình `try_files $uri /index.html;` để hỗ trợ SPA routing.

## License

MIT
