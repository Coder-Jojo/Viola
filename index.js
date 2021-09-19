const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const { MessageEmbed } = require("discord.js");
require("dotenv").config();
const mongoose = require("mongoose");

client.commands = new Discord.Collection();
const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const databases = new Discord.Collection();
const databaseFiles = fs
  .readdirSync("./database/")
  .filter((file) => file.endsWith(".js"));

for (const file of databaseFiles) {
  const database = require(`./database/${file}`);
  databases.set(database.name, database);
}

mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

const pref = "-";
const servers = [];
let msg;

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
      dbResults: [],
      db: {},
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
  } else if (command === "db") {
    client.commands.get("db").execute(message, args, servers, databases);
  } else if (command === "jump") {
    client.commands.get("jump").execute(message, args, servers);
  } else if (command === "help") {
    client.commands.get("help").execute(message, args, servers);
  } else {
    const embed = new MessageEmbed().setDescription(
      "Unable to recongnise the command\n\nNeed Help? Ask Jojo"
    );
    message.channel.send(embed);
    // console.log(servers[message.guild.id]);
  }
  msg = message;
  // console.log(args, command);
});

client.on("voiceStateUpdate", (oldState, newState) => {
  if (
    oldState.channelID !== oldState.guild.me.voice.channelID ||
    newState.channel
  )
    return;

  if (!oldState.channel.members.size - 1)
    setTimeout(() => {
      if (!oldState.channel.members.size - 1) {
        msg?.guild?.voice?.connection?.disconnect();
        servers[msg.guild.id] = {
          queue: [],
          index: 0,
          title: [],
          loop: false,
          pause: false,
          db: {},
        };
        oldState.channel.leave(); // leave
      }
    }, 5000); // (5 min in ms)
});

client.login(process.env.TOKEN);
