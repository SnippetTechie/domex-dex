// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title FTSOPriceReader
 * @notice A simple contract to read price feeds from Flare's FTSO v2 on Coston2 Testnet
 * @dev Uses the FtsoV2 contract directly at the known Coston2 address
 */

interface IFtsoV2 {
    /// @notice Returns stored data of a feed (FREE, no fee required for stored data)
    function getFeedById(bytes21 _feedId) external view returns (uint256 _value, int8 _decimals, uint64 _timestamp);
}

contract FTSOPriceReader {
    // FtsoV2 address on Coston2 Testnet
    address public constant FTSO_V2_ADDRESS = 0x3d893C53D9e8056135C26C8c638B76C8b60Df726;
    
    // Feed IDs for crypto/USD pairs (Category 01 = Crypto)
    bytes21 public constant BTC_USD_FEED_ID = bytes21(0x014254432f55534400000000000000000000000000);
    bytes21 public constant ETH_USD_FEED_ID = bytes21(0x014554482f55534400000000000000000000000000);
    bytes21 public constant XRP_USD_FEED_ID = bytes21(0x015852502f55534400000000000000000000000000);
    bytes21 public constant FLR_USD_FEED_ID = bytes21(0x01464c522f55534400000000000000000000000000);
    
    IFtsoV2 private immutable ftsoV2;
    
    constructor() {
        ftsoV2 = IFtsoV2(FTSO_V2_ADDRESS);
    }
    
    /**
     * @notice Get BTC/USD price - VIEW function (free call)
     */
    function getBtcUsdPrice() external view returns (uint256 value, int8 decimals, uint64 timestamp) {
        return ftsoV2.getFeedById(BTC_USD_FEED_ID);
    }
    
    /**
     * @notice Get ETH/USD price - VIEW function (free call)
     */
    function getEthUsdPrice() external view returns (uint256 value, int8 decimals, uint64 timestamp) {
        return ftsoV2.getFeedById(ETH_USD_FEED_ID);
    }
    
    /**
     * @notice Get XRP/USD price - VIEW function (free call)
     */
    function getXrpUsdPrice() external view returns (uint256 value, int8 decimals, uint64 timestamp) {
        return ftsoV2.getFeedById(XRP_USD_FEED_ID);
    }
    
    /**
     * @notice Get FLR/USD price - VIEW function (free call)
     */
    function getFlrUsdPrice() external view returns (uint256 value, int8 decimals, uint64 timestamp) {
        return ftsoV2.getFeedById(FLR_USD_FEED_ID);
    }
    
    /**
     * @notice Get all prices at once
     */
    function getAllPrices() external view returns (
        uint256 btcValue, int8 btcDecimals, uint64 btcTimestamp,
        uint256 ethValue, int8 ethDecimals, uint64 ethTimestamp,
        uint256 xrpValue, int8 xrpDecimals, uint64 xrpTimestamp,
        uint256 flrValue, int8 flrDecimals, uint64 flrTimestamp
    ) {
        (btcValue, btcDecimals, btcTimestamp) = ftsoV2.getFeedById(BTC_USD_FEED_ID);
        (ethValue, ethDecimals, ethTimestamp) = ftsoV2.getFeedById(ETH_USD_FEED_ID);
        (xrpValue, xrpDecimals, xrpTimestamp) = ftsoV2.getFeedById(XRP_USD_FEED_ID);
        (flrValue, flrDecimals, flrTimestamp) = ftsoV2.getFeedById(FLR_USD_FEED_ID);
    }
}
