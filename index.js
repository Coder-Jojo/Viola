const { Client, Intents } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
});

client.on("message", (msg) => {
  if (msg.author.bot) return;
  msg.reply(msg.content);
});

client.login(process.env.TOKEN);
