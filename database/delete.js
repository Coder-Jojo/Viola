const { titleMsg, err } = require("../msgs");
const Queue = require("../models/queue");

const execute = async (msg, args, servers) => {
  if (!args[0]) {
    err(
      msg,
      "Provide a playlist name to be deleted!\n use -db help for more information"
    );
    return;
  }

  const server = servers[msg.guild.id];
  try {
    const resp = await Queue.findOne({ name: args[0] });
    if (resp === null) {
      err(msg, `The playlist ${args[0]} doesn't exist`);
    } else {
      if (resp.access === "private" && resp.owner !== msg.author.username) {
        err(
          msg,
          `This playlist belongs to ${resp.owner} and you do not have the access to delete it`
        );
        return;
      }

      await Queue.deleteOne({ _id: resp._id });
      titleMsg(msg, "Deleted!", `name: ${resp.name} owner: ${resp.owner}`);

      if (server.db.name == resp.name) {
        server.db = {};
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "delete", execute };
