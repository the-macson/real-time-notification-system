const Notification = require("../models/notification.model");
const amqp = require("amqplib");

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

const createNotification = async (req, res) => {
  const { message } = req.body;
  const userId = req.authInfo.userId;
  if(!message) {
    return res.status(400).send({ error: "Message is required" });
  }
  try {
    const notification = new Notification({ userId, message });
    await notification.save();
    channel.sendToQueue(
      "notifications",
      Buffer.from(JSON.stringify({ message, userId }))
    );
    res.status(201).send({ message: "Notification sent successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getNotifications = async (req, res) => {
  const userId = req.authInfo.userId;
  try {
    const notifications = await Notification.find({ userId });
    res.send(notifications);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).send({ error: "Notification not found" });
    }
    res.send(notification);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const updateNotification = async (req, res) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).send({ error: "Notification ID is required"});
  }
  try {
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).send({ error: "Notification not found" });
    }
    res.send(notification);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
  getNotification,
  updateNotification,
};
