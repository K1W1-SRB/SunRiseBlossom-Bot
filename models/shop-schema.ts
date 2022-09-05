import mongoose, { mongo, Schema } from "mongoose";

const shopSchema = new Schema({
  _id: { type: String, required: true, default: 1 },
  items: { type: Array, required: true, default: [] },
});

const name = "shopSchema";

export default mongoose.models[name] || mongoose.model(name, shopSchema);
