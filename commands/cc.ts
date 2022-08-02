import { ICommand } from "wokcommands";

export default {
  category: "Moderation",
  description: "deletes multiple messages at once.",

  permissions: ["ADMINISTRATOR"],
  requireRoles: true,

  minArgs: 1,
  maxArgs: 1,
  expectedArgs: "[amount]",

  testOnly: true,

  callback: async ({ message, interaction, channel, args }) => {
    const amount = parseInt(args.shift()!);

    if (message) {
      await message.delete();
    }

    const { size } = await channel.bulkDelete(amount, true);

    const reply = `Deleted ${size} message(s)`;

    channel.send(reply);
  },
} as ICommand;
