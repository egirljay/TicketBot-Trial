module.exports = {
    id: 'ctNo',

    async execute(interaction, client) {
        await interaction.deferUpdate();
        await interaction.message.delete();
    }
}