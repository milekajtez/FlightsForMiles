import blockchainService from "../../../services/BlockchainService";
import { LOADING_BLOCKCHAIN } from "./bitcoinMiningTypes";

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

export const miningTransaction = (validateTransactionObj) => () =>
  new Promise(function (resolve, reject) {
    blockchainService
      .miningTransaction(validateTransactionObj)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });