const { ChatInputCommandInteraction, Client, ChannelType, PermissionFlagsBits, EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { ViewChannel, SendMessages, SendMessagesInThreads, CreatePublicThreads, CreatePrivateThreads, AddReactions, AttachFiles } = PermissionFlagsBits;
const ticketData = require('../../schema/ticketData');
const ticketStats = require('../../schema/ticketStats');
const { getTicketCategoryID, getTicketRoleID } = require('./ticketCRIds');

/**
 * @param {ChatInputCommandInteraction} interaction
 * @param {Client} client
 * */
async function createTicket(interaction, client) {
    let ticket = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}-${interaction.customId}`,
        type: ChannelType.GuildText,

        parent: getTicketCategoryID(interaction.customId, client),

        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone.id,
                deny: [ViewChannel]
            },
            {
                id: interaction.user.id,
                allow: [ViewChannel, SendMessages, AddReactions, AttachFiles],
                deny: [SendMessagesInThreads, CreatePublicThreads, CreatePrivateThreads]
            },
            {
                id: getTicketRoleID(interaction.customId, client),
                allow: [ViewChannel, SendMessages, AddReactions, AttachFiles],
            }
        ]
    });

    let embed = new EmbedBuilder()
    .setTitle(`Welcome to your ticket, ${interaction.user.username}`)
    .setDescription(`Please describe your issue in as much detail as possible. A staff member will be with you shortly.`)
    .setColor('Blurple')
    .setTimestamp()
    .setImage(`https://c.tenor.com/4RxcjLJcJJkAAAAC/how-can-we-help-can-we-help-you.gif`)

    let actionRow = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId(`closeTicket`)
        .setLabel(`Close Ticket`)
        .setStyle(ButtonStyle.Danger),

        new ButtonBuilder()
        .setCustomId(`claimTicket`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Primary),
    )

    await ticket.send({ embeds: [embed], components: [actionRow] }).then(async (msg) => {
        await msg.pin();
    });
    await ticket.send({ content: `<@&${getTicketRoleID(interaction.customId, client)}> | <@${interaction.user.id}>` }).then(async msg => {
        await msg.delete();
    });

    await new ticketData({
        _id: ticket.id,
        guild: interaction.guild.id,
        ticketCategory: interaction.customId,
        claimedBy: interaction.user.id,
        ticketOwner: interaction.user.id
    }).save();

    let tStats = await ticketStats.findOne({ _id: interaction.user.id });
    if (!tStats) {
        tStats = await new ticketStats({
            _id: interaction.user.id,
            ticketsCreated: 1
        }).save();
    } else {
        if (tStats.ticketsCreated) {
            await tStats.updateOne({ ticketsCreated: tStats.ticketsCreated + 1 });
        } else {
            await tStats.updateOne({ ticketsCreated: 1 });
        }
    }

    return ticket;
}

module.exports = { createTicket };