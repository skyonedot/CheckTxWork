const ethers = require('ethers')
const { client,querySpecificFunctionHistory } = require('./graphql.js')
require('dotenv').config()
const delay = ms => new Promise(res => setTimeout(res, ms));

async function getFunction(network='ethereum', address, functionName, amountTx){
    let limit = 10
    for(let offset = 10000; offset < amountTx; offset += limit){
        let res = await client(process.env.GraphAPIBeiHai).request(querySpecificFunctionHistory(network=network,address=address, functionName=functionName, limit=limit, offset=offset));
        if(res['ethereum']['smartContractCalls'].length == 0){
            console.log(`Offset = ${offset}, it had get all the tx`)
            break
        }
        for(let re of res['ethereum']['smartContractCalls']){
            console.log(re.transaction.txFrom.address)
        }
        await delay(10000)
    }
}

// getFunction("bsc","0xfE0E9092c2F14dfeBd04B40bEdf8D84660C193F3","addCoins",10)



module.exports = {
    getFunction
}

