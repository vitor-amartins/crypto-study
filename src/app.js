import mine from './utils/mine';
import getLastBlockHash from './utils/get-last-block-hash';
import { difficulty, version } from './constans';

const body = ['1 pedrinha para Vitor Martins'];

(async () => {
  const hashPreviousBlock = await getLastBlockHash();

  const blockMined = await mine({
    header: {
      difficulty,
      version,
      hashPreviousBlock,
    },
    body,
  });
  console.log('[app]', blockMined);
})();
