const { GraphQLClient, gql } = require('graphql-request')
const endpointFlowScan = "https://graphql.bitquery.io/";
const client = (api) => {
    return new GraphQLClient(endpointFlowScan, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": api
        },
    });
}


const querySpecificFunctionHistory = (network, contract, functionName, limit, offset) => {
    return gql`
        query MyQuery {
            ethereum(network: ${network}) {
            smartContractCalls(
                options: {desc: "block.height", limit: ${limit}, offset: ${offset}}
                smartContractAddress: {in: ["${contract}"]}
                smartContractMethod: {in: ["${functionName}"]}
                # success: true
            ) {
                transaction {
                hash
                txFrom {
                    address
                }
                }
                smartContractMethod {
                name
                signature
                signatureHash
                }
                block {
                height
                timestamp {
                    iso8601
                }
                }
                arguments {
                argument
                value
                }
            }
            }
        }
        `
}

const querySpecificEventHistory = (network, contract, eventName, limit, offset) => {
    return gql`
        query MyQuery {
            ethereum(network: ${network}) {
            smartContractEvents(
                options: {desc: "block.height", limit: ${limit}, offset: ${offset}}
                smartContractAddress: {in: ["${contract}"]}
                smartContractEvent: {in: ["${eventName}"]}
            ) {
                transaction {
                    hash
                }
                block {
                    height
                    timestamp {
                        iso8601
                    }
                }
                arguments {
                    argument
                    value
                }
                smartContractEvent {
                    name
                    signature
                    signatureHash
                }
            }
            }
        }
      
        `
}




module.exports = {
    client,
    querySpecificFunctionHistory,
    querySpecificEventHistory
}