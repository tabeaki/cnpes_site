export const setting = {
    CONTRACT_ADDRESS: "0xbe9Cc555c5B2Fc46024587F10c5Fc509159B9BB5",
    CAHINID: '0x5',
    DECIMALS: 5,
    CHAIN_NAME: 'Goerli',
    COIN_NAME: 'ETH',
    RPC_URLS: "https://goerli.infura.io/v3/d9a8d8a693da47db8cc8397ff08f9021",
    TOKEN_PRICE: '0.001',
    ABI: [
        'function totalSupply() public view virtual override returns (uint256)',
        'function getConsumedAllocation(address target) external view virtual returns(uint16)',
        'function mintAllLimits(uint256 amount, bytes32[] memory proof, uint256 allocation) public payable',
    ],
}