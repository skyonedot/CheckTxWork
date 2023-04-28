const ethers = require('ethers');
require('dotenv').config()

async function test(address, data, value = 0, gasLimit = 10000000, gasMulti = 1, send=false) {
    const provider = new ethers.providers.JsonRpcProvider(process.env.MainnetRPC);
    const wallet = new ethers.Wallet(process.env.PK, provider);
    let { gasPrice, maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();
    let tx = {
        to: address,
        data: data,
        value: value,
        gasLimit: gasLimit,
        maxFeePerGas: maxFeePerGas.mul(gasMulti),
        maxPriorityFeePerGas: maxPriorityFeePerGas.mul(gasMulti)
    }
    // console.log(tx)
    try{
        let txRecepiant = await wallet.estimateGas(tx);
        console.log(Number(txRecepiant._hex));
        if(send==true){
            tx.gasLimit = txRecepiant;
            console.log(tx)
            // let tx = await wallet.sendTransaction(tx);
            // console.log(tx.hash);
        }
    }catch(e){
        console.log("Error",e.reason)
    }
}

test(address = "0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792",
    data = "0x42842e0e0000000000000000000000008a09fb23e1c8d0ff9c9fef0bcfc9b9e07b1f06670000000000000000000000001ec85f6e620237726a47fba04c0d1736e0adc57c0000000000000000000000000000000000000000000000000000000000045788",
    )