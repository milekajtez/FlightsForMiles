import React from "react";

function Transactions() {
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
            <th>Sender public key</th>
            <th>Recipient public key</th>
            <th>Signature</th>
            <th>Fees</th>
            <th>Mining oprations</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>0.0006 B</td>
            <td>pubkey11</td>
            <td>pubkey12</td>
            <td>ahgdshjasdgjasdg</td>
            <td>fees1</td>
            <td>
            <button
                className="btn btn-light"
                /*onClick={() =>
                  setChangeIsOpen({ open: true, currentDest: destination })
                }*/
              >
                <i className="fas fa-check"></i> VALIDATION
              </button>
              &nbsp;
              <button
                className="btn btn-dark"
                /*onClick={() =>
                  setChangeIsOpen({ open: true, currentDest: destination })
                }*/
              >
                <i className="far fa-plus-square"></i> MINE
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <hr style={{backgroundColor: 'aqua', margin: '0px 5%'}}></hr>
    </div>
  );
}

export default Transactions;
