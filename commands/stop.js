const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  const server = servers[msg.guild.id];
  if (msg?.guild?.voice?.connection) {
    servers[msg.guild.id] = {
      queue: [],
      index: 0,
      title: [],
      loop: false,
      pause: false,
    };
    if (server?.dispatcher) server.dispatcher.end();
  }
  if (msg?.guild?.connection) {
    msg.guild.voice.connection.disconnect();
  }
  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("Stop")
    .setDescription("All the songs have been removed from the queue");
  msg.channel.send(exampleEmbed);
  // .addField("Stop: ", "All the songs have been removed from the queue", true);
  // console.log(exampleEmbed);
  // msg.channel.send("All the songs have been removed from the queue");
};

module.exports = { name: "stop", execute };
