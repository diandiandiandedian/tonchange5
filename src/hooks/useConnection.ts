import {useTonAddress, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import { Sender, SenderArguments} from "ton-core";

export function useConnection(): { sender: Sender; connected: boolean;userFriendlyAddress:string;rawAddress:string} {
    const [TonConnectUI] = useTonConnectUI();
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);

    return {
        sender: {
          send: async (args: SenderArguments) => {
            TonConnectUI.sendTransaction({
              messages: [
                {
                  address: args.to.toString(),
                  amount: args.value.toString(),
                  payload: args.body?.toBoc().toString("base64"),
                },
              ],
              validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
            });
          },
        },
        connected: TonConnectUI.connected,
        userFriendlyAddress: userFriendlyAddress,
        rawAddress:rawAddress,
      };

}
