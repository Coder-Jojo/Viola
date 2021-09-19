const { err, titleMsg } = require("../msgs");

const execute = (msg, args, servers) => {
  const server = servers[msg.guild.id];

  if (!args[0] && isNaN(args[0])) {
    err(msg, "Provide an index number!\nexample: -jump 3\n");
    return;
  }

  const index = parseInt(args[0]);

  if (index < 1 || index > server.queue.length) {
    err(msg, "Index must be between 1 and size of the queue");
    return;
  }

  if (server.dispatcher) {
    server.index = index - 2;
    server.dispatcher.end();
    titleMsg(msg, `jumped on ${index}`, "hehehe");
  }
};

module.exports = { name: "jump", execute };
