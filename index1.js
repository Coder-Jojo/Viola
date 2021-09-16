const { Client, Intents } = require("discord.js");
const ytdl = require("ytdl-core");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("Ready!");
});
client.once("reconnecting", () => {
  console.log("Reconnecting!");
});
client.once("disconnect", () => {
  console.log("Disconnect!");
});

client.on("message", async (msg) => {
  if (msg.author.bot) return;
  if (msg.content === "join voice") {
    try {
      const connec = await msg.member.voice.channel.join();
    } catch (error) {
      console.log(error);
    }
  } else if (msg.content.startsWith("play")) {
    const connection = await msg.member.voice.channel.join();
    const arg = msg.content.split(" ");
    console.log(arg[1]);
    const songInfo = await ytdl.getInfo(arg[1]);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };
    const hehe = () => {
      connection
        .play(ytdl(song.url))
        .on("finish", () => {
          msg.member.voice.channel.join();
          hehe();
        })
        .on("error", (error) => {
          console.error(error);
          hehe();
        });
    };
    hehe();
  }
});

client.login(process.env.TOKEN);
