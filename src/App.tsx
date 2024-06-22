import './App.css'
import { TonConnectButton } from '@tonconnect/ui-react'
import { useContractWrapper } from './hooks/useContractWrapper'
import { useConnection } from './hooks/useConnection';

function App() {

/*2
return (
  <>
    <TonConnectButton/>
    </>
  )
}
*/

/* 3*/

  const {
    number,
    contract_address,
    sendInternalMessage,
      mintNFTMessage,
  } = useContractWrapper();

  const { connected,userFriendlyAddress,rawAddress } = useConnection();



  return (
    <>
      <TonConnectButton/>
      <div>
      <b>userFriendlyAddress: {userFriendlyAddress}</b><br/>
      <b>rawAddress: {rawAddress}</b><br/>
      <b>Contract Address:</b>
      <b>Contract Address:</b>
      <div>{contract_address}</div>
      <b>Current counter</b>
      <div>{number} aaaa</div>

      {connected && (
        <a
          onClick={()=>{
            sendInternalMessage();
          }}
        >
          Send increase by 1
        </a>
      )}
          <br/>
      {connected && (
        <a
          onClick={()=>{
              mintNFTMessage();
          }}
        >
          mint nft
        </a>
      )}


      </div>
    </>
  )
}



export default App;
