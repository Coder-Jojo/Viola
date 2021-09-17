const yts = require("yt-search");
const ytdl = require("ytdl-core");
const { MessageEmbed } = require("discord.js");

const execute = async (msg, args, servers) => {
  if (!args[0]) {
    // const server = servers[msg.guild.id];
    // if (server) {
    //   server.dispatcher.resume();
    //   server.dispatcher.resume();
    //   console.log("msasttt");
    // } else
    const embed = new MessageEmbed().setDescription(
      "you need to provide a song!\nexample: -play arcade"
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

  const play = (connection, message) => {
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
        play(connection, message);
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

  //   const text = args[0];
  let text = "";
  args.map((arg) => (text += `${arg} `));
  console.log(text);

  try {
    const resp = await yts(text);
    // console.log(text, resp.all[0]);
    server.queue.push(resp.all[0].url);
    server.title.push(resp.all[0].title);
    const embed = new MessageEmbed().addField(
      "Added to queue",
      resp.all[0].title
    );
    msg.channel.send(embed);
    if (!msg.guild?.voice?.connection) {
      const connection = await msg.member.voice.channel.join();
      play(connection, msg);
    }

    console.log(resp.all[0].url);
  } catch (error) {
    console.error(error);
  }
};

module.exports = { name: "play", execute };
