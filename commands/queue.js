const { MessageEmbed } = require("discord.js");

const execute = (msg, servers) => {
  let result = [];
  const server = servers[msg.guild.id];
  // const result = server?.title.map((t, i) => {
  //   const field = {
  //     name: i + 1,
  //     value: t,
  //   };
  //   return field;
  // });
  if (server.index < server.queue.length) {
    result.push({
      name: server.index + 1,
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
    if (result.length === 10) break;
  }

  // console.log(
  //   result.sort((a, b) => {
  //     return parseInt(a.name) - parseInt(b.name);
  //   })
  // );
  const exampleEmbed = new MessageEmbed().setColor("#0099ff").setTitle("Queue");

  !result.length
    ? exampleEmbed.setDescription("No song in the queue")
    : exampleEmbed.addFields(
        result.sort((a, b) => {
          return parseInt(a.name) - parseInt(b.name);
        })
      );

  msg.channel.send(exampleEmbed);
  // else msg.channel.send("No song in the queue");
};

module.exports = { name: "queue", execute };
