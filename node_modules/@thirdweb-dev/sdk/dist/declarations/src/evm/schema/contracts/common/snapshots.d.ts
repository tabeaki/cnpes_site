import { z } from "zod";
/**
 * @internal
 */
export declare const MerkleSchema: z.ZodObject<{
    merkle: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    merkle: Record<string, string>;
}, {
    merkle?: Record<string, string> | undefined;
}>;
/**
 * @internal
 */
export declare const SnapshotEntryInput: z.ZodObject<{
    address: z.ZodEffects<z.ZodString, string, string>;
    maxClaimable: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>>;
}, "strip", z.ZodTypeAny, {
    address: string;
    maxClaimable: string;
}, {
    maxClaimable?: string | number | undefined;
    address: string;
}>;
export declare type SnapshotEntry = z.output<typeof SnapshotEntryInput>;
export declare type ShardData = {
    proofs: string[];
    entries: SnapshotEntry[];
};
export declare type ShardedMerkleTreeInfo = {
    merkleRoot: string;
    baseUri: string;
    originalEntriesUri: string;
    shardNybbles: number;
    tokenDecimals: number;
    isShardedMerkleTree: true;
};
export declare type ShardedSnapshot = {
    shardedMerkleInfo: ShardedMerkleTreeInfo;
    uri: string;
};
/**
 * @internal
 */
export declare const SnapshotInputSchema: z.ZodUnion<[z.ZodEffects<z.ZodArray<z.ZodString, "many">, {
    address: string;
    maxClaimable: string;
}[], string[]>, z.ZodArray<z.ZodObject<{
    address: z.ZodEffects<z.ZodString, string, string>;
    maxClaimable: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>>;
}, "strip", z.ZodTypeAny, {
    address: string;
    maxClaimable: string;
}, {
    maxClaimable?: string | number | undefined;
    address: string;
}>, "many">]>;
declare const SnapshotEntryWithProofSchema: z.ZodObject<z.extendShape<{
    address: z.ZodEffects<z.ZodString, string, string>;
    maxClaimable: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>>;
}, {
    proof: z.ZodArray<z.ZodString, "many">;
}>, "strip", z.ZodTypeAny, {
    address: string;
    proof: string[];
    maxClaimable: string;
}, {
    maxClaimable?: string | number | undefined;
    address: string;
    proof: string[];
}>;
/**
 * @internal
 */
export declare const SnapshotSchema: z.ZodObject<{
    /**
     * The merkle root
     */
    merkleRoot: z.ZodString;
    claims: z.ZodArray<z.ZodObject<z.extendShape<{
        address: z.ZodEffects<z.ZodString, string, string>;
        maxClaimable: z.ZodDefault<z.ZodEffects<z.ZodUnion<[z.ZodString, z.ZodNumber]>, string, string | number>>;
    }, {
        proof: z.ZodArray<z.ZodString, "many">;
    }>, "strip", z.ZodTypeAny, {
        address: string;
        proof: string[];
        maxClaimable: string;
    }, {
        maxClaimable?: string | number | undefined;
        address: string;
        proof: string[];
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    merkleRoot: string;
    claims: {
        address: string;
        proof: string[];
        maxClaimable: string;
    }[];
}, {
    merkleRoot: string;
    claims: {
        maxClaimable?: string | number | undefined;
        address: string;
        proof: string[];
    }[];
}>;
/**
 * @internal
 */
export declare type SnapshotEntryWithProof = z.output<typeof SnapshotEntryWithProofSchema>;
/**
 * @internal
 */
export declare const SnapshotInfoSchema: z.ZodObject<{
    merkleRoot: z.ZodString;
    snapshotUri: z.ZodString;
}, "strip", z.ZodTypeAny, {
    merkleRoot: string;
    snapshotUri: string;
}, {
    merkleRoot: string;
    snapshotUri: string;
}>;
export {};
//# sourceMappingURL=snapshots.d.ts.map