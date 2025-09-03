# 🧰 Job Applications Tracker – API (Spring Boot)

Backend service for the Job Applications Tracker.  
Built with **Spring Boot 3.4.x**, **Java 21 (LTS)**, **Maven**.

> Uses virtual threads (Project Loom) for better I/O concurrency.

---

## 🚀 Quick start

From this `/api` folder:

```bash
# run in dev mode
mvn spring-boot:run

# build jar
mvn clean package

# run jar
java -jar target/job-app-tracker-api-*.jar
```

Swagger UI (when running):  
`http://localhost:8080/swagger-ui/index.html`

Actuator health:  
`http://localhost:8080/actuator/health`

---

## ⚙️ Requirements

- **Java 21** (Temurin/Zulu/Oracle)
- **Maven 3.9+**
- Database (PostgreSQL) available if you enable persistence later
- Optional: Docker for local DB (provided in repo `/db`)

---

## 🗂️ Project structure (WIP)

```
api/
├─ src/main/java/com/mikediazpro/jat
│  ├─ controller/     # REST endpoints
│  ├─ service/        # application services / orchestration
│  ├─ provider/       # AI providers (OpenAI, future: Google, etc.)
│  ├─ model/          # DTOs (request/response)
│  ├─ entity/         # JPA entities (future)
│  ├─ repository/     # Spring Data repositories (future)
│  └─ JobAppTrackerApiApplication.java
├─ src/main/resources/
│  └─ application.yml
└─ pom.xml
```

---

## 📦 Dependencies (current)

These are the dependencies currently included in `pom.xml`:

- `spring-boot-starter-web` → Core REST (controllers, JSON, etc.)
- `spring-boot-starter-validation` → Request/DTO validation (`jakarta.validation`)
- `spring-boot-starter-actuator` → Health, metrics, monitoring
- `springdoc-openapi-starter-webmvc-ui` → Swagger UI + OpenAPI docs
- `spring-boot-starter-webflux` → Reactive stack + `WebClient` (used for external API calls, e.g., OpenAI)
- `spring-boot-starter-data-jpa` → JPA / Hibernate ORM support
- `org.postgresql:postgresql` → PostgreSQL JDBC driver
- `io.github.resilience4j:resilience4j-spring-boot3` → Resilience patterns (retries, circuit breakers, timeouts)
- `org.projectlombok:lombok` → Reduce boilerplate (getters/setters/builders)
- `spring-boot-starter-test` → Unit and integration testing

---


## 🔑 Configuration & Secrets

All sensitive configuration (API keys, DB credentials) **must not** be committed.

- Use `application.yml` locally (ignored in Git).
- Keep an `application_example.yml` in the repo with only placeholders, so contributors know what keys/vars are needed.

### Example: `application_example.yml`
```yaml
 
 server:
   port: 8080

 spring:
   datasource:
     url: jdbc:postgresql://localhost:5434/job_tracker
     username: jat
     password: secret
     driver-class-name: org.postgresql.Driver
   jpa:
     hibernate:
       ddl-auto: none
     properties:
       hibernate.dialect: org.hibernate.dialect.PostgreSQLDialect
   threads:
     virtual:
       enabled: true

 logging:
   level:
     root: info

## 🔧 Configuration


```

Environment variables you may use later:

```
OPENAI_API_KEY=...
AI_PROVIDER=openai   # future: google, etc.
DATABASE_URL=...
```

---

## 🧪 First endpoints (plan)

- `GET /health` → simple JSON `{status:"ok"}`

> Rationale: fast POST (no blocking), client polls or subscribes (SSE/WebSocket in a later step).

---

## 🔌 Local DB (optional, from monorepo)

Use the root `/compose.yml` or `/db` scripts to spin up PostgreSQL.  
Ensure the API connects via env vars (do **not** hardcode credentials).

---

## 📝 Coding guidelines

- Use **DTOs + Bean Validation** (`jakarta.validation`) for requests.
- Prefer **WebClient** or **HttpClient** with timeouts over manual sleeps.
- Log via `slf4j` (no `System.out.println`).
- Keep providers behind `provider/` with a clear `AiProvider` interface to swap vendors.

---

## 📄 License

MIT
