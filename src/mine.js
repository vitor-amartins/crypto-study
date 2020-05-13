import moment from 'moment';

import hash from './hash';

const mine = ({ header, data, difficulty }) => {
  const regex = new RegExp(`^0{${difficulty}}`);

  let nonce = -1;
  let result = '';
  let timestamp;
  let completeHeader = {};

  do {
    nonce += 1;
    timestamp = moment().unix();
    completeHeader = {
      version: header.version,
      hashPreviousBlock: header.hashPreviousBlock,
      hashData: header.hashData,
      timestamp,
      difficulty,
      nonce,
    };
    result = hash(completeHeader);
  } while (!result.match(regex));

  return {
    headerHash: result,
    header: completeHeader,
    data,
  };
};

export default mine;
