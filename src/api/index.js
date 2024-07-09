const express = require("express");
const authServices = require("../service/auth");
const notificationApi = require("./notificationApi");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

/**
 * @openapi
 * /api/register:
 *   post:
 *     description: User register endpoint
 *     responses:
 *       200:
 *         description: User registered successfully
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
 *                 username:
 *                     type: string
 *                     required: true
 *                 email:
 *                     type: string
 *                     required: true
 *                 password:
 *                     type: string
 *                     required: true
 */

router.post("/register", authServices.register);

/**
 * @openapi
 * /api/login:
 *   post:
 *     description: User login endpoint
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                 email:
 *                     type: string
 *                     required: true
 *                 password:
 *                     type: string
 *                     required: true
 */
router.post("/login", authServices.login);
router.use("/notifications", authenticate, notificationApi);

module.exports = router;
