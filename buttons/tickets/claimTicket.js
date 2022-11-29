const { cat } = require('../../structures/funcs/tickets/shorthandFunctions');

module.exports = {
    id: 'claimTicket',
    async execute(interaction, client) {
        await interaction.deferUpdate();
        return cat(interaction);
    }
}