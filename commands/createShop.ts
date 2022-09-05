import { ICommand } from "wokcommands";
import shopSchema from "../models/shop-schema";

export default {
  category: "Configuration",
  description: "Sets up a balance ",

  permissions: ["ADMINISTRATOR"],

  slash: "both",
  testOnly: true,

  callback: async ({ member }) => {
    const page = 1;
    await shopSchema.create({
      _id: page,
      items: [{ itemName: "" }],
    });

    return "done";
  },
} as ICommand;
