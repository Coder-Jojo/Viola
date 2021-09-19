const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  let result = [];
  const server = servers[msg.guild.id];
  const looping = server.loop ? "Looping..." : "Not in loop";
  if (server.index < server.queue.length) {
    result.push({
      name: `${server.index + 1}     NOW PLAYING...`,
      value: server.title[server.index],
    });
  }
  let i;
  for (i = 1; i < 10; i++) {
    let none = true;
    if (server.index - i >= 0) {
      none = false;
      result.push({
        name: server.index + 1 - i,
        value: server.title[server.index - i],
      });
    }
    if (server.index + i < server.queue.length) {
      none = false;
      result.push({
        name: server.index + 1 + i,
        value: server.title[server.index + i],
      });
    }
    if (none) {
      break;
    }
    if (result.length >= 10) break;
  }

  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle(`Queue (${looping})`);

  !result.length
    ? exampleEmbed.setDescription("No song in the queue")
    : exampleEmbed.addFields(
        result.sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name);
        })
      );

  msg.channel.send(exampleEmbed);
};

module.exports = { name: "queue", execute };
