'use strict'

// Dependencies
const request = require('request-promise')
const crypto = require('crypto')
const xml = require('xml2js')

// Constants
/**
 * Key for the decryption
 * @type {String}
 */
const KEY = 'cb99b5cbc24db398'

/**
 * Initialization vector
 * @type {String}
 */
const IV  = '9bc24cb995cb8db3'

/**
 * JD service for the encrypted key
 * @type {String}
 */
const URL = 'http://service.jdownloader.org/dlcrypt/service.php?srcType=dlc&destType=pylo&data='

/**
 * The expression for encrypted key from JD.org
 * @type {Regex}
 */
const RC_EXPRESSION = /<rc>([\s\S]+)<\/rc>/i

/**
 * Decrypt dlc container
 * @todo   use maybe async/await or promises and clean up
 * @return {[type]} [description]
 */
async function decrypt(file) {
  let dlcKey = file.slice(-88) // get the last 88 chars (this is our key)
  let dlcData = Buffer.from(file.slice(0, -88).toString(), 'base64') // the rest is the content

  try {
    let rc = await request(`${URL}${dlcKey}`)
    let strippedRc = Buffer.from(rc.match(RC_EXPRESSION)[1], 'base64')

    let decryptedKey  = await aes_decrypt(strippedRc, KEY, IV, 0)
    let decryptedData = await aes_decrypt(dlcData, decryptedKey, decryptedKey, 0)

    return await parseXML(Buffer.from(decryptedData, 'base64'))
  } catch (e) {
    return Promise.reject(e)
  }
}

/**
 * Decrypts the input data with the key and initializing vector
 * @param  {String} data    The string to decrypt
 * @param  {string} key     The key for decrypting
 * @param  {string} iv      The init vector
 * @param  {Number} padding The padding of decipher defaults to 0
 * @return {String}         Returns a decrypted string (from binary to utf8)
 */
function aes_decrypt(data, key, iv, padding) {
  let decipher = crypto.createDecipheriv('AES-128-CBC', key, iv)
  decipher.setAutoPadding(padding || 0)
  return Promise.resolve(decipher.update(data, 'binary', 'utf8'))
}

/**
 * [description]
 * @param  {[type]} buf [description]
 * @return {[type]}       [description]
 */
function parseXML (buf) {
  return new Promise(function(resolve, reject) {
    xml.parseString(buf.toString('utf8'), function(err, result) {
      if (!err) return resolve(result)
      return reject(err)
    })
  })
}

// export public interface
module.exports = decrypt
