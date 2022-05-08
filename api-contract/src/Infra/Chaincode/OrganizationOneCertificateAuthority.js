const CertificateAuthorityMain = require('./CertificateAuthorityMain')

const pathLib = require('path')
const dotenv = require('dotenv').config({
  path: `${pathLib.resolve(__dirname, '..', '..', '..')}/.env`,
})

class OrganizationOneCertificateAuthority extends CertificateAuthorityMain {
  constructor() {
    const caHostName = dotenv.parsed.CA_HOSTNAME
    const orgMspId = dotenv.parsed.ORG_MSP_ID
    const affiliationName = dotenv.parsed.AFFILIATION_NAME
    const adminUserId = dotenv.parsed.ADMIN_USER_ID
    const adminUserPasswd = dotenv.parsed.ADMIN_USER_PASSWD
    super(caHostName, orgMspId, affiliationName, adminUserId, adminUserPasswd)
  }

  async registerNewUser(walletInstance, userId, secret) {
    const caClientInstance = this.buildCAClient()

    const adminUser = await this.checkWalletAndReturnAdminIdentity(
      walletInstance,
      userId
    )

    //Register user in CA
    await caClientInstance.register(
      {
        affiliation: this.affiliationName,
        enrollmentID: userId,
        enrollmentSecret: secret,
        role: 'client',
        attrs: [{ name: 'HR', value: 'false', ecert: true }],
      },
      adminUser
    )

    console.log(`User ${userId} created`)
  }

  async checkWalletAndReturnAdminIdentity(walletInstance, userId) {
    const userIdentity = await walletInstance.get(userId)
    if (userIdentity) {
      throw new Error(
        `An identity for the user ${userId} already exists in the wallet`
      )
    }

    const adminIdentity = await walletInstance.get(this.adminUserId)
    if (!adminIdentity) {
      console.log('An identity for the admin user does not exist in the wallet')
      console.log('Enroll the admin user before retrying')
      throw new Error(
        'An identity for the admin user does not exist in the wallet'
      )
    }

    const provider = walletInstance
      .getProviderRegistry()
      .getProvider(adminIdentity.type)
    const adminUser = await provider.getUserContext(
      adminIdentity,
      this.adminUserId
    )

    return adminUser
  }

  async registerNewHrUser(walletInstance, userId, secret) {
    const caClientInstance = this.buildCAClient()

    const adminUser = await this.checkWalletAndReturnAdminIdentity(
      walletInstance,
      userId
    )

    //Register user in CA
    await caClientInstance.register(
      {
        affiliation: this.affiliationName,
        enrollmentID: userId,
        enrollmentSecret: secret,
        role: 'client',
        attrs: [{ name: 'HR', value: 'true', ecert: true }],
      },
      adminUser
    )
    console.log(`RH User ${userId} created`)
  }
}

module.exports = OrganizationOneCertificateAuthority
