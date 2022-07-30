import mongoose, { mongo, Schema } from "mongoose";

const reqSting = {
    type: String,
    required: true,
}

const profileSchema = new Schema(
    {
      userId: reqSting,
      guildId: reqSting,
      petals: {
        type: Number,
        required: true,
      }
    },
)

const name = 'pointsSchema'

export default mongoose.models[name] || mongoose.model(name, profileSchema)