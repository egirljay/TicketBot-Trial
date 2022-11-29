const { EmbedBuilder } = require("discord.js");
const ticketData = require("../../schema/ticketData");
const ticketStats = require("../../schema/ticketStats");

async function claimTicket(interaction) {
    let tData = await ticketData.findOne({ _id: interaction.channel.id });
    if (!tData) return interaction.reply({ content: `This channel is not a ticket.`, ephemeral: true });

    if (tData.claimedBy) return interaction.followUp({ content: `This ticket is already claimed by <@${tData.claimedBy}>.`, ephemeral: true });

    let embed = new EmbedBuilder()
    .setTitle(`Ticket Claimed`)
    .setDescription(`Your support agent will be ${interaction.member}\nThey will be with you momentarily.`)
    .setColor('Blurple')
    .setTimestamp()

    await interaction.channel.send({ embeds: [embed] });

    await tData.updateOne({ claimedBy: interaction.member.id });
    
    let tStats = await ticketStats.findOne({ _id: interaction.user.id });

    if (!tStats) {
        tStats = await new ticketStats({
            _id: interaction.user.id,
            ticketsClaimed: 1
        }).save();
    } else {
        if (tStats.ticketsClaimed) {
            await tStats.updateOne({ ticketsClaimed: tStats.ticketsClaimed + 1 });
        } else {
            await tStats.updateOne({ ticketsClaimed: 1 });
        }
    }

    return interaction.followUp({ content: `Successfully claimed this ticket.`, ephemeral: true });
}

module.exports = { claimTicket };