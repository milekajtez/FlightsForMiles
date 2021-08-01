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
        }

        return API.post(`Bitcoins/AddUserAmount`, body);
    },

    loadTransactionsForValidation: (username) => {
        return API.get(`Bitcoins/LoadTransactionsForValidation/${username}`);
    },

    miningTransaction: (transaction, username) => {
        var body = {
            TransactionID: transaction.transactionID,
            Amount: transaction.amount,
            Sender: transaction.sender,
            Reciever: transaction.reciever,
            Fees: transaction.fees,
            Signature: transaction.signature
        }
        
        return API.put(`Bitcoins/MiningTransaction/${username}`, body);
    },
}

export default blockchainService;