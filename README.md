# 🌐 Spring Boot + React web aplikacija

Ši aplikacija yra moderni web sistema, sukurta naudojant **Spring Boot**(Java) ir **React**(JavaScript). Ši aplikacija yra skirta ekskursijų Lietuvoje valdymui bei pritaikyta vartotojams, kurie nori matyti ekskursijas savo mieste ir rezervuoti galimus laikus.

## 🧰 Naudotos technologijos:

### Back-end (Spring Boot):
- Java 21
- Spring Web
- Spring Data JPA
- Spring Security
- Spring Boot Starter Validation
- MySQL Driver
- OAuth2 Resource Server
- Maven

### Front-end (React):
- React 19+
- Axios
- React BrowserRouter
- Vite 7+
- Node 22+

## 🚀 Aplikacijos paleidimas:
- git clone https://github.com/EdgarasLaptevas/excursion_manager.git 
- cd excursion_manager
### paleisti front-end:
- cd excursion-frontend
- atidaryti esamą aplanką naudojant Visual Studio Code
- atsidarius projektą terminale paleisti npm install komandą
- npm run dev
### paleisti back-end:
- cd excursion-backend
- atidaryti esamą aplanką naudojant IntelliJ IDEA
- susikurti .env faila excursion-backed aplanke
- iklijuoti kintamuosius i .env faila(kintamieji reikalingi prisijungimui prie duomenu bazes per apllication properties(klausti vieno is aplikacijos kureju)
- susikurti aplnaka keys resources aplanke ir jame susikurti private.pem ir public.pem failus. juose iklijuoti public.pem ir private.pem raktus(klausti vieno is aplikacijos kureju)
- paleisti ExcursionBackendApplication klasę

