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

export type TestERC20EventArgs =
    | TestERC20MinterAddedEventArgs
    | TestERC20MinterRemovedEventArgs
    | TestERC20TransferEventArgs
    | TestERC20ApprovalEventArgs;

export enum TestERC20Events {
    MinterAdded = 'MinterAdded',
    MinterRemoved = 'MinterRemoved',
    Transfer = 'Transfer',
    Approval = 'Approval',
}

export interface TestERC20MinterAddedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface TestERC20MinterRemovedEventArgs extends DecodedLogArgs {
    account: string;
}

export interface TestERC20TransferEventArgs extends DecodedLogArgs {
    from: string;
    to: string;
    value: BigNumber;
}

export interface TestERC20ApprovalEventArgs extends DecodedLogArgs {
    owner: string;
    spender: string;
    value: BigNumber;
}


/* istanbul ignore next */
// tslint:disable:no-parameter-reassignment
// tslint:disable-next-line:class-name
export class TestERC20Contract extends BaseContract {
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
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('name()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('name()');
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
            spender: string,
            value: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('spender', spender);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender.toLowerCase(),
    value
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
                spender.toLowerCase(),
                value
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
            spender: string,
            value: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('spender', spender);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.approve.sendTransactionAsync(spender.toLowerCase(),
    value
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
            spender: string,
            value: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('spender', spender);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender.toLowerCase(),
    value
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
            spender: string,
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('spender', spender);
            assert.isBigNumber('value', value);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('approve(address,uint256)', [spender.toLowerCase(),
        value
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
                spender: string,
                value: BigNumber,
            ): string {
            assert.isString('spender', spender);
            assert.isBigNumber('value', value);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('approve(address,uint256)', [spender.toLowerCase(),
        value
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('approve(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                spender: string,
                value: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).approve.callAsync(
    spender,
    value,
    txData,
            );
            const txHash =  await (this as any).approve.sendTransactionAsync(
    spender,
    value,
    txData,
            ); 
            return txHash;
        }
    };
    public totalSupply = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('totalSupply()', []);
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
            const abiEncoder = self._lookupAbiEncoder('totalSupply()');
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
            ): string {
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('totalSupply()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (BigNumber
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('totalSupply()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<BigNumber
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (BigNumber
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('totalSupply()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
        >(returnData);
            return abiDecodedReturnData;
        },
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
            value: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    value
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
                value
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
            value: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.transferFrom.sendTransactionAsync(from.toLowerCase(),
    to.toLowerCase(),
    value
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
            value: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('from', from);
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
    to.toLowerCase(),
    value
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
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        value
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
                from: string,
                to: string,
                value: BigNumber,
            ): string {
            assert.isString('from', from);
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transferFrom(address,address,uint256)', [from.toLowerCase(),
        to.toLowerCase(),
        value
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('transferFrom(address,address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                from: string,
                to: string,
                value: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).transferFrom.callAsync(
    from,
    to,
    value,
    txData,
            );
            const txHash =  await (this as any).transferFrom.sendTransactionAsync(
    from,
    to,
    value,
    txData,
            ); 
            return txHash;
        }
    };
    public decimals = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<number
        > {
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('decimals()', []);
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
            const abiEncoder = self._lookupAbiEncoder('decimals()');
            // tslint:disable boolean-naming
            const result = abiEncoder.strictDecodeReturnValue<number
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('decimals()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (number
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('decimals()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<number
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (number
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('decimals()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<number
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public increaseAllowance = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            spender: string,
            addedValue: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('spender', spender);
        assert.isBigNumber('addedValue', addedValue);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender.toLowerCase(),
    addedValue
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.increaseAllowance.estimateGasAsync.bind(
                self,
                spender.toLowerCase(),
                addedValue
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
            spender: string,
            addedValue: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('spender', spender);
        assert.isBigNumber('addedValue', addedValue);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.increaseAllowance.sendTransactionAsync(spender.toLowerCase(),
    addedValue
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
            spender: string,
            addedValue: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('spender', spender);
        assert.isBigNumber('addedValue', addedValue);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender.toLowerCase(),
    addedValue
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
            spender: string,
            addedValue: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('spender', spender);
            assert.isBigNumber('addedValue', addedValue);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender.toLowerCase(),
        addedValue
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
            const abiEncoder = self._lookupAbiEncoder('increaseAllowance(address,uint256)');
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
                spender: string,
                addedValue: BigNumber,
            ): string {
            assert.isString('spender', spender);
            assert.isBigNumber('addedValue', addedValue);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('increaseAllowance(address,uint256)', [spender.toLowerCase(),
        addedValue
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('increaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('increaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                spender: string,
                addedValue: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).increaseAllowance.callAsync(
    spender,
    addedValue,
    txData,
            );
            const txHash =  await (this as any).increaseAllowance.sendTransactionAsync(
    spender,
    addedValue,
    txData,
            ); 
            return txHash;
        }
    };
    public mint = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            to: string,
            value: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('mint(address,uint256)', [to.toLowerCase(),
    value
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
                to.toLowerCase(),
                value
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
            value: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.mint.sendTransactionAsync(to.toLowerCase(),
    value
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
            value: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('mint(address,uint256)', [to.toLowerCase(),
    value
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
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('mint(address,uint256)', [to.toLowerCase(),
        value
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
            const abiEncoder = self._lookupAbiEncoder('mint(address,uint256)');
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
                to: string,
                value: BigNumber,
            ): string {
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('mint(address,uint256)', [to.toLowerCase(),
        value
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('mint(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('mint(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                to: string,
                value: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).mint.callAsync(
    to,
    value,
    txData,
            );
            const txHash =  await (this as any).mint.sendTransactionAsync(
    to,
    value,
    txData,
            ); 
            return txHash;
        }
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
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('balanceOf(address)', [owner.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (BigNumber
        ) {
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('balanceOf(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
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
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('symbol()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (string
        ) {
            const self = this as any as TestERC20Contract;
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
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('symbol()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<string
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public addMinter = {
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
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('addMinter(address)', [account.toLowerCase()
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.addMinter.estimateGasAsync.bind(
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
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.addMinter.sendTransactionAsync(account.toLowerCase()
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
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('addMinter(address)', [account.toLowerCase()
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
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('addMinter(address)', [account.toLowerCase()
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
            const abiEncoder = self._lookupAbiEncoder('addMinter(address)');
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('addMinter(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('addMinter(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('addMinter(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                account: string,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).addMinter.callAsync(
    account,
    txData,
            );
            const txHash =  await (this as any).addMinter.sendTransactionAsync(
    account,
    txData,
            ); 
            return txHash;
        }
    };
    public renounceMinter = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('renounceMinter()', []);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.renounceMinter.estimateGasAsync.bind(
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
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.renounceMinter.sendTransactionAsync(txData);
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
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('renounceMinter()', []);
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
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('renounceMinter()', []);
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
            const abiEncoder = self._lookupAbiEncoder('renounceMinter()');
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('renounceMinter()', []);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (void
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceMinter()');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<void
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (void
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('renounceMinter()');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<void
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).renounceMinter.callAsync(
    txData,
            );
            const txHash =  await (this as any).renounceMinter.sendTransactionAsync(
    txData,
            ); 
            return txHash;
        }
    };
    public decreaseAllowance = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            spender: string,
            subtractedValue: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('spender', spender);
        assert.isBigNumber('subtractedValue', subtractedValue);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender.toLowerCase(),
    subtractedValue
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.decreaseAllowance.estimateGasAsync.bind(
                self,
                spender.toLowerCase(),
                subtractedValue
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
            spender: string,
            subtractedValue: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('spender', spender);
        assert.isBigNumber('subtractedValue', subtractedValue);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.decreaseAllowance.sendTransactionAsync(spender.toLowerCase(),
    subtractedValue
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
            spender: string,
            subtractedValue: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('spender', spender);
        assert.isBigNumber('subtractedValue', subtractedValue);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender.toLowerCase(),
    subtractedValue
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
            spender: string,
            subtractedValue: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('spender', spender);
            assert.isBigNumber('subtractedValue', subtractedValue);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender.toLowerCase(),
        subtractedValue
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
            const abiEncoder = self._lookupAbiEncoder('decreaseAllowance(address,uint256)');
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
                spender: string,
                subtractedValue: BigNumber,
            ): string {
            assert.isString('spender', spender);
            assert.isBigNumber('subtractedValue', subtractedValue);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('decreaseAllowance(address,uint256)', [spender.toLowerCase(),
        subtractedValue
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('decreaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('decreaseAllowance(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                spender: string,
                subtractedValue: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).decreaseAllowance.callAsync(
    spender,
    subtractedValue,
    txData,
            );
            const txHash =  await (this as any).decreaseAllowance.sendTransactionAsync(
    spender,
    subtractedValue,
    txData,
            ); 
            return txHash;
        }
    };
    public transfer = {
        /**
         * Sends an Ethereum transaction executing this method with the supplied parameters. This is a read/write
         * Ethereum operation and will cost gas.
         * @param txData Additional data for transaction
         * @returns The hash of the transaction
         */
        async sendTransactionAsync(
            to: string,
            value: BigNumber,
        txData?: Partial<TxData> | undefined,
        ): Promise<string> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [to.toLowerCase(),
    value
    ]);
        const txDataWithDefaults = await BaseContract._applyDefaultsToTxDataAsync(
            {
                to: self.address,
                ...txData,
                data: encodedData,
            },
            self._web3Wrapper.getContractDefaults(),
            self.transfer.estimateGasAsync.bind(
                self,
                to.toLowerCase(),
                value
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
            value: BigNumber,
            txData?: Partial<TxData>,
            pollingIntervalMs?: number,
            timeoutMs?: number,
        ): PromiseWithTransactionHash<TransactionReceiptWithDecodedLogs> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const txHashPromise = self.transfer.sendTransactionAsync(to.toLowerCase(),
    value
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
            value: BigNumber,
            txData?: Partial<TxData> | undefined,
        ): Promise<number> {
        assert.isString('to', to);
        assert.isBigNumber('value', value);
        const self = this as any as TestERC20Contract;
        const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [to.toLowerCase(),
    value
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
            value: BigNumber,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<boolean
        > {
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('transfer(address,uint256)', [to.toLowerCase(),
        value
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
            const abiEncoder = self._lookupAbiEncoder('transfer(address,uint256)');
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
                to: string,
                value: BigNumber,
            ): string {
            assert.isString('to', to);
            assert.isBigNumber('value', value);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('transfer(address,uint256)', [to.toLowerCase(),
        value
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('transfer(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('transfer(address,uint256)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
        async validateAndSendTransactionAsync(
                to: string,
                value: BigNumber,
            txData?: Partial<TxData> | undefined,
            ): Promise<string> {
            await (this as any).transfer.callAsync(
    to,
    value,
    txData,
            );
            const txHash =  await (this as any).transfer.sendTransactionAsync(
    to,
    value,
    txData,
            ); 
            return txHash;
        }
    };
    public isMinter = {
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
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('isMinter(address)', [account.toLowerCase()
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
            const abiEncoder = self._lookupAbiEncoder('isMinter(address)');
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
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('isMinter(address)', [account.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('isMinter(address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<boolean
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (boolean
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('isMinter(address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<boolean
        >(returnData);
            return abiDecodedReturnData;
        },
    };
    public allowance = {
        /**
         * Sends a read-only call to the contract method. Returns the result that would happen if one were to send an 
         * Ethereum transaction to this method, given the current state of the blockchain. Calls do not cost gas
         * since they don't modify state.
         */
        async callAsync(
            owner: string,
            spender: string,
            callData: Partial<CallData> = {},
            defaultBlock?: BlockParam,
        ): Promise<BigNumber
        > {
            assert.isString('owner', owner);
            assert.isString('spender', spender);
            assert.doesConformToSchema('callData', callData, schemas.callDataSchema, [
                schemas.addressSchema,
                schemas.numberSchema,
                schemas.jsNumber,
            ]);
            if (defaultBlock !== undefined) {
                assert.isBlockParam('defaultBlock', defaultBlock);
            }
            const self = this as any as TestERC20Contract;
            const encodedData = self._strictEncodeArguments('allowance(address,address)', [owner.toLowerCase(),
        spender.toLowerCase()
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
            const abiEncoder = self._lookupAbiEncoder('allowance(address,address)');
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
                spender: string,
            ): string {
            assert.isString('owner', owner);
            assert.isString('spender', spender);
            const self = this as any as TestERC20Contract;
            const abiEncodedTransactionData = self._strictEncodeArguments('allowance(address,address)', [owner.toLowerCase(),
        spender.toLowerCase()
        ]);
            return abiEncodedTransactionData;
        },
        getABIDecodedTransactionData(
            callData: string
        ): (BigNumber
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('allowance(address,address)');
            // tslint:disable boolean-naming
            const abiDecodedCallData = abiEncoder.strictDecode<BigNumber
        >(callData);
            return abiDecodedCallData;
        },
        getABIDecodedReturnData(
            returnData: string
        ): (BigNumber
        ) {
            const self = this as any as TestERC20Contract;
            const abiEncoder = self._lookupAbiEncoder('allowance(address,address)');
            // tslint:disable boolean-naming
            const abiDecodedReturnData = abiEncoder.strictDecodeReturnValue<BigNumber
        >(returnData);
            return abiDecodedReturnData;
        },
    };
private readonly _subscriptionManager: SubscriptionManager<TestERC20EventArgs, TestERC20Events>;
public static async deployFrom0xArtifactAsync(
        artifact: ContractArtifact | SimpleContractArtifact,
        supportedProvider: SupportedProvider,
        txDefaults: Partial<TxData>,
        logDecodeDependencies: { [contractName: string]: (ContractArtifact | SimpleContractArtifact) },
            name: string,
            symbol: string,
    ): Promise<TestERC20Contract> {
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
        return TestERC20Contract.deployAsync(bytecode, abi, provider, txDefaults, logDecodeDependenciesAbiOnly, name,
symbol
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
    ): Promise<TestERC20Contract> {
        assert.isHexString('bytecode', bytecode);
        assert.doesConformToSchema('txDefaults', txDefaults, schemas.txDataSchema, [
            schemas.addressSchema,
            schemas.numberSchema,
            schemas.jsNumber,
        ]);
        const provider = providerUtils.standardizeOrThrow(supportedProvider);
        const constructorAbi = BaseContract._lookupConstructorAbi(abi);
        [name,
symbol
] = BaseContract._formatABIDataItemList(
            constructorAbi.inputs,
            [name,
symbol
],
            BaseContract._bigNumberToString,
        );
        const iface = new ethers.utils.Interface(abi);
        const deployInfo = iface.deployFunction;
        const txData = deployInfo.encode(bytecode, [name,
symbol
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
        logUtils.log(`TestERC20 successfully deployed at ${txReceipt.contractAddress}`);
        const contractInstance = new TestERC20Contract(txReceipt.contractAddress as string, provider, txDefaults, logDecodeDependencies);
        contractInstance.constructorArgs = [name,
symbol
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
                constant: false,
                inputs: [
                    {
                        name: 'spender',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'approve',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'totalSupply',
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
                        name: 'from',
                        type: 'address',
                    },
                    {
                        name: 'to',
                        type: 'address',
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'transferFrom',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
                type: 'function',
            },
            { 
                constant: true,
                inputs: [
                ],
                name: 'decimals',
                outputs: [
                    {
                        name: '',
                        type: 'uint8',
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
                        name: 'spender',
                        type: 'address',
                    },
                    {
                        name: 'addedValue',
                        type: 'uint256',
                    },
                ],
                name: 'increaseAllowance',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
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
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'mint',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
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
                        name: 'account',
                        type: 'address',
                    },
                ],
                name: 'addMinter',
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
                name: 'renounceMinter',
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
                        name: 'spender',
                        type: 'address',
                    },
                    {
                        name: 'subtractedValue',
                        type: 'uint256',
                    },
                ],
                name: 'decreaseAllowance',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
                ],
                payable: false,
                stateMutability: 'nonpayable',
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
                        name: 'value',
                        type: 'uint256',
                    },
                ],
                name: 'transfer',
                outputs: [
                    {
                        name: '',
                        type: 'bool',
                    },
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
                name: 'isMinter',
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
                        name: 'owner',
                        type: 'address',
                    },
                    {
                        name: 'spender',
                        type: 'address',
                    },
                ],
                name: 'allowance',
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
                inputs: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'symbol',
                        type: 'string',
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
                        name: 'account',
                        type: 'address',
                        indexed: true,
                    },
                ],
                name: 'MinterAdded',
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
                name: 'MinterRemoved',
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
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
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
                        name: 'spender',
                        type: 'address',
                        indexed: true,
                    },
                    {
                        name: 'value',
                        type: 'uint256',
                        indexed: false,
                    },
                ],
                name: 'Approval',
                outputs: [
                ],
                type: 'event',
            },
        ] as ContractAbi;
        return abi;
    }
    /**
     * Subscribe to an event type emitted by the TestERC20 contract.
     * @param eventName The TestERC20 contract event you would like to subscribe to.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{maker: aUserAddressHex}`
     * @param callback Callback that gets called when a log is added/removed
     * @param isVerbose Enable verbose subscription warnings (e.g recoverable network issues encountered)
     * @return Subscription token used later to unsubscribe
     */
    public subscribe<ArgsType extends TestERC20EventArgs>(
        eventName: TestERC20Events,
        indexFilterValues: IndexedFilterValues,
        callback: EventCallback<ArgsType>,
        isVerbose: boolean = false,
        blockPollingIntervalMs?: number,
    ): string {
        assert.doesBelongToStringEnum('eventName', eventName, TestERC20Events);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        assert.isFunction('callback', callback);
        const subscriptionToken = this._subscriptionManager.subscribe<ArgsType>(
            this.address,
            eventName,
            indexFilterValues,
            TestERC20Contract.ABI(),
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
     * @param eventName The TestERC20 contract event you would like to subscribe to.
     * @param blockRange Block range to get logs from.
     * @param indexFilterValues An object where the keys are indexed args returned by the event and
     * the value is the value you are interested in. E.g `{_from: aUserAddressHex}`
     * @return Array of logs that match the parameters
     */
    public async getLogsAsync<ArgsType extends TestERC20EventArgs>(
        eventName: TestERC20Events,
        blockRange: BlockRange,
        indexFilterValues: IndexedFilterValues,
    ): Promise<Array<LogWithDecodedArgs<ArgsType>>> {
        assert.doesBelongToStringEnum('eventName', eventName, TestERC20Events);
        assert.doesConformToSchema('blockRange', blockRange, schemas.blockRangeSchema);
        assert.doesConformToSchema('indexFilterValues', indexFilterValues, schemas.indexFilterValuesSchema);
        const logs = await this._subscriptionManager.getLogsAsync<ArgsType>(
            this.address,
            eventName,
            blockRange,
            indexFilterValues,
            TestERC20Contract.ABI(),
        );
        return logs;
    }
    constructor(address: string, supportedProvider: SupportedProvider, txDefaults?: Partial<TxData>, logDecodeDependencies?: { [contractName: string]: ContractAbi }) {
        super('TestERC20', TestERC20Contract.ABI(), address, supportedProvider, txDefaults, logDecodeDependencies);
        classUtils.bindAll(this, ['_abiEncoderByFunctionSignature', 'address', '_web3Wrapper']);
        this._subscriptionManager = new SubscriptionManager<TestERC20EventArgs, TestERC20Events>(
            TestERC20Contract.ABI(),
            this._web3Wrapper,
        );
    }
} 

// tslint:disable:max-file-line-count
// tslint:enable:no-unbound-method no-parameter-reassignment no-consecutive-blank-lines ordered-imports align
// tslint:enable:trailing-comma whitespace no-trailing-whitespace
