import mongoose, { mongo, Schema } from "mongoose";

const reqSting = {
  type: String,
  required: true,
};

const profileSchema = new Schema({
  userId: reqSting,
  serverId: reqSting,
  petals: {
    type: Number,
    default: 0,
    required: true,
  },
});

const name = "pointsSchema";

export default mongoose.models[name] || mongoose.model(name, profileSchema);
