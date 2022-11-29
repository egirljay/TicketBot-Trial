const { EmbedBuilder, ChatInputCommandInteraction, PermissionFlagsBits, GuildMember, Client } = require("discord.js");

/**
 * 
 * @param {GuildMember} user 
 * @param {ChatInputCommandInteraction} interaction 
 * @param {Client} client 
 */
async function toggleAddRemoveUserTicket(user, interaction, client) {
    if (!interaction.channel.name.startsWith(`ticket-`)) return interaction.reply({ content: `This is not a ticket channel.`, ephemeral: true });

    let embed = new EmbedBuilder()
    .setColor(client.config.color)

    if (interaction.channel.permissionsFor(user).has(PermissionFlagsBits.ViewChannel)) {
        await interaction.channel.permissionOverwrites.edit(user, {
            ViewChannel: false, 
            ReadMessageHistory: false
        });

        embed.setDescription(`🚪 ${user}`);
    } else {
        interaction.channel.permissionOverwrites.edit(user, {
            ViewChannel: true, 
            SendMessages: true, 
            ReadMessageHistory: true, 
            AttachFiles: true,
            AddReactions: true,
            EmbedLinks: true,

            CreatePublicThreads: false,
            CreatePrivateThreads: false
        });

        embed.setDescription(`👋 ${user}`);
    }

    await interaction.reply({ embeds: [embed] });
}

module.exports = { toggleAddRemoveUserTicket };