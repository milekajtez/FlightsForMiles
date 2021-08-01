import React from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadTransactionsForValidation, miningTransaction } from "../../../../redux/system-admin/bitcoin-mining/bitcoinMiningAction";

function Transactions() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const params = useParams();
  const alert = useAlert();

  useEffect(() => {
    dispatch(loadTransactionsForValidation(params.username));
  }, [dispatch, params.username]);

  const validateAndMineTransaction = (transaction) => {
    dispatch(miningTransaction({
      transactionID: transaction.transactionID,
      amount: transaction.amount,
      sender: transaction.sender,
      reciever: transaction.receiver,
      fees: transaction.fees,
      signature: transaction.signature
    },params.username))
    .then(response => {
      if (response.status === 200) {
        alert.show("Validation and mining transaction successfully.",
        {
          type: 'success'
        });
        dispatch(loadTransactionsForValidation(params.username));
      }
    })
    .catch(error => {
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
      }
      else if(error.response.data.indexOf("(Only system admin can to minig transaction.)") !== -1) {
        alert.show("Only system admin can to minig transaction.", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Adding transaction unsuccessfully. Blockchain doesn't exsist.)") !== -1) {
        alert.show("Adding transaction unsuccessfully. Blockchain doesn't exsist.", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Mining transaction unsuccessfully. Reason: NO_BOOKING)") !== -1) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_BOOKING", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Mining transaction unsuccessfully. Reason: TRANSACTION_VALIDATION_FAILED)") !== -1) {
        alert.show("Mining transaction unsuccessfully. Reason: TRANSACTION_VALIDATION_FAILED", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Mining transaction unsuccessfully. Reason: NO_TICKET)") !== -1) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_TICKET", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Mining transaction unsuccessfully. Reason: NO_MONEY)") !== -1) {
        alert.show("Mining transaction unsuccessfully. Reason: NO_MONEY", {
          type: "error",
        });
      }
      else if(error.response.data.indexOf("(Send mail unsuccessfuly. Unknown message type.)") !== -1) {
        alert.show("Send mail unsuccessfuly. Unknown message type.", {
          type: "error",
        });
      }
      else {
        alert.show("Unknown error.", {
          type: "error",
        });
      }

      dispatch(loadTransactionsForValidation(params.username));
    })
  };

  return (
    <div>
      <h2 style={{ color: "white", marginTop: "8px" }}>
        TRANSACTIONS FOR VALIDATION
      </h2>
      <table className="items-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Recipient</th>
            <th>Signature</th>
            <th>Fees</th>
            <th>Mining operations</th>
          </tr>
        </thead>
        <tbody>
          {blockchain.transactionsForValidation.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.transactionID}</td>
                    <td>{item.amount.substring(0, 20) + " ..."} ₿</td>
                    <td>{item.sender}</td>
                    <td>{item.receiver}</td>
                    <td>{item.signature.substring(0, 20) + " ..."}</td>
                    <td>{item.fees}</td>
                    <td>
                      <button
                        className="btn btn-dark"
                        onClick={() => validateAndMineTransaction(item)}
                      >
                        <i className="fas fa-check"></i> VALIDATION + MINE
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
      <hr style={{ backgroundColor: "aqua", margin: "0px 5%" }}></hr>
    </div>
  );
}

export default Transactions;
