const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");

const player = (connection, msg, server) => {
  if (!server.queue[server.index]) return;

  server.dispatcher = connection.play(ytdl(server.queue[server.index]));
  const embed = new MessageEmbed().addField(
    "Playing...",
    server.title[server.index]
  );
  msg.channel.send(embed);

  server.dispatcher.on("finish", () => {
    if (server.loop) server.index = (server.index + 1) % server.queue.length;
    else server.index++;
    if (server.queue[server.index]) {
      player(connection, msg, server);
    } else {
      servers[msg.guild.id] = {
        queue: [],
        index: 0,
        title: [],
        loop: false,
        pause: false,
      };
      connection.disconnect();
      const embed = new MessageEmbed().setDescription(
        "queue finishedd byeeee!!!"
      );
      msg.channel.send(embed);
    }
  });

  server.dispatcher.on("error", (e) => {
    console.log(e);
  });
};

module.exports = player;
