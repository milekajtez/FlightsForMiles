import { miningTransaction } from "../redux/system-admin/bitcoin-mining/bitcoinMiningAction";

export const validateAndMineTransaction = (
  validateTransactionObj,
  dispatch,
  alert
) => {
  dispatch(miningTransaction(validateTransactionObj))
    .then((response) => {
      if (response.status === 200) {
        alert.show("Validation and mining transaction successfully.", {
          type: "success",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      if (
        error.response.data.indexOf("(Minig transaction unsucessfully.)") !== -1
      ) {
        alert.show("Minig transaction unsucessfully.", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf("(Server not found user.)") !== -1
      ) {
        alert.show("Server not found user.", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf(
          "(Only system admin can to minig transaction.)"
        ) !== -1
      ) {
        alert.show("Only system admin can to minig transaction.", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf(
          "(Adding transaction unsuccessfully. Blockchain doesn't exsist.)"
        ) !== -1
      ) {
        alert.show(
          "Adding transaction unsuccessfully. Blockchain doesn't exsist.",
          {
            type: "error",
          }
        );
      } else if (
        error.response.data.indexOf(
          "(Mining transaction unsuccessfully. Reason: NO_BOOKING)"
        ) !== -1
      ) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_BOOKING", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf(
          "(Mining transaction unsuccessfully. Reason: TRANSACTION_VALIDATION_FAILED)"
        ) !== -1
      ) {
        alert.show(
          "Mining transaction unsuccessfully. Reason: TRANSACTION_VALIDATION_FAILED",
          {
            type: "error",
          }
        );
      } else if (
        error.response.data.indexOf(
          "(Mining transaction unsuccessfully. Reason: NO_TICKET)"
        ) !== -1
      ) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_TICKET", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf(
          "(Mining transaction unsuccessfully. Reason: NO_MONEY)"
        ) !== -1
      ) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_MONEY", {
          type: "error",
        });
      } else if (
        error.response.data.indexOf(
          "(Send mail unsuccessfuly. Unknown message type.)"
        ) !== -1
      ) {
        alert.show("Send mail unsuccessfuly. Unknown message type.", {
          type: "error",
        });
      } else {
        alert.show("Unknown error.", {
          type: "error",
        });
      }
    });
};
