const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`panel`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDescription(`Creates a panel for the ticket system.`)
    .setDMPermission(false),

    developer: true,
    cooldown: "10s",

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     * */
    async execute(interaction, client) {
        let ticketEmbed = new EmbedBuilder()
        .setTitle(`Ticket System`)
        .setDescription(`Please select a department to create a ticket in.`)
        .setColor('Blurple')
        .setTimestamp()


        let actionRow = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`support`)
            .setLabel(`Support`)
            .setStyle(ButtonStyle.Primary),

            new ButtonBuilder()
            .setCustomId(`sales`)
            .setLabel(`Sales`)
            .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
            .setCustomId(`billing`)
            .setLabel(`Billing`)
            .setStyle(ButtonStyle.Success),
        )

        await interaction.channel.send({ embeds: [ticketEmbed], components: [actionRow] });
        return interaction.reply({ content: `Panel created!`, ephemeral: true });
    }
}