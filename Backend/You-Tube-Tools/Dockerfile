# Stage 1: Build stage (Java 21 aur Maven ka upyog karein)
FROM maven:3.9.5-eclipse-temurin-21-alpine AS build
WORKDIR /app
COPY . .
RUN chmod +x ./mvnw
# Dependencies download karke compile karein
RUN ./mvnw clean package -DskipTests

# Stage 2: Runtime stage (Sirf bani hui JAR file chalayein)
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app
# Pichle stage se JAR copy karein (Check karein ki path 'target/*.jar' sahi hai)
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]