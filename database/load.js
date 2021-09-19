const Queue = require("../models/queue.js");
const { titleMsg, err } = require("../msgs");
const player = require("../player");

const execute = async (msg, args, servers) => {
  const server = servers[msg.guild.id];
  if (!args[0]) {
    err(
      msg,
      "give a playlist name to load\nUse -db find to find all the playlists\nUse -db help for more information\n"
    );
    return;
  }

  try {
    const resp = await Queue.findOne({ name: args[0] });
    if (resp === null) {
      err(
        msg,
        `The playlist ${args[0]} does not exist\nUse -db help for more information\n`
      );
    } else {
      server.db = resp;
      server.queue = resp.urls.slice();
      server.title = resp.titles.slice();
      server.index = 0;
      titleMsg(
        msg,
        `${resp.name} laoded successfully`,
        `name: ${resp.name} owner: ${resp.owner} access: ${resp.access}`
      );
      if (!msg.guild?.voice?.connection) {
        const connection = await msg.member.voice.channel.join();
        player(connection, msg, server);
      } else {
        const connection = msg.guild.voice.connection;
        player(connection, msg, server);
      }
      //   console.log(server);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "load", execute };
