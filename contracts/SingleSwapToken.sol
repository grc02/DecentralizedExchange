// SPDX-License-Identifier: MIT
pragma solidity >=0.7 <0.9;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    ISwapRouter public constant SWAP_ROUTER = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    function swapExactInputSingle(address token1, address token2, uint256 amountIn)
        external
        returns (uint256 amountOut)
    {
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(token1, address(SWAP_ROUTER), amountIn);

        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: token1,
            tokenOut: token2,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountIn: amountIn,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
        amountOut = SWAP_ROUTER.exactInputSingle(params);
    }

    function swapExactOutputSingle(address token1, address token2, uint256 amountOut, uint256 amountInMaximum)
        external
        returns (uint256 amountIn)
    {
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amountInMaximum);

        TransferHelper.safeApprove(token1, address(SWAP_ROUTER), amountInMaximum);

        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter.ExactOutputSingleParams({
            tokenIn: token1,
            tokenOut: token2,
            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum,
            sqrtPriceLimitX96: 0
        });

        amountIn = SWAP_ROUTER.exactOutputSingle(params);

        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(token1, address(SWAP_ROUTER), amountIn);
            TransferHelper.safeTransfer(token1, msg.sender, amountInMaximum - amountIn);
        }
    }
}
