import { ICommand } from "wokcommands";
import pointsSchema from "../models/points-schema";

export default {
  category: "economy",
  description: "Checks your Balance",

  slash: "both",

  callback: async ({ member }) => {
    const res = await pointsSchema.findById(member.id);

    return `Your Balance is ${res.petals}`;
  },
} as ICommand;
