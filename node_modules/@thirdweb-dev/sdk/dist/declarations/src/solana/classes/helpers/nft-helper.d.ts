import { QueryAllParams } from "../../../core/schema/QueryParams";
import { NFT } from "../../../core/schema/nft";
import { TransactionResult } from "../../types/common";
import { JsonMetadata, Metadata, Metaplex, Nft, NftWithToken, Sft, SftWithToken } from "@metaplex-foundation/js";
/**
 * @internal
 */
export declare class NFTHelper {
    private metaplex;
    private connection;
    constructor(metaplex: Metaplex);
    get(nftAddress: string): Promise<NFT>;
    transfer(receiverAddress: string, nftAddress: string, quantity?: number): Promise<TransactionResult>;
    balanceOf(walletAddress: string, nftAddress: string): Promise<number>;
    ownerOf(nftAddress: string): Promise<string | undefined>;
    getAll(collectionAddress: string, queryParams?: QueryAllParams): Promise<NFT[]>;
    supplyOf(nftAddress: string): Promise<number>;
    toNFTMetadata(meta: Nft | Sft | NftWithToken | SftWithToken | Metadata<JsonMetadata<string>>): Promise<NFT>;
    private toNFTMetadataResolved;
}
//# sourceMappingURL=nft-helper.d.ts.map