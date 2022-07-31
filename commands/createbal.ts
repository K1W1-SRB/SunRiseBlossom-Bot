import { ICommand } from "wokcommands";

const pointsSchema = require("../models/points-schema");

export default {
  category: "Configuration",
  description: "Sets up a balance ",

  slash: "both",
  testOnly: true,

  callback: ({ member, client }) => {
    let profile = await pointsSchema.create({
      userID: member.id,
      serverID: member.guild.id,
      petals: 0,
    });
    profile.save();
  },
} as ICommand;
