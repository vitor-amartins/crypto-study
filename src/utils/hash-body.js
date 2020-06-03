import sha256 from 'crypto-js/sha256';

/**
 * Hash the body of the block
 * @param {Array.<String>} body The body of the block
 */
const hashBody = (body) => sha256(body.join('')).toString();

export default hashBody;
