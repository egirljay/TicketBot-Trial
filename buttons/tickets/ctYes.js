const { clt } = require("../../structures/funcs/tickets/shorthandFunctions")

module.exports = {
    id: 'ctYes',

    async execute(interaction, client) {
        await clt(interaction, client);
    }
}