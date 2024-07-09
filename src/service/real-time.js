const http = require("http");
const WebSocket = require("ws");
const amqp = require("amqplib");
const dotenv = require("dotenv");
dotenv.config();

const server = http.createServer();
const wss = new WebSocket.Server({ server });

let channel;

async function connectQueue() {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
    await channel.assertQueue("notifications");
  } catch (err) {
    console.error(err);
    setTimeout(connectQueue, 5000);
  }
}

connectQueue();

wss.on("connection", async (ws) => {
  console.log("Client connected");
  channel.consume("notifications", (msg) => {
    const notification = JSON.parse(msg.content.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(notification));
      }
    });
    channel.ack(msg);
  });

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("Real-time server is running on port 4000");
});
