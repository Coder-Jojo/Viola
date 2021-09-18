const Queue = require("../models/queue.js");
const { MessageEmbed } = require("discord.js");
const { err } = require("./msgs");

const execute = async (msg, args, servers) => {
  if (!args[0]) {
    err(msg, "provide a name for the playlist\nuse -db help for more details");
    return;
  }

  const server = servers[msg.guild.id];

  if (!server.queue.length) {
    err(msg, "Cannot save an empty queue");
    return;
  }

  try {
    const exist = await Queue.findOne({ name: args[0] });
    if (exist !== null) {
      err(msg, "The playlist name already exists. Use a new name instead.");
    } else {
      const document = {
        name: args[0],
        size: server.queue.length,
        urls: server.queue,
        titles: server.title,
        owner: msg.author.username,
        access: "public",
      };
      if (args[1] && args[1] === "private") {
        document.access = "private";
      }
      const newPlaylist = new Queue(document);
      const resp = await newPlaylist.save();
      const embed = new MessageEmbed().addField(
        "Saved to playlist and loaded",
        `name: ${document.name}, owner: ${document.owner}, access: ${document.access}`
      );
      msg.channel.send(embed);
      server.db = resp;
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "save", execute };
