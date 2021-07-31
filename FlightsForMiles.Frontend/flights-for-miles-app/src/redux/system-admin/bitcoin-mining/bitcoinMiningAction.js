import blockchainService from "../../../services/BlockchainService";
import { LOADING_BLOCKCHAIN, LOADING_TRANSACTION_FOR_VALIDATION } from "./bitcoinMiningTypes";

export const createDefaultBlock = (username) => () =>
  new Promise(function (resolve, reject) {
    blockchainService
      .createDefaultBlock(username)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteBlockchain = (username) => () =>
  new Promise(function (resolve, reject) {
    blockchainService
      .deleteBlockchain(username)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadBlockchainAction = (allBlocks) => {
  return {
    type: LOADING_BLOCKCHAIN,
    payload: allBlocks
  }
};
  
export const loadBlockchain = (username) => {
  return (dispatch) => {
    blockchainService
      .loadBlockchain(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadBlockchainAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const addUserAmount = (userAmount) => () =>
  new Promise(function (resolve, reject) {
    blockchainService
      .addUserAmount(userAmount)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const loadTransactionsForValidationAction = (allTransactionsForValidation) => {
  return {
    type: LOADING_TRANSACTION_FOR_VALIDATION,
    payload: allTransactionsForValidation
  }
};

export const loadTransactionsForValidation = (username) => {
  return (dispatch) => {
    blockchainService
      .loadTransactionsForValidation(username)
      .then((response) => {
        if (response.status === 200) {
          dispatch(loadTransactionsForValidationAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

