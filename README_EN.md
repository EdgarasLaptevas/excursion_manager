# 📦 Full Stack Spring Boot + MySQL + Frontend App (Docker Compose)

This project bundles a **Spring Boot backend**, **frontend app**, and **MySQL database** using Docker Compose.

---

## 📁 Project Structure

```text
project-root/
├── excursion-backend/
│   ├── src/main/resources/keys/
│   │   ├── private.pem
│   │   └── public.pem
│   ├── Dockerfile
│   └── ...
├── excursion-frontend/
│   ├── Dockerfile
│   └── ...
└── docker-compose.yml
```

---

## 🔐 Setting up PEM Keys

Spring Boot uses RSA PEM keys for JWT.

1. Create the folder:

```bash
mkdir -p excursion-backend/src/main/resources/keys
```

2. Add your keys:
- `private.pem`
- `public.pem`

3. Reference them in `application.properties`:

```properties
jwt.private-key-location=classpath:keys/private.pem
jwt.public-key-location=classpath:keys/public.pem
```

---

## ▶️ How to Run

### 1. Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Run All Services

From the root of your project:

```bash
docker-compose up --build
```

This will:

- Build and start the **backend** (Spring Boot)
- Build and start the **frontend** (e.g. Vite)
- Start the **MySQL** database

### 3. Access Services

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend (API)**: [http://localhost:3000](http://localhost:3000)
- **MySQL**: available to backend at `mysql:3306`

> Database credentials are configured in `docker-compose.yml` and passed as environment variables to the backend.

---

## 🛑 Stop Services

```bash
docker-compose down
```

To stop and remove all containers, networks, and volumes.

---

## ⚙️ MySQL Configuration

Example `docker-compose.yml` snippet:

```yaml
  db:
    image: mysql:8.0
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app_db
      MYSQL_USER: app_user
      MYSQL_PASSWORD: secret
    volumes:
      - db_data:/var/lib/mysql
```

Your backend should connect using:

```text
host: db
port: 3306
username: app_user
password: secret
database: app_db
```

---

## 🚫 Git Ignore for PEM Keys

Be sure to exclude sensitive keys from Git:

```
excursion-backend/src/main/resources/keys/
```
