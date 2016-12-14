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
