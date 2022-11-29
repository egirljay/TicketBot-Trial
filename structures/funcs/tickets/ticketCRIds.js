function getTicketCategoryID(cat, client) {
    switch(cat.toLowerCase()) {
        case "support":
            return client.config.oneCategoryId;
        case "sales":
            return client.config.twoCategoryId;
        case "billing":
            return client.config.threeCategoryId;
        default:
            return client.config.oneCategoryId;
    }
}

function getTicketRoleID(cat, client) {
    switch(cat.toLowerCase()) {
        case "support":
            return client.config.oneRoleId;
        case "sales":
            return client.config.twoRoleId;
        case "billing":
            return client.config.threeRoleId;
        default:
            return client.config.oneRoleId;
    }
}

module.exports = { getTicketCategoryID, getTicketRoleID };