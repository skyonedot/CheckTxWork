const ethers = require('ethers')
const { client,querySpecificFunctionHistory } = require('./graphql.js')
require('dotenv').config()


async function getFunction(network='ethereum', address, functionName, amountTx){
    let limit = 10
    for(let offset = 0; offset < amountTx; offset += limit){
        let res = await client(process.env.GraphAPIBeiHai).request(querySpecificFunctionHistory(network=network,address=address, functionName=functionName, limit=limit, offset=offset));
        if(res['ethereum']['smartContractCalls'].length == 0){
            console.log(`Offset = ${offset}, it had get all the tx`)
            break
        }
        for(let re of res['ethereum']['smartContractCalls']){
            console.log(re)
        }
    }
}

getFunction("bsc","0x5af6d33de2ccec94efb1bdf8f92bd58085432d2c","closeLottery",10)




