const yts = require("yt-search");
const ytdl = require("ytdl-core");

const execute = async (msg, args, servers) => {
  if (!args[0]) {
    // const server = servers[msg.guild.id];
    // if (server) {
    //   server.dispatcher.resume();
    //   server.dispatcher.resume();
    //   console.log("msasttt");
    // } else
    msg.channel.send("you need to provide a song!\nexample: -play arcade");
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
    msg.channel.send(`Playing ${server.title[server.index]}`);

    server.dispatcher.on("finish", () => {
      if (server.loop) server.index = (server.index + 1) % server.queue.length;
      else server.index++;
      if (server.queue[server.index]) {
        play(connection, message);
      } else {
        connection.disconnect();
        msg.channel.send("queue finishedd byeeee!!!");
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
    msg.channel.send(`${resp.all[0].title} added to queue`);
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
