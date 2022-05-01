const { Gateway } = require('fabric-network')
const pathLib = require('path')
const { buildCCPOrg } = require('./AppUtil')
const dotenv = require('dotenv').config({
  path: `${pathLib.resolve(__dirname, '..', '..', '..')}/.env`,
})

const chaincodeName = dotenv.parsed.CHAINCODE_NAME
const channelName = dotenv.parsed.CHANNEL_NAME

class ConnectionChaincode {
  constructor() {
    this.ccp = buildCCPOrg()
  }

  async connect(walletInstance, identity) {
    const gateway = new Gateway()

    try {
      await gateway.connect(this.ccp, {
        wallet: walletInstance,
        identity: identity,
        discovery: { enabled: true, asLocalhost: true },
      })

      const network = await gateway.getNetwork(channelName)

      const chaincode = network.getContract(chaincodeName)

      return chaincode
    } catch (error) {
      throw new Error(`Connection cannot be made: ${error}`)
    }
  }
}

module.exports = ConnectionChaincode
