const { ButtonBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    id: 'closeTicket',

    async execute(interaction, client) {
        await interaction.deferUpdate();

        let embed = new EmbedBuilder()
            .setTitle('Close Ticket')
            .setDescription('Are you sure you want to close this ticket?')
            .setColor('Blurple')
            .setTimestamp()

        let embedActionRow = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('ctYes')
                .setLabel('Yes')
                .setStyle(ButtonStyle.Success),

                new ButtonBuilder()
                .setCustomId('ctNo')
                .setLabel('No')
                .setStyle(ButtonStyle.Danger)
            )

        await interaction.followUp({ embeds: [embed], components: [embedActionRow] });
    }
}