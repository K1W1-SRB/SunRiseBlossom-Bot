import { time } from "@discordjs/builders";
import { ICommand } from "wokcommands";
import pointsSchema from "../models/points-schema";

export default {
  category: "economy",
  description: "gives daily bonus",

  slash: "both",

  callback: async ({ member }) => {
    const time = 1440;
    const expires = new Date();
    const currentdate = new Date();
    expires.setMinutes(expires.getMinutes() + time);

    if (expires > currentdate) {
      return "Please wait 24hours";
    } else {
      await pointsSchema.findOneAndUpdate(
        {
          _id: member.id,
        },
        {
          $inc: {
            petals: 100,
          },
          daily: expires,
        }
      );

      return "daily received ";
    }
  },
} as ICommand;
