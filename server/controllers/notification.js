const Notification = require("../models/notification");

exports.pushNotification = async (req, res) => {
    const { title, message, owner_id, product_id } = req.body;
    try {
        const notiDoc = await Notification.create({
            title,
            message,
            owner_id,
            product_id
        })
        if(!notiDoc) {
            throw new Error("Notification wasn't pushed.");
        }
        return res.status(200).json({
            success: true,
            message: "Notification was sent."
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
          });
    }
}

exports.getAllNotifications = async (req, res) => {
    const id = req.userId;
    try {
        const notiDocs = await Notification.find({ owner_id: id });
        if(!notiDocs) {
            throw new Error("There isn't no new notification.");
        }
        return res.status(200).json({
            success: true,
            message: "New notification alert.",
            data: notiDocs
        })
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
          });
    }
} 