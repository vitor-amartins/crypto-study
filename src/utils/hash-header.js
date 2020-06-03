import sha256 from 'crypto-js/sha256';

/**
 * Hash the header of a block
 * @param {Object} header The header of the block
 * @param {Number} header.version The software version
 * @param {String} header.hashPreviousBlock The hash of the last block
 * @param {String} header.hashBody The hash of the body
 * @param {Number} header.timestamp The timestamp of when the block was mined
 * @param {Number} header.difficulty The software difficulty
 * @param {Number} header.nonce The nonce of the block
 */
const hashHeader = ({
  version, hashPreviousBlock, hashBody, timestamp, difficulty, nonce,
}) => {
  const data = `${version}${hashPreviousBlock}${hashBody}${timestamp}${difficulty}${nonce}`;
  return sha256(nonce + data).toString();
};

export default hashHeader;
