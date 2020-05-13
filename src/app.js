import hashData from './hash-data';
import mine from './mine';
import getLastBlockHash from './get-last-block-hash';
import appendBlock from './append-block';

const difficulty = 3;
const version = 1;
const data = ['1 pedrinha para Vitor Martins'];

(async () => {
  const hashPreviousBlock = await getLastBlockHash();

  const blockMined = mine({
    header: {
      version,
      hashPreviousBlock,
      hashData: hashData({ data }),
    },
    data,
    difficulty,
  });
  console.log('[app]', blockMined);

  await appendBlock({ block: blockMined });
})();
