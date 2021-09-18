const { MessageEmbed } = require("discord.js");

const execute = (msg, args, servers) => {
  const embed = new MessageEmbed()
    .setTitle("Database Commands")
    .addField("-db help", "shows the help box")
    .addField(
      "-db find <-mine>(optional) <playlistName>(optional)",
      "-db find: Show all the playlists in the database\n-db find -mine: Show all the playlists where you are the owner\n-db find <playlistName>: To get a particular playlist"
    )
    .addField(
      "-db load <playlistName>",
      "Use this to load a particular playlist.\nUse -db find to get name of the already existing playlists"
    )
    .addField(
      "-db save <playlistName> <private>(optional)",
      "Save the current state of the queue in the database and also load it."
    )
    .addField(
      "-db update",
      "Save the current state of the queue in the database if a playlist is already laoded or saved"
    )
    .addField(
      "-db delete <playlistName>",
      "delete the playlist.\n To delete the private playlists, you must be the owner"
    );

  msg.channel.send(embed);
};

module.exports = { name: "help", execute };
