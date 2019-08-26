// tslint:disable:no-consecutive-blank-lines ordered-imports align trailing-comma
// tslint:disable:whitespace no-unbound-method no-trailing-whitespace
// tslint:disable:no-unused-variable
import { BaseContract,
    BlockRange,
    EventCallback,
    IndexedFilterValues,
    SubscriptionManager,PromiseWithTransactionHash } from '@0x/base-contract';
import { schemas } from '@0x/json-schemas';
import {
    BlockParam,
    BlockParamLiteral,
    CallData,
    ContractAbi,
    ContractArtifact,
    DecodedLogArgs,
    LogWithDecodedArgs,
    MethodAbi,
    TransactionReceiptWithDecodedLogs,
    TxData,
    TxDataPayable,
    SupportedProvider,
} from 'ethereum-types';
import { BigNumber, classUtils, logUtils, providerUtils } from '@0x/utils';
import { SimpleContractArtifact } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { assert } from '@0x/assert';
import * as ethers from 'ethers';
// tslint:enable:no-unused-variable

export type Swap721EventArgs =
    | Swap721MintedEventArgs
    | Swap721BoughtEventArgs
    | Swap721SettledEventArgs
    | Swap721CanceledEventArgs
    | Swap721TerminatedEventArgs
    | Swap721WhitelistedAddedEventArgs
    | Swap721WhitelistedRemovedEventArgs
    | Swap721WhitelistAdminAddedEventArgs
    | Swap721WhitelistAdminRemovedEventArgs
    | Swap721TransferEventArgs
    | Swap721ApprovalEventArgs
    | Swap721ApprovalForAllEventArgs;

export enum Swap721Events {
    Minted = 'Minted',
    Bought = 'Bought',
    Settled = 'Settled',
    Canceled = 'Canceled',
    Terminated = 'Terminated',
    WhitelistedAdded = 'WhitelistedAdded',
    WhitelistedRemoved = 'WhitelistedRemoved',
    WhitelistAdminAdded = 'WhitelistAdminAdded',
    WhitelistAdminRemoved = 'WhitelistAdminRemoved',
    Transfer = 'Transfer',
    Approval = 'Approval',
    ApprovalForAll = 'ApprovalForAll',
}

export interface Swap721MintedEventArgs extends DecodedLogArgs {
    issuer: string;
    tokenId: BigNumber;
}

export interface Swap721BoughtEventArgs extends DecodedLogArgs {
    buyer: string;
    tokenId: BigNumber;
}

export interface Swap721SettledEventArgs extends DecodedLogArgs {
    tokenId: BigNumber;
    fixLegPayout: BigNumber;
    floatingLegPayout: BigNumber;
}

export interface Swap721CanceledEventArgs extends DecodedLogArgs {
    tokenId: BigNumber;
}

export interface Swap721TerminatedEventArgs extends DecodedLogArgs {
    tokenId: BigNumber;
}

export interface Swap721WhitelistedAddedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface Swap721WhitelistedRemovedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface Swap721WhitelistAdminAddedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface Swap721WhitelistAdminRemovedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface Swap721TransferEventArgs extends DecodedLogArgs {
    from: string;
    to: string;
    tokenId: BigNumber;
}

export interface Swap721ApprovalEventArgs extends DecodedLogArgs {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}

export interface Swap721ApprovalForAllEventArgs extends DecodedLogArgs {
    owner: string;
    operator: string;
    approved: boolean;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class Swap721Contract extends BaseContract {
    public supportsInterface = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            interfaceId: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('interfaceId', interfaceId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('supportsInterface(bytes4)', [interfaceId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('supportsInterface(bytes4)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                interfaceId: string,
            ): string {
            assert.isString('interfaceId', interfaceId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('supportsInterface(bytes4)', [interfaceId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('supportsInterface(bytes4)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('supportsInterface(bytes4)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public name = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('name()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('name()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('name()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('name()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('name()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public getApproved = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('getApproved(uint256)', [tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getApproved(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                tokenId: BigNumber,
            ): string {
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('getApproved(uint256)', [tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('getApproved(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('getApproved(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public approve = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            to: string,
            tokenId: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('approve(address,uint256)', [to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.approve.estimateGasAsync.bind(
                self,
                to.toLowerCase(),
                tokenId
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.approve.sendTransactionAsync(to.toLowerCase(),
    tokenId
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('approve(address,uint256)', [to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            to: string,
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [to.toLowerCase(),
        tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                to: string,
                tokenId: BigNumber,
            ): string {
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('approve(address,uint256)', [to.toLowerCase(),
        tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                to: string,
                tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).approve.callAsync(
    to,
    tokenId,
    txData,
            );
            const txHash =  await (this as any).approve.sendTransactionAsync(
    to,
    tokenId,
    txData,
            ); 
            return txHash;
        }
    };
    public addWhitelisted = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            account: string,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('addWhitelisted(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.addWhitelisted.estimateGasAsync.bind(
                self,
                account.toLowerCase()
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            account: string,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.addWhitelisted.sendTransactionAsync(account.toLowerCase()
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            account: string,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('addWhitelisted(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('account', account);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('addWhitelisted(address)', [account.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('addWhitelisted(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                account: string,
            ): string {
            assert.isString('account', account);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('addWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('addWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                account: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).addWhitelisted.callAsync(
    account,
    txData,
            );
            const txHash =  await (this as any).addWhitelisted.sendTransactionAsync(
    account,
    txData,
            ); 
            return txHash;
        }
    };
    public transferFrom = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.transferFrom.estimateGasAsync.bind(
                self,
                from.toLowerCase(),
                to.toLowerCase(),
                tokenId
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.transferFrom.sendTransactionAsync(from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                from: string,
                to: string,
                tokenId: BigNumber,
            ): string {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                from: string,
                to: string,
                tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).transferFrom.callAsync(
    from,
    to,
    tokenId,
    txData,
            );
            const txHash =  await (this as any).transferFrom.sendTransactionAsync(
    from,
    to,
    tokenId,
    txData,
            ); 
            return txHash;
        }
    };
    public removeWhitelisted = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            account: string,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('removeWhitelisted(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.removeWhitelisted.estimateGasAsync.bind(
                self,
                account.toLowerCase()
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            account: string,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.removeWhitelisted.sendTransactionAsync(account.toLowerCase()
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            account: string,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('removeWhitelisted(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('account', account);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('removeWhitelisted(address)', [account.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('removeWhitelisted(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                account: string,
            ): string {
            assert.isString('account', account);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('removeWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('removeWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('removeWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                account: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).removeWhitelisted.callAsync(
    account,
    txData,
            );
            const txHash =  await (this as any).removeWhitelisted.sendTransactionAsync(
    account,
    txData,
            ); 
            return txHash;
        }
    };
    public isWhitelisted = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('account', account);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('isWhitelisted(address)', [account.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('isWhitelisted(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                account: string,
            ): string {
            assert.isString('account', account);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public safeTransferFrom1 = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.safeTransferFrom1.estimateGasAsync.bind(
                self,
                from.toLowerCase(),
                to.toLowerCase(),
                tokenId
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.safeTransferFrom1.sendTransactionAsync(from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                from: string,
                to: string,
                tokenId: BigNumber,
            ): string {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                from: string,
                to: string,
                tokenId: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).safeTransferFrom1.callAsync(
    from,
    to,
    tokenId,
    txData,
            );
            const txHash =  await (this as any).safeTransferFrom1.sendTransactionAsync(
    from,
    to,
    tokenId,
    txData,
            ); 
            return txHash;
        }
    };
    public renounceWhitelistAdmin = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('renounceWhitelistAdmin()', []);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.renounceWhitelistAdmin.estimateGasAsync.bind(
                self,
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        const self = this as any as Swap721Contract;
        const txHashPromise = self.renounceWhitelistAdmin.sendTransactionAsync(txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('renounceWhitelistAdmin()', []);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('renounceWhitelistAdmin()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelistAdmin()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceWhitelistAdmin()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelistAdmin()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelistAdmin()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).renounceWhitelistAdmin.callAsync(
    txData,
            );
            const txHash =  await (this as any).renounceWhitelistAdmin.sendTransactionAsync(
    txData,
            ); 
            return txHash;
        }
    };
    public contractUnit = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('contractUnit()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('contractUnit()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('contractUnit()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('contractUnit()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('contractUnit()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public ownerOf = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('ownerOf(uint256)', [tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('ownerOf(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                tokenId: BigNumber,
            ): string {
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('ownerOf(uint256)', [tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('ownerOf(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('ownerOf(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public balanceOf = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            owner: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            assert.isString('owner', owner);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('balanceOf(address)', [owner.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('balanceOf(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<BigNumber
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                owner: string,
            ): string {
            assert.isString('owner', owner);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('balanceOf(address)', [owner.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (BigNumber
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('balanceOf(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<BigNumber
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (BigNumber
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('balanceOf(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public addWhitelistAdmin = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            account: string,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('addWhitelistAdmin(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.addWhitelistAdmin.estimateGasAsync.bind(
                self,
                account.toLowerCase()
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            account: string,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.addWhitelistAdmin.sendTransactionAsync(account.toLowerCase()
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            account: string,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('account', account);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('addWhitelistAdmin(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('account', account);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('addWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('addWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                account: string,
            ): string {
            assert.isString('account', account);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('addWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('addWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                account: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).addWhitelistAdmin.callAsync(
    account,
    txData,
            );
            const txHash =  await (this as any).addWhitelistAdmin.sendTransactionAsync(
    account,
    txData,
            ); 
            return txHash;
        }
    };
    public oracle = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('oracle()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('oracle()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('oracle()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('oracle()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('oracle()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public symbol = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('symbol()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('symbol()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('symbol()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('symbol()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('symbol()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public setApprovalForAll = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            to: string,
            approved: boolean,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('to', to);
        assert.isBoolean('approved', approved);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('setApprovalForAll(address,bool)', [to.toLowerCase(),
    approved
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.setApprovalForAll.estimateGasAsync.bind(
                self,
                to.toLowerCase(),
                approved
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            to: string,
            approved: boolean,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('to', to);
        assert.isBoolean('approved', approved);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.setApprovalForAll.sendTransactionAsync(to.toLowerCase(),
    approved
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            to: string,
            approved: boolean,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('to', to);
        assert.isBoolean('approved', approved);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('setApprovalForAll(address,bool)', [to.toLowerCase(),
    approved
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            to: string,
            approved: boolean,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('to', to);
            assert.isBoolean('approved', approved);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('setApprovalForAll(address,bool)', [to.toLowerCase(),
        approved
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('setApprovalForAll(address,bool)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                to: string,
                approved: boolean,
            ): string {
            assert.isString('to', to);
            assert.isBoolean('approved', approved);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('setApprovalForAll(address,bool)', [to.toLowerCase(),
        approved
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('setApprovalForAll(address,bool)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('setApprovalForAll(address,bool)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                to: string,
                approved: boolean,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).setApprovalForAll.callAsync(
    to,
    approved,
    txData,
            );
            const txHash =  await (this as any).setApprovalForAll.sendTransactionAsync(
    to,
    approved,
    txData,
            ); 
            return txHash;
        }
    };
    public safeTransferFrom2 = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            _data: string,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        assert.isString('_data', _data);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256,bytes)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId,
    _data
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.safeTransferFrom2.estimateGasAsync.bind(
                self,
                from.toLowerCase(),
                to.toLowerCase(),
                tokenId,
                _data
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            _data: string,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        assert.isString('_data', _data);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.safeTransferFrom2.sendTransactionAsync(from.toLowerCase(),
    to.toLowerCase(),
    tokenId,
    _data
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            _data: string,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('tokenId', tokenId);
        assert.isString('_data', _data);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256,bytes)', [from.toLowerCase(),
    to.toLowerCase(),
    tokenId,
    _data
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            from: string,
            to: string,
            tokenId: BigNumber,
            _data: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            assert.isString('_data', _data);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256,bytes)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId,
        _data
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256,bytes)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                from: string,
                to: string,
                tokenId: BigNumber,
                _data: string,
            ): string {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('tokenId', tokenId);
            assert.isString('_data', _data);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('safeTransferFrom(address,address,uint256,bytes)', [from.toLowerCase(),
        to.toLowerCase(),
        tokenId,
        _data
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256,bytes)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('safeTransferFrom(address,address,uint256,bytes)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                from: string,
                to: string,
                tokenId: BigNumber,
                _data: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).safeTransferFrom2.callAsync(
    from,
    to,
    tokenId,
    _data,
    txData,
            );
            const txHash =  await (this as any).safeTransferFrom2.sendTransactionAsync(
    from,
    to,
    tokenId,
    _data,
    txData,
            ); 
            return txHash;
        }
    };
    public isWhitelistAdmin = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            account: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('account', account);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('isWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('isWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                account: string,
            ): string {
            assert.isString('account', account);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public tokenURI = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('tokenURI(uint256)', [tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('tokenURI(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                tokenId: BigNumber,
            ): string {
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('tokenURI(uint256)', [tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('tokenURI(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('tokenURI(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public contractType = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('contractType()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('contractType()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('contractType()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('contractType()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('contractType()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public renounceWhitelisted = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('renounceWhitelisted()', []);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.renounceWhitelisted.estimateGasAsync.bind(
                self,
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        const self = this as any as Swap721Contract;
        const txHashPromise = self.renounceWhitelisted.sendTransactionAsync(txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('renounceWhitelisted()', []);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('renounceWhitelisted()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelisted()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceWhitelisted()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelisted()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceWhitelisted()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).renounceWhitelisted.callAsync(
    txData,
            );
            const txHash =  await (this as any).renounceWhitelisted.sendTransactionAsync(
    txData,
            ); 
            return txHash;
        }
    };
    public fixLegToken = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('fixLegToken()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('fixLegToken()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('fixLegToken()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('fixLegToken()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('fixLegToken()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public isApprovedForAll = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            owner: string,
            operator: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('owner', owner);
            assert.isString('operator', operator);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('isApprovedForAll(address,address)', [owner.toLowerCase(),
        operator.toLowerCase()
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('isApprovedForAll(address,address)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<boolean
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                owner: string,
                operator: string,
            ): string {
            assert.isString('owner', owner);
            assert.isString('operator', operator);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isApprovedForAll(address,address)', [owner.toLowerCase(),
        operator.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isApprovedForAll(address,address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('isApprovedForAll(address,address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public floatingLegCollateral = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<string
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('floatingLegCollateral()', []);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('floatingLegCollateral()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<string
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
            ): string {
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('floatingLegCollateral()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('floatingLegCollateral()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<string
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (string
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('floatingLegCollateral()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public getTokenDetail = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            tokenId: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<[boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        > {
            assert.isBigNumber('tokenId', tokenId);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('getTokenDetail(uint256)', [tokenId
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('getTokenDetail(uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<[boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                tokenId: BigNumber,
            ): string {
            assert.isBigNumber('tokenId', tokenId);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('getTokenDetail(uint256)', [tokenId
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): ([boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('getTokenDetail(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<[boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): ([boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('getTokenDetail(uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<[boolean, string, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber, BigNumber]
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public mint = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            contractSize: BigNumber,
            duration: BigNumber,
            fixLegPayment: BigNumber,
            count: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isBigNumber('contractSize', contractSize);
        assert.isBigNumber('duration', duration);
        assert.isBigNumber('fixLegPayment', fixLegPayment);
        assert.isBigNumber('count', count);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('mint(uint256,uint64,uint256,uint256)', [contractSize,
    duration,
    fixLegPayment,
    count
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.mint.estimateGasAsync.bind(
                self,
                contractSize,
                duration,
                fixLegPayment,
                count
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            contractSize: BigNumber,
            duration: BigNumber,
            fixLegPayment: BigNumber,
            count: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isBigNumber('contractSize', contractSize);
        assert.isBigNumber('duration', duration);
        assert.isBigNumber('fixLegPayment', fixLegPayment);
        assert.isBigNumber('count', count);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.mint.sendTransactionAsync(contractSize,
    duration,
    fixLegPayment,
    count
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            contractSize: BigNumber,
            duration: BigNumber,
            fixLegPayment: BigNumber,
            count: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isBigNumber('contractSize', contractSize);
        assert.isBigNumber('duration', duration);
        assert.isBigNumber('fixLegPayment', fixLegPayment);
        assert.isBigNumber('count', count);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('mint(uint256,uint64,uint256,uint256)', [contractSize,
    duration,
    fixLegPayment,
    count
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            contractSize: BigNumber,
            duration: BigNumber,
            fixLegPayment: BigNumber,
            count: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isBigNumber('contractSize', contractSize);
            assert.isBigNumber('duration', duration);
            assert.isBigNumber('fixLegPayment', fixLegPayment);
            assert.isBigNumber('count', count);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('mint(uint256,uint64,uint256,uint256)', [contractSize,
        duration,
        fixLegPayment,
        count
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('mint(uint256,uint64,uint256,uint256)');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                contractSize: BigNumber,
                duration: BigNumber,
                fixLegPayment: BigNumber,
                count: BigNumber,
            ): string {
            assert.isBigNumber('contractSize', contractSize);
            assert.isBigNumber('duration', duration);
            assert.isBigNumber('fixLegPayment', fixLegPayment);
            assert.isBigNumber('count', count);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mint(uint256,uint64,uint256,uint256)', [contractSize,
        duration,
        fixLegPayment,
        count
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('mint(uint256,uint64,uint256,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('mint(uint256,uint64,uint256,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                contractSize: BigNumber,
                duration: BigNumber,
                fixLegPayment: BigNumber,
                count: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).mint.callAsync(
    contractSize,
    duration,
    fixLegPayment,
    count,
    txData,
            );
            const txHash =  await (this as any).mint.sendTransactionAsync(
    contractSize,
    duration,
    fixLegPayment,
    count,
    txData,
            ); 
            return txHash;
        }
    };
    public initialBuy = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            ids: BigNumber[],
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('initialBuy(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.initialBuy.estimateGasAsync.bind(
                self,
                ids
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            ids: BigNumber[],
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.initialBuy.sendTransactionAsync(ids
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('initialBuy(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            ids: BigNumber[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isArray('ids', ids);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('initialBuy(uint256[])', [ids
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('initialBuy(uint256[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                ids: BigNumber[],
            ): string {
            assert.isArray('ids', ids);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('initialBuy(uint256[])', [ids
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('initialBuy(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('initialBuy(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).initialBuy.callAsync(
    ids,
    txData,
            );
            const txHash =  await (this as any).initialBuy.sendTransactionAsync(
    ids,
    txData,
            ); 
            return txHash;
        }
    };
    public cancel = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            ids: BigNumber[],
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('cancel(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.cancel.estimateGasAsync.bind(
                self,
                ids
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            ids: BigNumber[],
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.cancel.sendTransactionAsync(ids
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('cancel(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            ids: BigNumber[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isArray('ids', ids);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('cancel(uint256[])', [ids
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('cancel(uint256[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                ids: BigNumber[],
            ): string {
            assert.isArray('ids', ids);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('cancel(uint256[])', [ids
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('cancel(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('cancel(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).cancel.callAsync(
    ids,
    txData,
            );
            const txHash =  await (this as any).cancel.sendTransactionAsync(
    ids,
    txData,
            ); 
            return txHash;
        }
    };
    public settle = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            ids: BigNumber[],
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('settle(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.settle.estimateGasAsync.bind(
                self,
                ids
            ),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
    
        const txHash = await self._web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        return txHash;
        },
        /**
         * Sends an Ethereum transaction and waits until the transaction has been successfully mined without reverting.
         * If the transaction was mined, but reverted, an error is thrown.
         * @param txData Additional data for transaction
         * @param pollingIntervalMs Interval at which to poll for success
         * @returns A promise that resolves when the transaction is successful
         */
        awaitTransactionSuccessAsync(
            ids: BigNumber[],
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const txHashPromise = self.settle.sendTransactionAsync(ids
    , txData);
        return new PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs>(
            txHashPromise,
            (async (): Promise<TransactionReceiptWithDecodedLogs> => {
                // When the transaction hash resolves, wait for it to be mined.
                return self._web3Wrapper.awaitTransactionSuccessAsync(
                    await txHashPromise,
                    pollingIntervalMs,
                    timeoutMs,
                );
            })(),
        );
        },
        /**
         * Estimates the gas cost of sending an Ethereum transaction calling this method with these arguments.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async estimateGasAsync(
            ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isArray('ids', ids);
        const self = this as any as Swap721Contract;
        const encodedData = self._strictEncodeArguments('settle(uint256[])', [ids
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
        );
        if (txDataWithDefaults.from !== undefined) {
            txDataWithDefaults.from = txDataWithDefaults.from.toLowerCase();
        }
        
        const gas = await self._web3Wrapper.estimateGasAsync(txDataWithDefaults);
        return gas;
        },
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            ids: BigNumber[],
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isArray('ids', ids);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as Swap721Contract;
            const encodedData = self._strictEncodeArguments('settle(uint256[])', [ids
        ]);
            const callDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
                {
                    to: self.address,
                    ...callData,
                    data: encodedData,
                },
                self._web3Wrapper.getContractDefaults(),
            );
            callDataWithDefaults.from = callDataWithDefaults.from ? callDataWithDefaults.from.toLowerCase() : callDataWithDefaults.from;
        
            const rawCallResult = await self._web3Wrapper.callAsync(callDataWithDefaults, defaultBlock);
            BaseContract._throwIfRevertWithReasonCallResult(rawCallResult);
            const abiEncoder = self._lookupAbiEncoder('settle(uint256[])');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<void
        >(rawCallResult);
            // tslint:enable boolean-naming
            return result;
        },
        /**
         * Returns the ABI encoded transaction data needed to send an Ethereum transaction calling this method. Before
         * sending the Ethereum tx, this encoded tx data can first be sent to a separate signing service or can be used
         * to create a 0x transaction (see protocol spec for more details).
         */
        getABIEncodedTransactionData(
                ids: BigNumber[],
            ): string {
            assert.isArray('ids', ids);
            const self = this as any as Swap721Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('settle(uint256[])', [ids
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('settle(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as Swap721Contract;
            const abiEncoder = self._lookupAbiEncoder('settle(uint256[])');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                ids: BigNumber[],
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).settle.callAsync(
    ids,
    txData,
            );
            const txHash =  await (this as any).settle.sendTransactionAsync(
    ids,
    txData,
            ); 
            return txHash;
        }
    };
private readonly _subscriptionManager: SubscriptionManager<Swap721EventArgs, Swap721Events>;
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            name: string,
            symbol: string,
            unit: string,
            ctype: string,
            oracleAddr: string,
            fixLegTokenAddr: string,
            collateralAddr: string,
    ): Promise<Swap721Contract> {
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        if (artifact.compilerOutput === undefined) {
            throw new Error('Compiler output not found in the artifact file');
        }
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const bytecode = artifact.compilerOutput.evm.bytecode.object;
        const abi = artifact.compilerOutput.abi;
        const logDecodeDependenciesAbiOnly: { [contractName: string]: ContractAbi } = {};
        if (Object.keys(logDecodeDependencies) !== undefined) {
            for (const key of Object.keys(logDecodeDependencies)) {
                logDecodeDependenciesAbiOnly[key] = logDecodeDependencies[key].compilerOutput.abi;
            }
        }
        return Swap721Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, name,
symbol,
unit,
ctype,
oracleAddr,
fixLegTokenAddr,
collateralAddr
);
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
            name: string,
            symbol: string,
            unit: string,
            ctype: string,
            oracleAddr: string,
            fixLegTokenAddr: string,
            collateralAddr: string,
    ): Promise<Swap721Contract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [name,
symbol,
unit,
ctype,
oracleAddr,
fixLegTokenAddr,
collateralAddr
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [name,
symbol,
unit,
ctype,
oracleAddr,
fixLegTokenAddr,
collateralAddr
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [name,
symbol,
unit,
ctype,
oracleAddr,
fixLegTokenAddr,
collateralAddr
]);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`Swap721 successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new Swap721Contract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [name,
symbol,
unit,
ctype,
oracleAddr,
fixLegTokenAddr,
collateralAddr
];
        return contractInstance;
    }


    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
            { 
                constant: true,
                inputs: [
                    {
                        name: 'interfaceId',
                        type: 'bytes4',
                    },
                ],
                name: 'supportsInterface',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'name',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'getApproved',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'addWhitelisted',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'removeWhitelisted',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'isWhitelisted',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                ],
                name: 'renounceWhitelistAdmin',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'contractUnit',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'ownerOf',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                    },
                ],
                name: 'balanceOf',
                outputs: [
                    {
                        name: '',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'addWhitelistAdmin',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'oracle',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'symbol',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'approved',
                        type: 'bool',
                    },
                ],
                name: 'setApprovalForAll',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                    {
                        name: '_data',
                        type: 'bytes',
                    },
                ],
                name: 'safeTransferFrom',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'isWhitelistAdmin',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'tokenURI',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'contractType',
                outputs: [
                    {
                        name: '',
                        type: 'string',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                ],
                name: 'renounceWhitelisted',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'fixLegToken',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        name: 'operator',
                        type: 'address',
                    },
                ],
                name: 'isApprovedForAll',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'floatingLegCollateral',
                outputs: [
                    {
                        name: '',
                        type: 'address',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                inputs: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'symbol',
                        type: 'string',
                    },
                    {
                        name: 'unit',
                        type: 'string',
                    },
                    {
                        name: 'ctype',
                        type: 'string',
                    },
                    {
                        name: 'oracleAddr',
                        type: 'address',
                    },
                    {
                        name: 'fixLegTokenAddr',
                        type: 'address',
                    },
                    {
                        name: 'collateralAddr',
                        type: 'address',
                    },
                ],
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'constructor',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'issuer',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Minted',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'buyer',
                        type: 'address',
                        indexed: false,
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Bought',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'fixLegPayout',
                        type: 'uint256',
                        indexed: false,
                    },
                    {
                        name: 'floatingLegPayout',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Settled',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Canceled',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Terminated',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'WhitelistedAdded',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'WhitelistedRemoved',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'WhitelistAdminAdded',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'account',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'WhitelistAdminRemoved',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'from',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'to',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: true,
                    },
                ],
                name: 'Transfer',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'approved',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'tokenId',
                        type: 'uint256',
                        indexed: true,
                    },
                ],
                name: 'Approval',
                outputs: [
                ],
                type: 'event',
            },
            { 
                anonymous: false,
                inputs: [
                    {
                        name: 'owner',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'operator',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'approved',
                        type: 'bool',
                        indexed: false,
                    },
                ],
                name: 'ApprovalForAll',
                outputs: [
                ],
                type: 'event',
            },
            { 
                constant: true,
                inputs: [
                    {
                        name: 'tokenId',
                        type: 'uint256',
                    },
                ],
                name: 'getTokenDetail',
                outputs: [
                    {
                        name: 'terminated',
                        type: 'bool',
                    },
                    {
                        name: 'issuer',
                        type: 'address',
                    },
                    {
                        name: 'contractSize',
                        type: 'uint256',
                    },
                    {
                        name: 'fixLegPayoutPerDay',
                        type: 'uint256',
                    },
                    {
                        name: 'startTime',
                        type: 'uint64',
                    },
                    {
                        name: 'endTime',
                        type: 'uint64',
                    },
                    {
                        name: 'lastSettleTime',
                        type: 'uint64',
                    },
                    {
                        name: 'margin',
                        type: 'uint256',
                    },
                    {
                        name: 'totalFixLegPaid',
                        type: 'uint256',
                    },
                    {
                        name: 'totalFloatingLegPaid',
                        type: 'uint256',
                    },
                    {
                        name: 'price',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'contractSize',
                        type: 'uint256',
                    },
                    {
                        name: 'duration',
                        type: 'uint64',
                    },
                    {
                        name: 'fixLegPayment',
                        type: 'uint256',
                    },
                    {
                        name: 'count',
                        type: 'uint256',
                    },
                ],
                name: 'mint',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'ids',
                        type: 'uint256[]',
                    },
                ],
                name: 'initialBuy',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'ids',
                        type: 'uint256[]',
                    },
                ],
                name: 'cancel',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: false,
                inputs: [
                    {
                        name: 'ids',
                        type: 'uint256[]',
                    },
                ],
                name: 'settle',
                outputs: [
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ] as ContractAbi;
        return abi;
    }
    /**
     * Subscribe to an event type emitted by the Swap721 contract.
     * @param eventName The Swap721 contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    public subscribe<ArgsType extends Swap721EventArgs>(
        eventName: Swap721Events,
        indexFilterValues: IndexedFilterValues,
        callback: EventCallback<ArgsType>,
        isVerbose: boolean = false,
        blockPollingIntervalMs?: number,
    ): string {
        assert.doesBelongToStringEnum('eventName', eventName, Swap721Events);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe<ArgsType>(
            this.address,
            eventName,
            indexFilterValues,
            Swap721Contract.ABI(),
            callback,
            isVerbose,
            blockPollingIntervalMs,
        );
        return subscriptionToken;
    }
    /**
     * Cancel a subscription
     * @param subscriptionToken Subscription token returned by `subscribe()`
     */
    public unsubscribe(subscriptionToken: string): void {
        this._subscriptionManager.unsubscribe(subscriptionToken);
    }
    /**
     * Cancels all existing subscriptions
     */
    public unsubscribeAll(): void {
        this._subscriptionManager.unsubscribeAll();
    }
    /**
     * Gets historical logs without creating a subscription
     * @param eventName The Swap721 contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    public async getLogsAsync<ArgsType extends Swap721EventArgs>(
        eventName: Swap721Events,
        blockRange: BlockRange,
        indexFilterValues: IndexedFilterValues,
    ): Promise<Array<LogWithDecodedArgs<ArgsType>>> {
        assert.doesBelongToStringEnum('eventName', eventName, Swap721Events);
        assert.doesConformToSchema('blockRange', blockRange, schemas.blockRangeSchema);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync<ArgsType>(
            this.address,
            eventName,
            blockRange,
            indexFilterValues,
            Swap721Contract.ABI(),
        );
        return logs;
    }
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: { [contractName: string]: ContractAbi }) {
        super('Swap721', Swap721Contract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new SubscriptionManager<Swap721EventArgs, Swap721Events>(
            Swap721Contract.ABI(),
            this._web3Wrapper,
        );
    }
} 

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
