const fs = require('fs')
const ethers = require('ethers')
let contractAddress = '0xfe0e9092c2f14dfebd04b40bedf8d84660c193f3'
let abi = require('./tower.json')
const delay = ms => new Promise(res => setTimeout(res, ms));
let provider = new ethers.providers.JsonRpcProvider()
let contract = new ethers.Contract(contractAddress, abi, provider)

console.log(abi)
async function getState(address){
    let state = await contract.towers(address)
    fs.writeFileSync('./tower.txt', `${address}--${Number(state.coins)}--${Number(state.money)}--${Number(state.money2)}\n`, {flag: 'a+'}  )
}


async function check(){
    //read all
    let data = fs.readFileSync('./tower.txt','utf-8')
    data = data.split('\n')
    let addrList = []
    for(let i of data){
        let obj = {
            addr: i.split('--')[0],
            coins: i.split('--')[1],
            money: i.split('--')[2],
            money2: i.split('--')[3]
        }
        addrList.push(obj)
    }
    let sorted_obj = addrList.sort((a,b) => {
        if(Number(a.money) > Number(b.money)) {
            return -1;
        }
        if (Number(a.money) < Number(b.money)) {
            return 1;
        }
        return 0;
    })
    console.log(sorted_obj.slice(0,10))
}

// check()

async function checkHup(){
    //read all
    let data = fs.readFileSync('./nohup.out','utf-8')
    data = data.split('\n')
    let addrList = new Set()
    for(let i of data){
        addrList.add(i); // Set [ 1 ]
    }
    const myArr = Array.from(addrList)
    //loop set
    for(let i=2969;i<myArr.length;i++){
        console.log(myArr[i])
        await getState(myArr[i])
        await delay(1000)
    }
}

// checkHup()

