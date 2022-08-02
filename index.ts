import DiscordJS, { Intents } from "discord.js";
import WOKCommands from "wokcommands";
import path from "path";
import dotenv from "dotenv";
//configs dotenv
dotenv.config();

//allows client to know Intents
const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", async () => {
  console.log("The bot is ready");

  //WOKcommands setup
  new WOKCommands(client, {
    commandDir: path.join(__dirname, "commands"),
    featureDir: path.join(__dirname, "features"),
    typeScript: true,
    testServers: "570299223682056242",
    botOwners: "443438585186746398",
    mongoUri: process.env.MONGO_URI,
  });
});

client.login(process.env.TOKEN);
