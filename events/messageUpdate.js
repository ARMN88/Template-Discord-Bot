const { Events, EmbedBuilder } = require('discord.js');

const config = require("../config.json");

module.exports = {
  name: Events.MessageUpdate,
  async execute(oldMessage, newMessage) {
    if (newMessage.author.bot || oldMessage.channel.id === config.channels.woke) return;


    const messageEmbed = new EmbedBuilder()
      .setTitle("Edited Message in " + newMessage.channel.name)
      .setColor(0xffac30)
      .setURL(newMessage.url)
      .setAuthor({ name: newMessage.author.tag, iconURL: newMessage.author.avatarURL() })
      .addFields(
        { name: "Original Message", value: oldMessage.content || 'None' },
        { name: "New Message", value: newMessage.content || 'None' },
      )
      .setTimestamp();

    const channel = newMessage.guild.channels.cache.get(config.channels.audit_logs);
    channel.send({ embeds: [messageEmbed] });
  },
};