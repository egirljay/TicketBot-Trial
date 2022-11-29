const { Schema, model } = require('mongoose');

module.exports = model("ticketdata", new Schema(
        {
            _id: String, // Ticket ID
            guild: String, // Guild ID
            ticketCategory: String, // Ticket Category (Button pressed)
            claimedBy: String, // User ID of the person who claimed the ticket
            ticketOwner: String, // User ID of the person who created the ticket
        }
    )
);