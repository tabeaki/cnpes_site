export const setting = {
    CONTRACT_ADDRESS: "0x57809B032e5883B4B3E774623c99B984A28e7fb1",
    CAHINID: '0x1',
    DECIMALS: 1,
    CHAIN_NAME: 'ETH',
    COIN_NAME: 'ETH',
    RPC_URLS: "https://mainnet.infura.io/v3/d9a8d8a693da47db8cc8397ff08f9021",
    TOKEN_PRICE: '0.001',
    ABI: [
        'function totalSupply() public view virtual override returns (uint256)',
        'function getConsumedAllocation(address target) external view virtual returns(uint16)',
        'function mintAllLimits(uint256 amount, bytes32[] memory proof, uint256 allocation) public payable',
    ],
}