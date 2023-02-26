import "./App.css";
import abi from "./contracts/SayGm.json";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

function App() {
  const contractAddr = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const contractABI = abi.abi;

  const [allMessages, setAllMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [numMessages, setNumMessages] = useState(0);

  const getMessages = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const gmContract = new ethers.Contract(contractAddr, contractABI, provider);
      const messages = await gmContract.getMessages();
      setAllMessages(messages);
      setNumMessages(messages.length);
    } catch (error) {
      console.log(error);
    }
  };

  const submitMessageHandler = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gmContract = new ethers.Contract(contractAddr, contractABI, signer);
      const sayGmTx = await gmContract.sayGm(message);
      await sayGmTx.wait();
      console.log("said gm: " + message);
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  });

  return (
    <div className="App">
      <div>
        <h1>say gm on scroll pre-alpha testnet</h1>
      </div>
      <div>
        <h2>Say GM:</h2>
        <div>
          <input type="text" placeholder="gm" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={submitMessageHandler}>Submit message</button>
        </div>
      </div>
      <div className="messages">
        <h2>Messages ({numMessages}):</h2>
        {allMessages &&
          allMessages.map((thisMsg, idx) => {
            const timestamp = new Date(thisMsg[2] * 1000);
            const msgToDisplay = `${thisMsg[1]} - ${thisMsg[0]} (${timestamp.toLocaleString()})`;
            return <div key={idx}>{msgToDisplay}</div>;
          })}
      </div>
    </div>
  );
}

export default App;
