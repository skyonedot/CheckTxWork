const ethers = require('ethers');
require('dotenv').config()

async function test(address, data, value = 0, gasLimit = 1000000, gasMulti = 1, send=false) {
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
        if(send=true){
            tx.gasLimit = txRecepiant;
            console.log(tx)
            // let tx = await wallet.sendTransaction(tx);
            // console.log(tx.hash);
        }
    }catch(e){
        console.log("Error",e.reason)
    }
}

test(address = "0x7717350140fe51c0394005ee8ce9af8abd23062d",
    data = "0x89c0e5f70000000000000000000000000000000000000000000000000000000000000001",
    send=true)