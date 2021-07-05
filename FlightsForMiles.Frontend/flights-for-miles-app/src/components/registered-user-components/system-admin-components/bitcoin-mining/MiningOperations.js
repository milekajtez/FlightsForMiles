import React from "react";
import { useState } from "react";
import BlockchainView from "./BlockchainView";

function MiningOperations() {
  const [blockchain, setBlockchain] = useState(false);

  const deleteBlockchain = () => {
    if (window.confirm("Are you sure you want to delete blockchain?")) {
      // brisanje blockchain-a
    } else {
      // ne brise se
    }
  };

  const createDefaultBlock = () => {
      // poziva se metoda koja ce kreirati defaault-ni block tj samim tim i blockchain
      // hash i sve ostalo ce imati defaultne vrednosti
  }


  return (
    <div>
      <h2 style={{ color: "white", marginTop: "8px" }}>OPERATIONS</h2>
      <div style={{ margin: "8px 0" }}>
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => createDefaultBlock()}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            CREATE DEFAULT BLOCKCHAIN
          </button>
        </span>
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => deleteBlockchain()}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            DELETE BLOCKCHAIN
          </button>
        </span>
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => setBlockchain(true)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            VIEW BLOCKCHAIN (LIST OF BLOCKS)
          </button>
        </span>
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => setBlockchain(false)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            CLEAR BLOCKCHAIN VIEW
          </button>
        </span>
      </div>
      {blockchain ? <BlockchainView /> : null}
    </div>
  );
}

export default MiningOperations;
