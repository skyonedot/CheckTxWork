

---
1. testTx.js: 指定Address, data的情况下 快速发送tx

2. getContractSpecificFunction.js 指定Address和FunctionName, 拿到Tx

3. getContractSpecificEvent.js    指定Address和EventName, 拿到Tx




limitby example

> options: {limit: 25000, offset: ${offset},limitBy: {each: "receiver.address",limit:100}}



EstimateGas有多种方法
1. Init一个Contract, 这时候需要提供abi 
2. 直接provider, 这个直接上tx的数据即可


ethers拿gasPrice的方式
getFee

