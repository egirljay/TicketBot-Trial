const ticketData = require("../../schema/ticketData");
const ticketStats = require("../../schema/ticketStats");
const { EmbedBuilder } = require("discord.js");
const discordTranscripts = require('discord-html-transcripts');

async function closeTicket(interaction, client) {
    let tData = await ticketData.findOne({ _id: interaction.channel.id });
    if (!ticketData) return interaction.reply({ content: `This channel is not a ticket.`, ephemeral: true });

    await interaction.reply({ content: `Started closing this ticket. (${interaction.member})` });

    const channel = interaction.channel;
    const tscript = await discordTranscripts.createTranscript(channel);

    let transLogs = client.config.transcriptChannelId;

    let transEmbed = new EmbedBuilder()
    .setTitle(`Ticket Transcript`)
    .setDescription(`Here is the transcript for ${channel.name}`)
    .setColor('Blurple')
    .setTimestamp()

    await client.channels.cache.get(transLogs).send({ embeds: [transEmbed], files: [tscript] }).catch(() => {});

    let user = await client.users.fetch(tData.ticketOwner);
    await user.send({ embeds: [transEmbed], files: [tscript] }).catch(() => {});

    let closeEmbed = new EmbedBuilder()
    .setTitle(`Ticket Closed`)
    .setDescription(`This ticket will be deleted in 5 seconds.`)
    .setColor('Blurple')
    .setTimestamp()

    await interaction.editReply({ embeds: [closeEmbed] });
    await tData.delete();

    let tStats = await ticketStats.findOne({ _id: interaction.user.id });
    if (!tStats) {
        tStats = await new ticketStats({
            _id: interaction.user.id,
            ticketsClosed: 1
        }).save();
    } else {
        if (tStats.ticketsClosed) {
            await tStats.updateOne({ ticketsClosed: tStats.ticketsClosed + 1 });
        } else {
            await tStats.updateOne({ ticketsClosed: 1 });
        }
    }

    setTimeout(async () => {
        await channel.delete();
    }
    , 5000);

}

module.exports = { closeTicket };