import {useEffect, useState} from 'react';
import { Address, OpenedContract, toNano} from 'ton-core';
import { useInit } from './useInit';
import { Counter } from '../contracts/ContractWrapper';
import { useTonClient } from './useTonClient';
import { useConnection } from './useConnection';

export function useContractWrapper() {
    const client = useTonClient();
    const connection = useConnection();

    const sleep =(time: number) =>
        new Promise((resolve) => setTimeout(resolve, time));


    const [contractData, setContractData] = useState<null | {
        number: number;
    }>();

    // todo nft合约地址
    // kQB6UE8yqAonG8AM6tz8PtTE-JQ5svQwWjUWUM4ycZWId39V 加1合约
    // EQDf6HCOggN_ZGL6YsYleN6mDiclQ_NJOMY-x8G5cTRDOBW4 nft合约
    // 自己创建的nft合约地址: EQAo6NTbA59-iITS8YB0RWjhZoh-vIbuCWZFvU1UCqC1ktaG
    // 自己创建的nftitem合约: EQDylFtFZBeAJXxkE-6Zjs-Li8Lzbh3kqXGhs1lR3B9y52Cd
    const mainContract = useInit( async () => {
        if (!client) return;
        const contract = new Counter(
            Address.parse("EQDf6HCOggN_ZGL6YsYleN6mDiclQ_NJOMY-x8G5cTRDOBW4")
        );
        return client.open(contract) as OpenedContract<Counter>;
    },[client]);

    useEffect( () => {
        async function getValue() {
            if(!mainContract) return;
            setContractData(null);
            const instack = await mainContract.getNFTCount();
            console.log('instack', instack)
            setContractData({
                number: parseInt(instack.toString()),
            });
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [mainContract]);

    return {
        contract_address: mainContract?.address.toString(),
        ...contractData,
        sendInternalMessage: () => {
            return mainContract?.sendIncrease(connection.sender, {
                increaseBy: 1,
                value: toNano('0.05'),
            });
        },
        mintNFTMessage: () => {
            return mainContract?.sendMintNFT(connection.sender, {
                friendlyAddress: connection.userFriendlyAddress,
                value: toNano('0.05'),
            });
        },

    };
}

