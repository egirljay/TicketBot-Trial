const { SlashCommandBuilder } = require("discord.js");
const { taurt } = require("../../structures/funcs/tickets/shorthandFunctions");

module.exports = {
    data: new SlashCommandBuilder()
    .setName(`add`)
    .setDescription(`Add a user to this ticket.`)
    .setDMPermission(false)
    .addUserOption(option => option.setName(`user`).setDescription(`The user to add to this ticket.`).setRequired(true)),

    cooldown: "5s",

    async execute(interaction, client) {
        return taurt(interaction.options.getUser("user"), interaction, client);
    }
}