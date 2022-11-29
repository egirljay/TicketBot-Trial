const { Schema, model } = require('mongoose');

module.exports = model("ticketstats", new Schema(
        {
            _id: String, // User ID
            ticketsCreated: Number, // Number of tickets created
            ticketsClaimed: Number, // Number of tickets claimed
            ticketsClosed: Number, // Number of tickets closed

            // More stats can be added here
        }
    )
);