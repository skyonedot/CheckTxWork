const fs = require('fs')
const {getFunction} = require('./getContractSpecificFunction.js')
const ethers = require('ethers')
let contractAddress = '0xfe0e9092c2f14dfebd04b40bedf8d84660c193f3'
let abi = require('./tower.json')
const delay = ms => new Promise(res => setTimeout(res, ms));
let provider = new ethers.providers.JsonRpcProvider()

async function get(){
    await getFunction("bsc","0xfE0E9092c2F14dfeBd04B40bEdf8D84660C193F3","addCoins",20000)
}

get()

async function getState(){
    let contract = new ethers.Contract(contractAddress, abi, provider)
    let data = fs.readFileSync('./nohup.out','utf-8')
    data = data.split('\n')
    for(let d of data){
        let state = await contract.towers(d)
        fs.writeFileSync('./tower.txt', `${d}--${Number(state.coins)}--${Number(state.money)}--${Number(state.money2)}\n`, {flag: 'a+'}  )
        await delay(100)
    }
}

// getState()