import './App.css'
// import {TonConnectButton} from '@tonconnect/ui-react'
// import {useContractWrapper} from './hooks/useContractWrapper'
// import {useConnection} from './hooks/useConnection';
import {Login} from "./components/Login";

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

    // const {
    //     number,
    //     contract_address,
    //     sendInternalMessage,
    //     mintNFTMessage,
    // } = useContractWrapper();

    // const {connected, userFriendlyAddress, rawAddress} = useConnection();


    return (
        <>
            <div>
                {/*<b>userFriendlyAddress: {userFriendlyAddress}</b><br/>*/}
                {/*<b>rawAddress: {rawAddress}</b><br/>*/}
                {/*<b>Contract Address:</b>*/}
                {/*<b>Contract Address:</b>*/}
                {/*<div>{contract_address}</div>*/}
                {/*<b>Current counter</b>*/}
                {/*<div>{number} aaaa</div>*/}
                <Login></Login>

                {/*{connected && (*/}
                {/*  <a*/}
                {/*    onClick={()=>{*/}
                {/*      sendInternalMessage();*/}
                {/*    }}*/}
                {/*  >*/}
                {/*    Send increase by 1*/}
                {/*  </a>*/}
                {/*)}*/}
                {/*    <br/>*/}
                {/*    <br/>*/}
                {/*    <br/>*/}


                {/*{connected && (*/}
                {/*    <a*/}
                {/*        onClick={() => {*/}
                {/*            mintNFTMessage();*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        mint nft*/}
                {/*    </a>*/}
                {/*)}*/}


            </div>
        </>
    )
}


export default App;
