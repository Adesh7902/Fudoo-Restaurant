import mongoose from "mongoose";

export const dbConnect = async () => {
  const uri =
    "mongodb+srv://adeshjadhav:Adeshj123@cluster0.sw5rgan.mongodb.net/fudoo-del";
  await mongoose
    .connect(uri)
    .then(() => console.log("DB Connected"))
    .catch((err) => console.error("DB Connection Error: ", err));
};
