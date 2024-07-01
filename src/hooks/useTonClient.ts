import { TonClient } from "ton";
import { useInit } from "./useInit";

export function useTonClient() {
    return useInit(
        async () =>
            new TonClient({
                // todo 线上和测试 testnet.
                endpoint: "https://testnet.toncenter.com/api/v2/jsonRPC",
            })
    );
}
