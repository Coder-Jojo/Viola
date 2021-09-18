const Queue = require("../models/queue.js");
const { MessageEmbed } = require("discord.js");

const execute = async (msg, args, servers) => {
  const query = {};

  if (!args[0]) {
  } else if (args[0] === "-mine") {
    query.owner = msg.author.username;
  } else {
    query.name = args[0];
  }

  try {
    const playlists = await Queue.find(query);
    const embed = new MessageEmbed().setTitle("Playlists:");
    if (playlists.length) {
      const results = playlists.map((a, i) => {
        return {
          name: `${i + 1}.   ${a.name}`,
          value: `Name: ${a.name}, Size: ${a.size}, Owner: ${a.owner}, Access: ${a.access}`,
        };
      });
      embed.addFields(results);
      const server = servers[msg.guild.id];
      server.dbResults = playlists.map((a) => a);
    } else {
      embed.setDescription("No playlist available in the database.");
    }
    msg.channel.send(embed);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "find", execute };
