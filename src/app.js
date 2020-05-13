import sha256 from 'crypto-js/sha256';

import mine from './mine';
import getLastBlockHash from './get-last-block-hash';
import appendBlock from './append-block';

const difficulty = 3;
const version = 1;
const data = ['Mito Vartins'];

(async () => {
  const hashPreviousBlock = await getLastBlockHash();
  const hashData = sha256(data.join('')).toString();

  const blockMined = mine({
    header: {
      version,
      hashPreviousBlock,
      hashData,
    },
    data,
    difficulty,
  });
  console.log('[app]', blockMined);

  await appendBlock({ block: blockMined });
})();
