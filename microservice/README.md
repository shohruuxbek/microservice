# Microservices - 3 ta Backend

Ushbu loyiha 3 ta mustaqil backend microservice'lardan iborat:

## 📁 Loyiha Tuzilishi

```
microservice/
├── backend1/          # PostgreSQL bilan NestJS
├── backend2/          # MongoDB bilan NestJS
└── backend3/          # JavaScript (In-Memory) bilan NestJS
```

---

## 🚀 Backend 1 - PostgreSQL

**Texnologiyalar:** NestJS + TypeORM + PostgreSQL

### O'rnatish:
```bash
cd backend1
npm install
```

### Konfiguratsiya:
`.env` faylini yarating va ma'lumotlarni kiriting:
```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=microservice_db
DB_USER=postgres
DB_PASSWORD=your_password
```

### Ishga tushirish:
```bash
npm run start        # Production
npm run start:dev    # Development (nodemon bilan)
```

### API Endpoints:
- `GET /health` - Health check
- `GET /users` - Barcha userlarni olish
- `GET /users/:id` - User ID bo'yicha olish
- `POST /users` - Yangi user yaratish
- `PUT /users/:id` - User ma'lumotlarini yangilash
- `DELETE /users/:id` - User o'chirish

---

## 🚀 Backend 2 - MongoDB

**Texnologiyalar:** NestJS + Mongoose + MongoDB

### O'rnatish:
```bash
cd backend2
npm install
```

### Konfiguratsiya:
`.env` faylini yarating:
```env
PORT=3002
MONGODB_URI=mongodb://localhost:27017/microservice_db
```

### Ishga tushirish:
```bash
npm run start        # Production
npm run start:dev    # Development (nodemon bilan)
```

### API Endpoints:
- `GET /users` - Barcha userlarni olish
- `GET /users/:id` - User ID bo'yicha olish
- `POST /users` - Yangi user yaratish
- `PUT /users/:id` - User ma'lumotlarini yangilash
- `DELETE /users/:id` - User o'chirish

---

## 🚀 Backend 3 - JavaScript (In-Memory)

**Texnologiyalar:** NestJS + In-Memory Storage

### O'rnatish:
```bash
cd backend3
npm install
```

### Konfiguratsiya:
`.env` faylini yarating:
```env
PORT=3003
```

### Ishga tushirish:
```bash
npm run start        # Production
npm run start:dev    # Development (nodemon bilan)
```

### API Endpoints:
- `GET /users` - Barcha userlarni olish
- `GET /users/:id` - User ID bo'yicha olish
- `POST /users` - Yangi user yaratish
- `PUT /users/:id` - User ma'lumotlarini yangilash
- `DELETE /users/:id` - User o'chirish

---

## 📝 Test Qilish

### cURL misollari:

**User yaratish:**
```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","age":25}'
```

**Barcha userlarni olish:**
```bash
curl http://localhost:3001/users
```

**User ID bo'yicha olish:**
```bash
curl http://localhost:3001/users/1
```

**User ma'lumotlarini yangilash:**
```bash
curl -X PUT http://localhost:3001/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","age":26}'
```

**User o'chirish:**
```bash
curl -X DELETE http://localhost:3001/users/1
```

---

## 🔧 Portlar

- **Backend 1 (PostgreSQL):** 3001
- **Backend 2 (MongoDB):** 3002
- **Backend 3 (JavaScript):** 3003

---

## 📦 Dependencies

Har bir backend quyidagi asosiy paketlarni o'z ichiga oladi:
- `@nestjs/core` - NestJS framework
- `@nestjs/common` - Common decorators va utilities
- `@nestjs/platform-express` - HTTP adapter
- `class-validator` - DTO validation
- `class-transformer` - Object transformation
- `@nestjs/config` - Configuration management

Qo'shimcha:
- **Backend 1:** `typeorm`, `pg`, `@nestjs/typeorm`
- **Backend 2:** `mongoose`, `@nestjs/mongoose`

---

## 💡 Foydalanish

1. Har bir backend mustaqil ravishda ishlaydi
2. Barcha backend'lar bir xil API endpoints'larga ega
3. Faqat ma'lumotlar bazasi farq qiladi
4. Development uchun `npm run start:dev` buyrug'idan foydalaning

---

## 🎯 Xulosa

Ushbu microservice arxitekturasi sizga:
- Turli ma'lumotlar bazalari bilan ishlash imkonini beradi
- Har bir backend mustaqil ravishda masshtablanadi
- Oson test qilinadi va rivojlantiriladi
- Production-ready kod strukturasini taqdim etadi
