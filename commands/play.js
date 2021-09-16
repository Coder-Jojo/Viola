const yts = require("yt-search");
const ytdl = require("ytdl-core");

const execute = async (msg, args, servers) => {
  if (!args[0]) {
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
    };
  }

  var server = servers[msg.guild.id];

  const play = (connection, message) => {
    server.dispatcher = connection.play(ytdl(server.queue[server.index]));

    server.index++;

    server.dispatcher.on("finish", () => {
      if (server.queue[server.index]) {
        play(connection, message);
      } else {
        connection.disconnect();
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
    console.log(text, resp.all[0].url);
    server.queue.push(resp.all[0].url);
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
