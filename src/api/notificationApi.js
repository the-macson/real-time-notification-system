const express = require('express');
const notificationServices = require('../service/notifications');
const router = express.Router();

/**
 * @openapi
 * /api/notifications:
 *   post:
 *     description: Create a new notification
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       401:
 *          description: Invalid credentials
 *       500:
 *          description: Internal server error
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *           schema:
 *             type: object
 *             properties:
 *                 message:
 *                     type: string
 *                     required: true
 */
router.post('/', notificationServices.createNotification);

/**
 * @openapi
 * /api/notifications:
 *   get:
 *     description: Get all notifications
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       401:
 *          description: Invalid credentials
 *       500:
 *          description: Internal server error
 */
router.get('/', notificationServices.getNotifications);

/**
 * @openapi
 * /api/notifications/{id}:
 *   get:
 *     description: Get a notifications
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: Notification id
 *     responses:
 *       200:
 *         description: Notification sent successfully
 *       401:
 *          description: Invalid credentials
 *       500:
 *          description: Internal server error
 */
router.get('/:id', notificationServices.getNotification);

/**
 * @openapi
 * /api/notifications/{id}:
 *   put:
 *     description: Update a notifications
 *     parameters:
 *       - name: Authorization
 *         in: header
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *       - name: id
 *         in: path
 *         required: true
 *         description: Notification id
 *     responses:
 *       200:
 *         description: Notification updated successfully
 *       401:
 *          description: Invalid credentials
 *       500:
 *          description: Internal server error
 */
router.put('/:id', notificationServices.updateNotification);

module.exports = router;