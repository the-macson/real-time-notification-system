# Real time notification system

## Description
This project is a real time notification system that allows users to send notifications to other users in real time. The system is built using node js, express js, websockets, RabbitMQ, and MongoDB.

## Technologies
- Node js
- Express js
- Websockets
- RabbitMQ
- MongoDB

## Installation Method
1. [Local Installation](#local-installation)
2. [Docker Installation](#docker-installation)

## Local Installation
### Prerequisites
- Node js
- MongoDB
- RabbitMQ

### Steps
1. Clone the repository
```bash
git clone https://github.com/the-macson/real-time-notification-system.git
```
2. Move into the project directory
```bash
cd real-time-notification-system
```
3. Install dependencies
```bash
npm install
```
4. Create a .env file in the root directory and take the reference from the .env.example file

5. Start the server
```bash
npm start
```

6. Start the notification service
```bash
node src/service/real-time.js
```

## Docker Installation
### Prerequisites
- Docker
- Docker Compose

### Steps
1. Clone the repository
```bash
git clone https://github.com/the-macson/real-time-notification-system.git
```
2. Move into the project directory
```bash
cd real-time-notification-system
```
3. Run the docker-compose file
```bash
docker-compose up -d
```

## Usage
1. Open the browser and go to ```http://localhost:3000/api-docs```

2. Open the postman and create a new user using the endpoint POST ```/api/register```

3. Login using the endpoint POST ```/api/login```

4. Copy the ```token``` and paste it in the bearer token in the postman

5. Create a new notification using the endpoint POST ```/api/notification```

6. Open websocket client and connect to ```localhost:4000/```

## Screenshots
