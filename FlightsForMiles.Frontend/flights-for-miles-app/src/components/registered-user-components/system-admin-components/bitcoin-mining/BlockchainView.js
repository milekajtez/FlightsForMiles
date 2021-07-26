import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { loadBlockchain } from '../../../../redux/system-admin/bitcoin-mining/bitcoinMiningAction';

function BlockchainView() {
    const dispatch = useDispatch();
    const blockchain = useSelector(state => state.blockchain);
    const params = useParams();

    useEffect(() => {
        dispatch(loadBlockchain(params.username));
    }, [dispatch, params.username]);

    return (
        <>
            <hr style={{backgroundColor: 'aqua', margin: '20px 5%'}}></hr>
            <h2 style={{ color: "white", marginTop: "8px" }}>BLOCKCHAIN</h2>
            <div className="blochchain-wrapper">
                <div className="blochchain-frame">
                    {blockchain.allBlocks.map((block, index) => {
                        return (
                            <span className="blochchain-box" key={index}>
                                <div className="blochchain-upper">
                                    <div className="blochchain-round">
                                        <img className="blochchain-img" src="https://i.postimg.cc/gkxX3BdQ/BTC.png" alt=""/>
                                    </div>
                                </div>
                                <div className="blochchain-lower">
                                    <h1 className="blochchain-h1">Block Index: {block.index}</h1>
                                    <p className="blochchain-price" id="btc">Time stamp:<br></br>{block.timeStamp}</p>
                                    <hr style={{backgroundColor: 'aqua'}}></hr>
                                    <p className='blochchain-price'>Proof: {block.proof}</p>
                                    <hr style={{backgroundColor: 'aqua'}}></hr>
                                    <p className="blochchain-price">Previous hash:<br></br>{block.previousHash === "" ? 'none' : block.previousHash.slice(0, 16) + "..."}</p>
                                    <hr style={{backgroundColor: 'aqua'}}></hr>
                                    <p className="blochchain-price">Hash:<br></br>{block.hash.slice(0, 16) + "..."}</p>
                                </div>
                            </span>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BlockchainView
