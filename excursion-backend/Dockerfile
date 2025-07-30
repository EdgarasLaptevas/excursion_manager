FROM eclipse-temurin:21-jdk-alpine

WORKDIR /
COPY . .

# For Maven:

RUN ./mvnw clean package -DskipTests


EXPOSE 8080

# CMD ["java", "-jar", "target/*.jar"]
CMD ["./mvnw", "spring-boot:run"]
