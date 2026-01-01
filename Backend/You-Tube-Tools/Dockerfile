FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . .
# Yeh line permission fix kar degi
RUN chmod +x ./mvnw
RUN ./mvnw clean install -DskipTests
EXPOSE 8080
ENTRYPOINT ["java","-jar","target/*.jar"]