const { ButtonInteraction, Client } = require("discord.js");
const { ct } = require("../../structures/funcs/tickets/shorthandFunctions");

module.exports = {
    id: "billing", // The custom id of the button
    /**
     * 
     * @param {ButtonInteraction} interaction 
     * @param {Client} client
     */
    async execute(interaction, client) {
        await interaction.reply({ content: `Creating your ticket. One moment.`, ephemeral: true });

        let ticket = await ct(interaction, client);
        return interaction.editReply({ content: `Ticket for department **${interaction.customId}** created in ${ticket}.`, ephemeral: true });
    }
};
