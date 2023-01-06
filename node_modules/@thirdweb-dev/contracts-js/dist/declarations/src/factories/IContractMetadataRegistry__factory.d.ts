import type { IContractMetadataRegistry, IContractMetadataRegistryInterface } from "../IContractMetadataRegistry";
import type { Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
export declare class IContractMetadataRegistry__factory {
    static readonly abi: ({
        anonymous: boolean;
        inputs: {
            indexed: boolean;
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
    })[];
    static createInterface(): IContractMetadataRegistryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IContractMetadataRegistry;
}
//# sourceMappingURL=IContractMetadataRegistry__factory.d.ts.map