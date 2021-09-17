const yts = require("yt-search");
const { MessageEmbed } = require("discord.js");

const execute = async (msg, args, servers) => {
  const server = servers[msg.guild.id];
  if (!args[0]) {
    const embed = new MessageEmbed().setDescription(
      "you need to provide a song!\nexample: -search arcade"
    );
    msg.channel.send(embed);
    return;
  }

  let text = "";
  args.map((arg) => (text += `${arg} `));
  try {
    const resp = await yts(text);
    const result = resp.all
      .slice(0, Math.min(resp.all.length, 10))
      .map((t, i) => {
        return {
          name: i + 1,
          value: t.title,
        };
      });
    const embed = new MessageEmbed()
      .setTitle(`Search Results: ${text}`)
      .addFields(result);
    msg.channel.send(embed);
    servers[msg.guild.id].searchResults = resp.all
      .slice(0, Math.min(resp.all.length, 10))
      .map((t, i) => {
        return {
          url: t.url,
          title: t.title,
        };
      });
    // server.queue.push(resp.all[0].url);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { name: "search", execute };
