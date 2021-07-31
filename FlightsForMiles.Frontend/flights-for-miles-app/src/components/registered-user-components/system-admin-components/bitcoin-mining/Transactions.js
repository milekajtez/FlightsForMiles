import React from "react";
import { useEffect } from "react";
import { /*useAlert*/ } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { loadTransactionsForValidation } from "../../../../redux/system-admin/bitcoin-mining/bitcoinMiningAction";

function Transactions() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const params = useParams();
  //const alert = useAlert();

  useEffect(() => {
    dispatch(loadTransactionsForValidation(params.username));
  }, [dispatch, params.username]);

  const validateAndMineTransaction = (/**verovatno cu slati sve podatke */) => {
    // validacija transakcije
    //ovde ce ici use alert da je transakcija uspesno validirana ili je obrisana jer je nevalidna
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
                        onClick={() => validateAndMineTransaction()}
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
