import userModel from "../models/user.model.js";
// add to cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    await userData.save();
    res
      .status(200)
      .json({ success: true, message: "Added to Cart Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error" });
  }
};

// remove item from the cart
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res
      .status(200)
      .json({ success: true, message: "Item delted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error" });
  }
};

// fetch item from the cart
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    res
      .status(200)
      .json({
        success: true,
        message: "Cart Data Fetched successfully",
        cartData,
      });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
