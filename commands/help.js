const { MessageEmbed } = require("discord.js");

const execute = (msg, args, servers) => {
  const embed = new MessageEmbed()
    .setTitle("Bot commands")
    .addField("-help", "See the list of all the bot commands")
    .addField(
      "-play <keywords>",
      "Add the first result of the youtube for the given keywords in the queue."
    )
    .addField("-queue", "View the queue")
    .addField("-next", "Play next track in the queue")
    .addField("-back", "Play previous track int the queue")
    .addField("-loop", "Loop the queue. use this again to unloop the queue")
    .addField("-jump <index>", "Jump to a particular track on the queue")
    .addField("-remove <index>", "Remove a particular track from the queue")
    .addField(
      "-search <keywords>",
      "View the first 10 results for the given keywords"
    )
    .addField(
      "-add <index>(between 1 to 10 inclusive)",
      "Add a result from the search"
    )
    .addField("-db", "Access the database. Use '-db help' for more information")
    .addField("-leave", "Remove bot from the voice channel");

  msg.channel.send(embed);
};

module.exports = { name: "help", execute };
