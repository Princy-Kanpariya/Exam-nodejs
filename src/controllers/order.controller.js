const { orderService, emailService } = require("../services");

// create order
const createOrder = async (req, res) => {
  try {
    const reqBody = req.body;

    const order = await orderService.createOrder(reqBody);
    if (!order) {
      throw new Error("Something went wrong, please try again or later!");
    }

    res.status(200).json({
      success: true,
      message: "Order create successfully!",
      data: { order },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get order list
const getOrderList = async (req, res) => {
  try {
    const { search, ...options } = req.query;
    let filter = {};

    if (search) {
      filter.$or = [
        { first_name: { $regex: search, $options: "i" } },
        { last_name: { $regex: search, $options: "i" } },
      ];
    }

    const getList = await orderService.getOrderList(filter, options);

    res.status(200).json({
      success: true,
      message: "Get order list successfully!",
      data: getList,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get order details by id
const getOrderDetails = async (req, res) => {
  try {
    const getDetails = await orderService.getOrderById(req.params.orderId);
    if (!getDetails) {
      throw new Error("Order not found!");
    }

    res.status(200).json({
      success: true,
      message: "Order details get successfully!",
      data: getDetails,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// order details update by id
const updateDetails = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderExists = await orderService.getOrderById(orderId);
    if (!orderExists) {
      throw new Error("Order not found!");
    }

    await orderService.updateDetails(orderId, req.body);

    res
      .status(200)
      .json({ success: true, message: "Order details update successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const orderExists = await orderService.getOrderById(orderId);
    if (!orderExists) {
      throw new Error("Order not found!");
    }

    await orderService.deleteOrder(orderId);

    res.status(200).json({
      success: true,
      message: "Order delete successfully!",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// send mail
const sendMail = async (req, res) => {
    try {
        const reqBody = req.body;
        const sendMail = await emailService.sendMail(
            reqBody.email,
            reqBody.subject,
            reqBody.text
        );

        if (!sendMail) {
            throw new Error("Something wents wrong , please try again or later !");
        }

        res.status(200).json({
            success: true,
            message: "Email send successfully !"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
  createOrder,
  getOrderList,
  getOrderDetails,
  updateDetails,
  deleteOrder,
  sendMail,
};
