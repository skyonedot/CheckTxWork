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

module.exports = {
    client,
    querySpecificFunctionHistory
}