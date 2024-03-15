const Notification = require("../models/notification");

exports.pushNotification = async (req, res) => {
  const { title, message, owner_id, product_id } = req.body;
  try {
    const notiDoc = await Notification.create({
      title,
      message,
      owner_id,
      product_id,
    });
    if (!notiDoc) {
      throw new Error("Notification wasn't pushed.");
    }
    return res.status(200).json({
      success: true,
      message: "Notification was sent.",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getUnreadNotiCount = async (req, res) => {
  try {
    const notiDocs = await Notification.find({
      isRead: false,
    }).countDocuments();
    if (!notiDocs) {
      throw new Error("There isn't no new notification.");
    }
    return res.status(200).json({
      success: true,
      message: "Notification count",
      data: notiDocs,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllNotifications = async (req, res) => {
  const id = req.userId;
  try {
    const notiDocs = await Notification.find({ owner_id: id }).sort({ createdAt: -1 });
    if (!notiDocs) {
      throw new Error("There isn't no new notification.");
    }
    return res.status(200).json({
      success: true,
      message: "New notification alert.",
      data: notiDocs,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.notiReadUpdate = async (req, res) => {
  const { id } = req.params;
  try {
    const notiDoc = await Notification.findById(id);
    if (!notiDoc) {
      throw new Error("Notification not found.");
    }
    notiDoc.isRead = true;
    await notiDoc.save();
    return res.status(200).json({
      success: true,
      message: "Notification read",
      data: notiDoc,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteNotiById = async (req, res) => {
  const { id } = req.params;
  try {
    const notiDoc = await Notification.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Notification deleted",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

exports.deleteAllNoti = async (req, res) => {
  try {
    const notiDoc = await Notification.deleteMany({ owner_id: req.userId });
    return res.status(200).json({
      success: true,
      message: "All notifications deleted",
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}