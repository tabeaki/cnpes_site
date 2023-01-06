import { ShardedMerkleTreeInfo, ShardedSnapshot, SnapshotEntry, SnapshotEntryWithProof } from "../schema";
import { SnapshotInput } from "../types";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
export declare class ShardedMerkleTree {
    private shardNybbles;
    private shards;
    private trees;
    private storage;
    private baseUri;
    private originalEntriesUri;
    private tokenDecimals;
    constructor(storage: ThirdwebStorage, baseUri: string, originalEntriesUri: string, shardNybbles: number, tokenDecimals: number);
    static fromUri(uri: string, storage: ThirdwebStorage): Promise<ShardedMerkleTree | undefined>;
    static fromShardedMerkleTreeInfo(info: ShardedMerkleTreeInfo, storage: ThirdwebStorage): Promise<ShardedMerkleTree>;
    static hashEntry(entry: SnapshotEntry, tokenDecimals: number): string;
    static buildAndUpload(snapshotInput: SnapshotInput, tokenDecimals: number, storage: ThirdwebStorage, shardNybbles?: number): Promise<ShardedSnapshot>;
    getProof(address: string): Promise<SnapshotEntryWithProof | null>;
    getAllEntries(): Promise<SnapshotEntry[]>;
    private computeAllShardIds;
}
//# sourceMappingURL=sharded-merkle-tree.d.ts.map