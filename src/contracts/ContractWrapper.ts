import {Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode, toNano} from 'ton-core';
import {TonClient} from "ton";
import {Buffer} from 'buffer';


export type CounterConfig = {
    id: number;
    counter: number;
};

export function counterConfigToCell(config: CounterConfig): Cell {
    return beginCell().storeUint(config.id, 32).storeUint(config.counter, 32).endCell();
}

export const Opcodes = {
    increase: 0x7e8764ef,
};

export class Counter implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    static createFromConfig(config: CounterConfig, code: Cell, workchain = 0) {
        const data = counterConfigToCell(config);
        const init = { code, data };
        return new Counter(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }

    async sendMintNFT(
        provider: ContractProvider,
        via: Sender,
        opts: {
            friendlyAddress: string;
            value: bigint;
            queryID?: number;
        }
    ) {
        const toncenter = new TonClient({
            // todo 线上和测试 testnet.
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
        })
        // todo nft合约地址
        // 自己创建的nftitem合约: EQDylFtFZBeAJXxkE-6Zjs-Li8Lzbh3kqXGhs1lR3B9y52Cd
        let {stack}=await toncenter.runMethod(Address.parse('EQBcBMxM4DOJzxgN8KG_Qm8WOgwTbDCxApyTFVduT_8lz1Yl'), 'get_collection_data')

        let nextItemIndex = stack.readBigNumber();
        console.log('nextItemIndex', nextItemIndex)

        const ownerAddress = Address.parse(opts.friendlyAddress);
        const commonContentUrl = "item.json";
        console.log('opts.friendlyAddress', ownerAddress)

        const nftItemContent = beginCell();
        nftItemContent.storeAddress(ownerAddress);
        const uriContent = beginCell();
        uriContent.storeBuffer(Buffer.from(commonContentUrl));
        nftItemContent.storeRef(uriContent.endCell());

        await provider.internal(via, {
            value: opts.value,
            // sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0, 32)
                // .storeUint(0, 64)
                // .storeUint(nextItemIndex, 64)
                // .storeCoins(toNano("1"))
                .storeStringTail("Mint")
                // .storeRef(nftItemContent.endCell())
                .endCell(),
        });
    }

    async sendIncrease(
        provider: ContractProvider,
        via: Sender,
        opts: {
            increaseBy: number;
            value: bigint;
            queryID?: number;
        }
    ) {
       const res = await provider.internal(via, {
            value: opts.value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(Opcodes.increase, 32)
                .storeUint(opts.queryID ?? 0, 64)
                .storeUint(opts.increaseBy, 32)
                .endCell(),
        });
       console.log('ContractWrapper.ts res', res)
    }

    async getCounter(provider: ContractProvider) {
        const result = await provider.get('get_counter', []);
        return result.stack.readNumber();
    }

    async getID(provider: ContractProvider) {
        const result = await provider.get('get_id', []);
        return result.stack.readNumber();
    }
    async getNFTCount(provider: ContractProvider) {
        const result = await provider.get('get_collection_data', []);
        return result.stack.readBigNumber();
    }
}
