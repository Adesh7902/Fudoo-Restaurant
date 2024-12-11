import foodModel from "../models/food.model.js";
import fs from "fs";

// Add Food Item
const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;
  const { filename: image } = req.file;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image,
  });

  try {
    await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error adding food",
      error: error.message,
    });
  }
};

// All Food List
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.status(201).json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error getting food list",
      error: error.message,
    });
  }
};

// Remove Food Item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    }
    // Deleting the image from uploads folder
    await fs.promises.unlink(`uploads/${food.image}`, () => {});
    
    // Deleting all data from the database
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting food item" });
  }
};

export { addFood, listFood, removeFood };
