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

export type OracleEventArgs =
    | OracleWhitelistedAddedEventArgs
    | OracleWhitelistedRemovedEventArgs
    | OracleWhitelistAdminAddedEventArgs
    | OracleWhitelistAdminRemovedEventArgs;

export enum OracleEvents {
    WhitelistedAdded = 'WhitelistedAdded',
    WhitelistedRemoved = 'WhitelistedRemoved',
    WhitelistAdminAdded = 'WhitelistAdminAdded',
    WhitelistAdminRemoved = 'WhitelistAdminRemoved',
}

export interface OracleWhitelistedAddedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface OracleWhitelistedRemovedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface OracleWhitelistAdminAddedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface OracleWhitelistAdminRemovedEventArgs extends DecodedLogArgs {
    account: string;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class OracleContract extends BaseContract {
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('removeWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isWhitelisted(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelisted(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceWhitelistAdmin()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isWhitelistAdmin(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('isWhitelistAdmin(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
        const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceWhitelisted()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
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
            const self = this as any as OracleContract;
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
    public appendOracleData = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            _ts: BigNumber,
            _profit: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isBigNumber('_ts', _ts);
        assert.isBigNumber('_profit', _profit);
        const self = this as any as OracleContract;
        const encodedData = self._strictEncodeArguments('appendOracleData(uint64,uint64)', [_ts,
    _profit
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.appendOracleData.estimateGasAsync.bind(
                self,
                _ts,
                _profit
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
            _ts: BigNumber,
            _profit: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isBigNumber('_ts', _ts);
        assert.isBigNumber('_profit', _profit);
        const self = this as any as OracleContract;
        const txHashPromise = self.appendOracleData.sendTransactionAsync(_ts,
    _profit
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
            _ts: BigNumber,
            _profit: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isBigNumber('_ts', _ts);
        assert.isBigNumber('_profit', _profit);
        const self = this as any as OracleContract;
        const encodedData = self._strictEncodeArguments('appendOracleData(uint64,uint64)', [_ts,
    _profit
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
            _ts: BigNumber,
            _profit: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<void
        > {
            assert.isBigNumber('_ts', _ts);
            assert.isBigNumber('_profit', _profit);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as OracleContract;
            const encodedData = self._strictEncodeArguments('appendOracleData(uint64,uint64)', [_ts,
        _profit
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
            const abiEncoder = self._lookupAbiEncoder('appendOracleData(uint64,uint64)');
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
                _ts: BigNumber,
                _profit: BigNumber,
            ): string {
            assert.isBigNumber('_ts', _ts);
            assert.isBigNumber('_profit', _profit);
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('appendOracleData(uint64,uint64)', [_ts,
        _profit
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('appendOracleData(uint64,uint64)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('appendOracleData(uint64,uint64)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                _ts: BigNumber,
                _profit: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).appendOracleData.callAsync(
    _ts,
    _profit,
    txData,
            );
            const txHash =  await (this as any).appendOracleData.sendTransactionAsync(
    _ts,
    _profit,
    txData,
            ); 
            return txHash;
        }
    };
    public computeProfit = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            start: BigNumber,
            end: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            assert.isBigNumber('start', start);
            assert.isBigNumber('end', end);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as OracleContract;
            const encodedData = self._strictEncodeArguments('computeProfit(uint64,uint64)', [start,
        end
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
            const abiEncoder = self._lookupAbiEncoder('computeProfit(uint64,uint64)');
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
                start: BigNumber,
                end: BigNumber,
            ): string {
            assert.isBigNumber('start', start);
            assert.isBigNumber('end', end);
            const self = this as any as OracleContract;
            const abiEncodedTransactionData = self._strictEncodeArguments('computeProfit(uint64,uint64)', [start,
        end
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (BigNumber
        ) {
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('computeProfit(uint64,uint64)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<BigNumber
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (BigNumber
        ) {
            const self = this as any as OracleContract;
            const abiEncoder = self._lookupAbiEncoder('computeProfit(uint64,uint64)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
        >(returnData);
            return abiDecodedReturnData;
        },
    };
private readonly _subscriptionManager: SubscriptionManager<OracleEventArgs, OracleEvents>;
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
    ): Promise<OracleContract> {
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
        return OracleContract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, );
    }
    public static async deployAsync(
        bytecode: string,
        abi: ContractAbi,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: ContractAbi },
    ): Promise<OracleContract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, []);
        const web3Wrapper = new Web3Wrapper(provider);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {data: txData},
            txDefaults,
            web3Wrapper.estimateGasAsync.bind(web3Wrapper),
        );
        const txHash = await web3Wrapper.sendTransactionAsync(txDataWithDefaults);
        logUtils.log(`transactionHash: ${txHash}`);
        const txReceipt = await web3Wrapper.awaitTransactionSuccessAsync(txHash);
        logUtils.log(`Oracle successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new OracleContract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [];
        return contractInstance;
    }


    /**
     * @returns      The contract ABI
     */
    public static ABI(): ContractAbi {
        const abi = [
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
                ],
                name: 'renounceWhitelistAdmin',
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
                inputs: [
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
                constant: false,
                inputs: [
                    {
                        name: '_ts',
                        type: 'uint64',
                    },
                    {
                        name: '_profit',
                        type: 'uint64',
                    },
                ],
                name: 'appendOracleData',
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
                        name: 'start',
                        type: 'uint64',
                    },
                    {
                        name: 'end',
                        type: 'uint64',
                    },
                ],
                name: 'computeProfit',
                outputs: [
                    {
                        name: 'profit',
                        type: 'uint256',
                    },
                ],
                payable: false,
                stateMutability: 'view',
                type: 'function',
            },
        ] as ContractAbi;
        return abi;
    }
    /**
     * Subscribe to an event type emitted by the Oracle contract.
     * @param eventName The Oracle contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    public subscribe<ArgsType extends OracleEventArgs>(
        eventName: OracleEvents,
        indexFilterValues: IndexedFilterValues,
        callback: EventCallback<ArgsType>,
        isVerbose: boolean = false,
        blockPollingIntervalMs?: number,
    ): string {
        assert.doesBelongToStringEnum('eventName', eventName, OracleEvents);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe<ArgsType>(
            this.address,
            eventName,
            indexFilterValues,
            OracleContract.ABI(),
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
     * @param eventName The Oracle contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    public async getLogsAsync<ArgsType extends OracleEventArgs>(
        eventName: OracleEvents,
        blockRange: BlockRange,
        indexFilterValues: IndexedFilterValues,
    ): Promise<Array<LogWithDecodedArgs<ArgsType>>> {
        assert.doesBelongToStringEnum('eventName', eventName, OracleEvents);
        assert.doesConformToSchema('blockRange', blockRange, schemas.blockRangeSchema);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync<ArgsType>(
            this.address,
            eventName,
            blockRange,
            indexFilterValues,
            OracleContract.ABI(),
        );
        return logs;
    }
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: { [contractName: string]: ContractAbi }) {
        super('Oracle', OracleContract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new SubscriptionManager<OracleEventArgs, OracleEvents>(
            OracleContract.ABI(),
            this._web3Wrapper,
        );
    }
} 

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
