const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { MessageEmbed } = require("discord.js");

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
  if (!message.member.voice.channel) {
    const embed = new MessageEmbed().setDescription(
      "you must be in a voice channel!!"
    );
    message.channel.send(embed);
    return;
  }
  if (!servers[message.guild.id]) {
    servers[message.guild.id] = {
      queue: [],
      index: 0,
      title: [],
      loop: false,
      pause: false,
      searchResults: [],
    };
  }

  const args = message.content.slice(pref.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === "play" || command === "p") {
    client.commands.get("play").execute(message, args, servers, false);
  } else if (command === "queue") {
    client.commands.get("queue").execute(message, servers);
  } else if (command === "skip" || command === "next") {
    client.commands.get("skip").execute(message, servers);
  } else if (command === "loop") {
    client.commands.get("loop").execute(message, servers);
  } else if (command === "leave") {
    client.commands.get("leave").execute(message, servers);
  } else if (command === "back") {
    client.commands.get("back").execute(message, servers);
  } else if (command === "remove") {
    client.commands.get("remove").execute(message, args, servers);
  } else if (command === "search" || command === "s") {
    client.commands.get("search").execute(message, args, servers);
  } else if (command === "add") {
    client.commands.get("play").execute(message, args, servers, true);
  } else {
    const embed = new MessageEmbed().setDescription(
      "Unable to recongnise the command\n\nNeed Help? Ask Jojo"
    );
    message.channel.send(embed);
  }

  // console.log(args, command);
});

client.login(process.env.TOKEN);
