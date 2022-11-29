const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`close`)
    .setDescription(`Close a ticket.`),

    async execute(interaction) {
        let embed = new EmbedBuilder()
        .setTitle(`Close Ticket`)
        .setDescription(`Are you sure you want to close this ticket?`)
        .setColor('Blurple')
        .setTimestamp()

        let row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId(`ctYes`)
            .setLabel(`Close Ticket`)
            .setStyle(ButtonStyle.Danger),

            new ButtonBuilder()
            .setCustomId(`ctNo`)
            .setLabel(`Cancel`)
            .setStyle(ButtonStyle.Primary)
        )

        await interaction.reply({ embeds: [embed], components: [row] });
    }
}