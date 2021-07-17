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
    }
}

export default blockchainService;