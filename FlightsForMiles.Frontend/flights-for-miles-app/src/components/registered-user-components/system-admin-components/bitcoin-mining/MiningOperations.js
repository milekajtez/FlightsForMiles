import React from "react";
import { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import {
  createDefaultBlock,
  deleteBlockchain,
} from "../../../../redux/system-admin/bitcoin-mining/bitcoinMiningAction";
import BlockchainView from "./BlockchainView";
import UserAmountForm from "./UserAmountForm";

function MiningOperations() {
  const [blockchain, setBlockchain] = useState(false);
  const [userAmountModal, setUserAmountModal] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();

  const destroyBlockchain = () => {
    if (window.confirm("Are you sure you want to delete blockchain?")) {
      dispatch(deleteBlockchain(params.username))
        .then((response) => {
          if (response.status === 204) {
            alert.show("Deleting blockchain successfully.", {
              type: "success",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          if (
            error.response.data.indexOf(
              "Deleting unsuccessfully. Blockchain doesn't exsist or operation is currenly invalid."
            ) !== -1
          ) {
            alert.show(
              "Deleting unsuccessfully. Blockchain doesn't exsist or operation is currenly invalid.",
              {
                type: "error",
              }
            );
          } else if (
            error.response.data.indexOf(
              "This is not system admin. Only system admin can to work with configuration of blockchain."
            ) !== -1
          ) {
            alert.show(
              "This is not system admin. Only system admin can to work with configuration of blockchain.",
              {
                type: "error",
              }
            );
          } else {
            alert.show("Unknown error.", {
              type: "error",
            });
          }
        });
    }
  };

  const createBlockchain = () => {
    dispatch(createDefaultBlock(params.username))
      .then((response) => {
        if (response.status === 200) {
          alert.show("Default block created successfully.", {
            type: "success",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        if (
          error.response.data.indexOf(
            "This is not system admin. Only system admin can to work with configuration of blockchain."
          ) !== -1
        ) {
          alert.show(
            "This is not system admin. Only system admin can to work with configuration of blockchain.",
            {
              type: "error",
            }
          );
        } else if (
          error.response.data.indexOf(
            "Creating block chain unsuccessfully. We've already had defined blcokchain."
          ) !== -1
        ) {
          alert.show(
            "Creating block chain unsuccessfully. We've already had defined blcokchain.",
            {
              type: "error",
            }
          );
        } else {
          alert.show("Unknown error.", {
            type: "error",
          });
        }
      });
  };

  return (
    <div>
      <h2 style={{ color: "white", marginTop: "8px" }}>OPERATIONS</h2>
      <div style={{ margin: "8px 0" }}>
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => createBlockchain()}
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
            onClick={() => destroyBlockchain()}
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
        <span className="box">
          <button
            type="submit"
            style={{ backgroundColor: "#141e30" }}
            onClick={() => setUserAmountModal(true)}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            DEFINE USER'S AMOUNT
          </button>
        </span>
      </div>
      {blockchain ? <BlockchainView /> : null}
      <UserAmountForm
        userAmountModal={userAmountModal}
        setUserAmountModal={setUserAmountModal}
      />
    </div>
  );
}

export default MiningOperations;
