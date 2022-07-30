import mongoose, { mongo, Schema } from "mongoose";

const reqSting = {
    type: String,
    required: true,
}

const schema = new Schema(
    {
      userId: reqSting,
      guildId: reqSting,
      staffId: reqSting,
      reason: reqSting,
      expires: Date,
      type: {
          type: String,
          required: true,
          enum: ['ban', 'mute'],
      },
    },
    {
        timestamps: true,
    }
)

const name = 'punishments'

export default mongoose.models[name] || mongoose.model(name, schema)