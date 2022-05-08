const FabricCAServices = require('fabric-ca-client')
const { buildCCPOrg } = require('./AppUtil')

class CertificateAuthorityMain {
  constructor(caHostName, orgMspId, affiliation, adminUserId, adminUserPasswd) {
    this.caHostName = caHostName
    this.orgMspId = orgMspId
    this.affiliationName = affiliation
    this.adminUserId = adminUserId
    this.adminUserPasswd = adminUserPasswd
    this.ccp = buildCCPOrg()
  }

  async enrollAdmin(walletInstance) {
    const caClientInstance = this.buildCAClient()

    // Check to see if we've already enrolled the admin user.
    const identity = await walletInstance.get(this.adminUserId)

    if (identity) {
      console.log('An identity for the admin user already exists in the wallet')
      return
    }

    // Enroll the admin user, and import the new identity into the wallet.
    const enrollment = await caClientInstance.enroll({
      enrollmentID: this.adminUserId,
      enrollmentSecret: this.adminUserPasswd,
    })
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: this.orgMspId,
      type: 'X.509',
    }

    await walletInstance.put(this.adminUserId, x509Identity)
    console.log(
      'Successfully enrolled admin user and imported it into the wallet'
    )
  }

  buildCAClient() {
    const caInfo = this.ccp.certificateAuthorities[this.caHostName]
    const caTLSCACerts = caInfo.tlsCACerts.pem

    const caClientInstance = new FabricCAServices(
      caInfo.url,
      { trustedRoots: caTLSCACerts, verify: false },
      caInfo.caName
    )

    console.log(`Built a CA Client named ${caInfo.caName}`)
    return caClientInstance
  }

  async enrollUser(walletInstance, userId, secret) {
    const caClientInstance = this.buildCAClient()

    const userIdentity = await walletInstance.get(userId)

    if (userIdentity) {
      console.log(
        `An identity for the user ${userId} already exists in the wallet`
      )
      return
    }

    const enrollment = await caClientInstance.enroll({
      enrollmentID: userId,
      enrollmentSecret: secret,
    })
    const x509Identity = {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: this.orgMspId,
      type: 'X.509',
    }

    await walletInstance.put(userId, x509Identity)
    console.log(
      `Successfully enrolled user ${userId} and imported it into the wallet`
    )
  }
}

module.exports = CertificateAuthorityMain
