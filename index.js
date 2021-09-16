const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

require("dotenv").config();

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const pref = "-";
const servers = [];

client.once("ready", () => {
  console.log("ready");
});

client.on("message", (message) => {
  if (!message.content.startsWith("-") || message.author.bot) return;

  const args = message.content.slice(pref.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "play" || command === "p") {
    client.commands.get("play").execute(message, args, servers);
  } else if (command === "queue") {
    client.commands.get("queue").execute(message, servers);
  } else if (command === "skip" || command === "next") {
    client.commands.get("skip").execute(message, servers);
  } else if (command === "stop") {
    client.commands.get("stop").execute(message, servers);
  } else if (command === "loop") {
    client.commands.get("loop").execute(message, servers);
  } else if (command === "pause") {
    client.commands.get("pause").execute(message, servers);
  }
  console.log(args, command);
});

client.login(process.env.TOKEN);
