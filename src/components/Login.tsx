import {
    TonConnectButton, useTonAddress
} from '@tonconnect/ui-react';
import {useEffect, useRef} from "react";
import AlertComponent from "./common/AlertComponent";
// import {useInit} from "./hooks/useInit";
// import {useTonClient} from "./hooks/useTonClient";
// import {Counter} from "../contracts/ContractWrapper";
// import {Address} from "ton-core";
import {useConnection} from "../hooks/useConnection";
import {useContractWrapper} from "../hooks/useContractWrapper";

export const Login = () => {
    // const wallet = useTonWallet();
    // const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    // const [stakeLoading] = useState(false);
    // const [haveMint, setHaveMint] = useState(false);
    const alertRef = useRef(null);
    // const client = useTonClient();


    const {connected} = useConnection();

    // todo 合约地址需要修改
    // todo EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl  正式合约
    // const contractAddress = 'kQCosUQKgQvPvf-WQtvYoL25e-7VY7Wll6zrdC81DT9NZ7S0'

    const {
        number,
        // mintNFTMessage,
    } = useContractWrapper();


    // function jump() {
    //     window.open('http://testh5.yugu.co.nz/member/orderFood?id=164&name=%20MS%20Dessert%20Cafe', '_self')
    // }

    function jumpToGame() {
        window.open('https://gold-minter.vercel.app?userAddress=' + rawAddress, '_self')
    }

    // const mainContract = useInit( async () => {
    //     if (!client) return;
    //     const contract = new Counter(Address.parse("kQB6UE8yqAonG8AM6tz8PtTE-JQ5svQwWjUWUM4ycZWId39V")
    //     );
    //     return client.open(contract);
    // },[client]);

    // async function mintNFT() {
    //     // wait until confirmed
    //     try {
    //         await mintNFTMessage();
    //         await pullCoupon()
    //         // window.open('http://testh5.yugu.co.nz/member/orderFood?id=164&name=%20MS%20Dessert%20Cafe', '_self')
    //     } catch (e) {
    //         //Error: Request failed with status code 429
    //         console.log(e)
    //     }
    //     // const seqno = await connected.connected .getSeqno();
    //
    //     // let currentSeqno = seqno;
    //     // while (currentSeqno == seqno) {
    //     //     console.log("waiting for transaction to confirm...");
    //     //     await sleep(1500);
    //     //     currentSeqno = await walletContract.getSeqno();
    //     // }
    //     console.log("transaction confirmed!");
    // }

    // https://testnet.tonapi.io/v2/accounts/UQBqzgPhqVlvk6nsfwi3IHZdDZnJ3Artmv_jm3OW9M5WcpFy/nfts?collection=EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl&limit=1000&offset=0&indirect_ownership=false

    // async function queryUserNFTs() {
    //     // todo 请求地址要改
    //     let url: string = "https://testnet.tonapi.io/v2/accounts/" + rawAddress + "/nfts?collection=" + contractAddress + "&limit=1000&offset=0&indirect_ownership=false"
    //     const res = await fetch(url)
    //     const data = await res.json()
    //     return data.nft_items
    //
    //     // console.log('response', response)
    // }

    function queryUserHavePullCoupon() {
        // todo 请求地址要改
        let url: string = "http://localhost:3000/api/coupon?address=" + rawAddress
        fetch(url).then(response => response.json())
            .then((data) => {
                console.log(data);
                if (data !== undefined && data.length > 0) {
                    // setHaveMint(true)
                }
                // setPosts(data);
            });
        // console.log('response', response)
    }

    // function updateUserGetCoupon() {
    //     const update = {
    //         address: rawAddress
    //     };
    //     // todo 请求地址要改
    //     let url: string = "http://localhost:3000/api/coupon"
    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(update)
    //     })
    //         .then(data => {
    //             if (!data.ok) {
    //                 console.log('error data', data)
    //             }
    //             return data.json();
    //         }).then(update => {
    //         console.log(update);
    //     }).catch(e => {
    //         console.log(e);
    //     });
    // }


    useEffect(() => {
        // queryUserNFTs()
        if (rawAddress != undefined && rawAddress != '') {
            queryUserHavePullCoupon()
        }
        // updateUserGetCoupon()
        // queryUserNFTs()

    }, [connected]);

    useEffect(() => {
        console.log('connected', connected,rawAddress)
        jumpToGame()
    }, [connected]);

    // async function pullCoupon() {
    //     let nftList = null
    //     while (nftList === null) {
    //         const resultNFTList = await queryUserNFTs()
    //         if (resultNFTList.length > 0) {
    //             nftList = resultNFTList
    //             // console.log(nftList);
    //         } else {
    //             console.log('dont have nft')
    //         }
    //     }
    //     // 领取优惠券
    //     const result = await updateUserGetCoupon()
    //     if (result.status === 0) {
    //         // 成功
    //         setHaveMint(true)
    //     }
    // }


    return (
        <div className="h-screen w-[100%] flex flex-col items-center justify-center bg-[url('/public/bg.svg')] bg-cover">

            <img src="/subtitle.svg" width="300" height="300" alt="sub"></img>
            <img src="/title.svg" width="300" height="300" alt="title" className="mt-[2rem]"></img>
            <div className="my-[3rem] font-['Roboto-Regular']">Start earning for each order with DISHSOON:{number}</div>
            {/*data-login_uri="https://yugu.vercel.app"*/}
            {/*<TonConnectButton />*/}
            {/*<div>*/}
            {/*    <span>User-friendly address: {userFriendlyAddress}</span>*/}
            {/*    <span>Raw address: {rawAddress}</span>*/}
            {/*</div>*/}
            <TonConnectButton/>

            {/*{!connected && (stakeLoading ? <span className="loading loading-spinner loading-sm"></span> :*/}
            {/*        <TonConnectButton/>*/}
            {/*)}*/}
            {/*{!haveLogin && <div className="overflow-hidden">*/}
            {/*    <div id="g_id_onload"*/}
            {/*         data-client_id="456534502200-r1bv9iimdrvti6vt46jc00t9jtpdjrf2.apps.googleusercontent.com"*/}
            {/*         data-context="signin"*/}
            {/*         data-ux_mode="popup"*/}
            {/*         data-callback="loginProcess"*/}
            {/*         data-auto_prompt="false"*/}
            {/*         className="overflow-hidden">*/}
            {/*    </div>*/}

            {/*    <div className="g_id_signin "*/}
            {/*         data-type="standard"*/}
            {/*         data-shape="rectangular"*/}
            {/*         data-theme="filled_blue"*/}
            {/*         data-text="signin_with"*/}
            {/*         data-size="large"*/}
            {/*         data-logo_alignment="left">*/}
            {/*    </div>*/}
            {/*</div>}*/}
            <br/>


            {/*<input type="text" className="border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-3 py-2 mb-3" placeholder="Email" onChange={handleEmailChange} value={email}/>*/}

            {/*<button onClick={initWallet} className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']">*/}
            {/*    <Image src="/google.png" width="30" height="30" alt="google" className="mr-[1.5rem]"></Image>*/}
            {/*    Continue with Google*/}
            {/*</button>*/}
            {/*<div className='break-all'>*/}
            {/*    your address: {wallet.address} <br/>*/}
            {/*    your private key: {wallet.privateKey}*/}
            {/*</div>*/}
            {/*{userFriendlyAddress && <button onClick={mintNft} className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']">*/}
            {/*    {stakeLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Mint DISHSOON NFT'}*/}
            {/*</button>}*/}

            {/*{(connected && !haveMint) && (*/}
            {/*    <button className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']"*/}
            {/*            onClick={() => {*/}
            {/*                mintNFT()*/}
            {/*            }}>*/}

            {/*        {stakeLoading ? <span className="loading loading-spinner loading-sm"></span> : 'Mint DISHSOON NFT'}*/}
            {/*    </button>*/}
            {/*)}*/}

            {/*{(connected && haveMint) && (*/}
            {/*    <button className="flex items-center border-[2px] rounded-[0.7rem] text-[#000000] border-[#000000] px-[1.1rem] py-[0.6rem] font-['Roboto-Regular']"*/}
            {/*            onClick={() => {*/}
            {/*                jump()*/}
            {/*            }}>*/}

            {/*        Order*/}
            {/*    </button>*/}
            {/*)}*/}

            {/*<div onClick={jumpToGame} className="text-[#B5B5B5] mt-[2rem] font-['Roboto-Regular'] flex items-center ">*/}
            {/*    <span className='underline decoration-1 decoration-[#B5B5B5]'>I don’t want free money, just let me order</span>*/}
            {/*    <img src="/right.svg" width="30" height="30" alt="right" className="ml-[0.5rem]"></img>*/}
            {/*</div>*/}
            <AlertComponent ref={alertRef}/>
        </div>
    );
};
