import API from "./api";

const blockchainService = {
    createDefaultBlock: (username) => {
        return API.post(`Bitcoins/CreateDefaultBlock/${username}`);
    },

    deleteBlockchain: (username) => {
        return API.delete(`Bitcoins/DeleteBlockchain/${username}`);
    },

    loadBlockchain: (username) => {
        return API.get(`Bitcoins/LoadBlockchain/${username}`);
    },

    addUserAmount: (userAmount) => {
        var body = {
            Username: userAmount.username,
            Type: userAmount.type,
            Amount: userAmount.amount 
        };
        return API.post(`Bitcoins/AddUserAmount`, body);
    },

    miningTransaction: (validateTransactionObj) => {
        var body = {
            Username: validateTransactionObj.username,
            FlightID: validateTransactionObj.flightID,
            TicketID: validateTransactionObj.ticketID,
            TransactionID: validateTransactionObj.transactionID
        };
        return API.put('Bitcoins/MiningTransaction', body);
    },
}

export default blockchainService;