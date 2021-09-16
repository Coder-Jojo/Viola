const execute = (msg, servers) => {
  let str = "";
  const server = servers[msg.guild.id];
  server?.title?.map((song) => {
    str += `${song}\n`;
  });
  if (str !== "") msg.channel.send(str);
  else msg.channel.send("No song in the queue");
};

module.exports = { name: "queue", execute };
