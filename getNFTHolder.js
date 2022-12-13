const axios = require('axios');
const fs = require('fs');
require('dotenv').config()


//sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// axios post content:
// curl https://api.blockvision.org/v1/2HuJ5S2VzkidPFSeqwOro6VmGph \
// -X POST \
// -H "Content-Type: application/json" \
// -d '{
//     "id": 1,
//     "jsonrpc": "2.0",
//     "method": "nft_collectionHolders",
//     "params": {
//         "contractAddress":"0xd963eeb989716e4af761be0d11f4e11cbd3d5445",
//         "blockNumber": 161725567,
//         "pageSize":10,
//         "pageIndex":1
//     }
// }'

async function getHolder(contractAddress, pageIndex) {
    let res = await axios.post(process.env.BlockVision, {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "nft_collectionHolders",
        "params": {
            "contractAddress": contractAddress,
            "blockNumber": 161725567,
            "pageSize": 10,
            "pageIndex": pageIndex
        }
    })
    // console.log(res.data)
    //write data to file
    res.data.result.data.forEach(element => {
        fs.writeFile('./data/nftholder.txt', element.accountAddress + '\n', { flag: "a" }, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        })
    });
    // console.log(res.data.result.nextPageIndex)
    return res.data.result.nextPageIndex
}

async function main() {
    await getHolder("0xd963eeb989716e4af761be0d11f4e11cbd3d5445", 2)
}

// main()