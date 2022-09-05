import mongoose, { mongo, Schema } from "mongoose";

const reqSting = {
  type: String,
  required: true,
};

const profileSchema = new Schema({
  _id: reqSting,
  serverID: reqSting,
  daily: { type: Date, required: true },
  petals: {
    type: Number,
    default: 0,
    required: true,
  },
});

const name = "pointsSchema";

export default mongoose.models[name] || mongoose.model(name, profileSchema);
