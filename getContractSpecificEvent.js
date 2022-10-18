const ethers = require('ethers')
const { client,querySpecificEventHistory } = require('./graphql.js')
require('dotenv').config()


async function getEvent(network='ethereum', address, eventName, amountTx){
    let limit = 10
    for(let offset = 0; offset < amountTx; offset += limit){
        let res = await client(process.env.GraphAPIBeiHai).request(querySpecificEventHistory(network=network,address=address, eventName=eventName, limit=limit, offset=offset));
        if(res['ethereum']['smartContractEvents'].length == 0){
            console.log(`Offset = ${offset}, it had get all the tx`)
            break·
        }
        for(let re of res['ethereum']['smartContractEvents']){
            console.log(re)
        }
    }
}

getEvent("ethereum","0x06450dee7fd2fb8e39061434babcfc05599a6fb8","RankClaimed",10)




