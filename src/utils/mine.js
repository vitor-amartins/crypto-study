import moment from 'moment';
import HashHeader from './hash-header';
import HashBody from './hash-body';

/**
 * Hash the header of a block
 * @param {Object} block The block with the header and body
 * @param {Object} block.header The header of the block
 * @param {Number} block.header.version The software version
 * @param {String} block.header.hashPreviousBlock The hash of the last block
 * @param {Number} block.header.difficulty The software difficulty
 * @param {Array.<String>} block.body The body of the block
 */
const mine = async ({ header, body }) => {
  const regex = new RegExp(`^0{${header.difficulty}}`);

  const hashBody = await HashBody(body);
  let nonce = -1;
  let result = '';
  let timestamp;
  let completeHeader = {};

  do {
    nonce += 1;
    timestamp = moment().unix();
    completeHeader = {
      difficulty: header.difficulty,
      version: header.version,
      nonce,
      hashBody,
      hashPreviousBlock: header.hashPreviousBlock,
      timestamp,
    };
    result = HashHeader(completeHeader);
  } while (!result.match(regex));

  return {
    headerHash: result,
    header: completeHeader,
    body,
  };
};

export default mine;
