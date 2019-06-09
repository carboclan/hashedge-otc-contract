import _ from 'lodash';
import { CollateralContract, CollateralEvents } from './generated-wrappers/collateral';
import { OracleContract, OracleEvents } from './generated-wrappers/oracle';
import { Swap721Contract, Swap721Events } from './generated-wrappers/swap721';
import { TestERC20Contract, TestERC20Events } from './generated-wrappers/test_erc20';

function abiToObj(ContractClass, abiDesc, provider) {
    return _.chain(abiDesc)
        .map((abi, address) => [address, new ContractClass(abi, address, provider)])
        .fromPairs()
        .value()
}

export {
    CollateralEvents, OracleEvents, Swap721Events, TestERC20Events,
    CollateralContract, OracleContract, Swap721Contract, TestERC20Contract
};

export function getWrappers(abi, provider) {
    return {
        erc20Tokens: abiToObj(TestERC20Contract, abi.erc20Tokens, provider),
        collaterals: abiToObj(CollateralContract, abi.collaterals, provider),
        oracles: abiToObj(OracleContract, abi.oracles, provider),
        swap721Tokens: abiToObj(Swap721Contract, abi.swap721Tokens, provider)
    };
}
