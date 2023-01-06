import { TransactionResponse } from '@ethersproject/abstract-provider';
import { Signer } from '@ethersproject/abstract-signer';
import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { Eip3770Address, EthAdapter, EthAdapterTransaction, GetContractProps, SafeTransactionEIP712Args } from '@gnosis.pm/safe-core-sdk-types';
import { ethers } from 'ethers';
import GnosisSafeContractEthers from './contracts/GnosisSafe/GnosisSafeContractEthers';
import GnosisSafeProxyFactoryEthersContract from './contracts/GnosisSafeProxyFactory/GnosisSafeProxyFactoryEthersContract';
import MultiSendEthersContract from './contracts/MultiSend/MultiSendEthersContract';
import MultiSendCallOnlyEthersContract from './contracts/MultiSendCallOnly/MultiSendCallOnlyEthersContract';
declare type Ethers = typeof ethers;
export interface EthersAdapterConfig {
    /** ethers - Ethers v5 library */
    ethers: Ethers;
    /** signer - Ethers signer */
    signer: Signer;
}
declare class EthersAdapter implements EthAdapter {
    #private;
    constructor({ ethers, signer }: EthersAdapterConfig);
    getProvider(): Provider;
    getSigner(): Signer;
    isAddress(address: string): boolean;
    getEip3770Address(fullAddress: string): Promise<Eip3770Address>;
    getBalance(address: string, blockTag?: string | number): Promise<BigNumber>;
    getNonce(address: string, blockTag?: string | number): Promise<number>;
    getChainId(): Promise<number>;
    getChecksummedAddress(address: string): string;
    getSafeContract({ safeVersion, chainId, singletonDeployment, customContractAddress }: GetContractProps): GnosisSafeContractEthers;
    getMultiSendContract({ safeVersion, chainId, singletonDeployment, customContractAddress }: GetContractProps): MultiSendEthersContract;
    getMultiSendCallOnlyContract({ safeVersion, chainId, singletonDeployment, customContractAddress }: GetContractProps): MultiSendCallOnlyEthersContract;
    getSafeProxyFactoryContract({ safeVersion, chainId, singletonDeployment, customContractAddress }: GetContractProps): GnosisSafeProxyFactoryEthersContract;
    getContractCode(address: string, blockTag?: string | number): Promise<string>;
    isContractDeployed(address: string, blockTag?: string | number): Promise<boolean>;
    getStorageAt(address: string, position: string): Promise<string>;
    getTransaction(transactionHash: string): Promise<TransactionResponse>;
    getSignerAddress(): Promise<string>;
    signMessage(message: string): Promise<string>;
    signTypedData(safeTransactionEIP712Args: SafeTransactionEIP712Args): Promise<string>;
    estimateGas(transaction: EthAdapterTransaction): Promise<number>;
    call(transaction: EthAdapterTransaction, blockTag?: string | number): Promise<string>;
    encodeParameters(types: string[], values: any[]): string;
    decodeParameters(types: string[], values: string): {
        [key: string]: any;
    };
}
export default EthersAdapter;
