const { Wallets } = require('fabric-network')
const pathLib = require('path')
const fs = require('fs')
const dotenv = require('dotenv').config({
  path: `${pathLib.resolve(__dirname, '..', '..', '..')}/.env`,
})

const buildCCPOrg = (path = null) => {
  if (path == null) {
    path = dotenv.parsed.CCP_ABSOLUTE_PATH
  }

  const ccpPath = pathLib.resolve(path)
  const fileExists = fs.existsSync(ccpPath)
  if (!fileExists) {
    throw new Error(`no such file or directory: ${ccpPath}`)
  }
  const contents = fs.readFileSync(ccpPath, 'utf8')

  const ccp = JSON.parse(contents)

  console.log(`Loaded the network configuration located at ${ccpPath}`)

  return ccp
}

const buildWallet = async (walletPath = null) => {
  if (walletPath == null) {
    walletPath = pathLib.join(__dirname, '..', '..', 'wallet')
  }

  let wallet = await Wallets.newFileSystemWallet(walletPath)

  console.log(`Built a file system wallet at ${walletPath}`)

  return wallet
}
module.exports = { buildCCPOrg, buildWallet }
