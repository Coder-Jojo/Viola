const yts = require("yt-search");
const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");
const player = require("../player");

const execute = async (msg, args, servers, add) => {
  if (!args[0]) {
    const embed = new MessageEmbed().setDescription(
      "you need to provide a song!\nexample: -play arcade"
    );
    msg.channel.send(embed);
    return;
  }
  if (add && isNaN(args[0])) {
    const embed = new MessageEmbed().setDescription(
      "you need to provide a index\nexample: -add 1"
    );
    msg.channel.send(embed);
    return;
  }
  if (add && (parseInt(args[0] > 10) || parseInt(args[0]) < 1)) {
    const embed = new MessageEmbed().setDescription(
      "The number should be between 1 to 10"
    );
    msg.channel.send(embed);
    return;
  }
  if (add && !servers[msg.guild.id]?.searchResults?.length) {
    const embed = new MessageEmbed().setDescription(
      "You have not searched anything\nUse -s <keywords>"
    );
    msg.channel.send(embed);
    return;
  }
  if (!msg.member.voice.channel) {
    msg.channel.send("you must be in a voice channel!!");
    return;
  }

  if (!servers[msg.guild.id]) {
    servers[msg.guild.id] = {
      queue: [],
      index: 0,
      title: [],
      loop: false,
      pause: false,
    };
  }

  var server = servers[msg.guild.id];

  // const play = (connection, message) => {
  //   if (!server.queue[server.index]) return;

  //   server.dispatcher = connection.play(ytdl(server.queue[server.index]));
  //   const embed = new MessageEmbed().addField(
  //     "Playing...",
  //     server.title[server.index]
  //   );
  //   msg.channel.send(embed);

  //   server.dispatcher.on("finish", () => {
  //     if (server.loop) server.index = (server.index + 1) % server.queue.length;
  //     else server.index++;
  //     if (server.queue[server.index]) {
  //       play(connection, message);
  //     } else {
  //       servers[msg.guild.id] = {
  //         queue: [],
  //         index: 0,
  //         title: [],
  //         loop: false,
  //         pause: false,
  //       };
  //       connection.disconnect();
  //       const embed = new MessageEmbed().setDescription(
  //         "queue finishedd byeeee!!!"
  //       );
  //       msg.channel.send(embed);
  //     }
  //   });

  //   server.dispatcher.on("error", (e) => {
  //     console.log(e);
  //   });
  // };

  //   const text = args[0];
  let text = "";
  args.map((arg) => (text += `${arg} `));
  // console.log(text);

  try {
    if (add) {
      const index = args[0];
      server.queue.push(servers[msg.guild.id].searchResults[index - 1].url);
      server.title.push(servers[msg.guild.id].searchResults[index - 1].title);
    } else {
      const resp = await yts(text);
      // console.log(text, resp.all[0]);
      server.queue.push(resp.all[0].url);
      server.title.push(resp.all[0].title);
    }
    const embed = new MessageEmbed().addField(
      "Added to queue",
      server.title[server.queue.length - 1]
    );
    msg.channel.send(embed);
    if (!msg.guild?.voice?.connection) {
      const connection = await msg.member.voice.channel.join();
      player(connection, msg, server);
    }

    // console.log(resp.all[0].url);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { name: "play", execute };
