const { SlashCommandBuilder, ChatInputCommandInteraction, Client, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Get ticket stats of you or another user")
    .setDMPermission(false)
    .addUserOption(option => option.setName("user").setDescription("The user to get stats of").setRequired(false)),

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     * */

    async execute(interaction, client) {
        let user = interaction.options.getUser("user") || interaction.user;

        let statsEmbed = new EmbedBuilder()
        .setTitle(`Ticket Stats`)
        .setDescription(`Here are the stats for ${user}`)
        .setColor('Blurple')
        .setTimestamp()

        const statsSchema = require("../../structures/schema/ticketStats");
        let data = await statsSchema.findOne({ _id: user.id });

        if (!data) return interaction.reply({ content: `That user does not have ticket data.`, ephemeral: true });

        statsEmbed.addFields(
            { name: `Tickets Created`, value: `${data.ticketsCreated ?? `0`}`, inline: true },
            { name: `Tickets Claimed`, value: `${data.ticketsClaimed ?? `0`}`, inline: true },
            { name: `Tickets Closed`, value: `${data.ticketsClosed ?? `0`}`, inline: true },
        )

        return interaction.reply({ embeds: [statsEmbed] });
    }
}