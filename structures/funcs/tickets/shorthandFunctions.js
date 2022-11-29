const { createTicket } = require("./createTicket");
const { closeTicket } = require("./closeTicket");
const { getTicketCategoryID, getTicketRoleID } = require("./ticketCRIds");
const { claimTicket } = require("./claimTicket");
const { toggleAddRemoveUserTicket } = require("./ticketUsers");

async function ct(interaction, client) {
    let data = await createTicket(interaction, client);
    return data;
}

async function clt(interaction, client) {
    let data = await closeTicket(interaction, client);
    return data;
}

async function cat(interaction, client) {
    let data = await claimTicket(interaction);
    return data;
}

async function taurt(user, interaction, client) {
    let data = await toggleAddRemoveUserTicket(user, interaction, client);
    return data;
}

function gtci(cat, client) {
    let data = getTicketCategoryID(cat, client);
    return data;
}

function gtri(cat, client) {
    let data = getTicketRoleID(cat, client);
    return data;
}

module.exports = { ct, clt, cat, taurt, gtci, gtri };