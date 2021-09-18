const { titleMsg, err } = require("./msgs");
const Queue = require("../models/queue");

const execute = async (msg, args, servers) => {
  const server = servers[msg.guild.id];
  if (!Object.keys(server.db).length) {
    err(
      msg,
      "No playlist has been loaded!\nuse -load <playlistName> to load the playlist\nuse -db help for more information"
    );
    return;
  }

  try {
    const resp = await Queue.findOne({ name: server.db.name });
    if (resp === null) {
      err(msg, `The playlist ${args[0]} doesn't exist`);
    } else {
      if (resp.access === "private" && resp.owner !== msg.author.username) {
        err(
          msg,
          `This playlist belongs to ${resp.owner} and you do not have the access to update it`
        );
        return;
      }
      const res = await Queue.findOneAndUpdate(
        { name: server.db.name },
        { urls: server.queue, titles: server.title, size: server.queue.length }
      );
      titleMsg(msg, "Updated!", `name: ${res.name} owner: ${res.owner}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "update", execute };
