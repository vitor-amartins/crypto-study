import fs from 'fs';

import hash from './hash';
import hashData from './hash-data';

const validateBlock = async ({ blockHash }) => {
  const fileData = await fs.readFileSync('src/blockchain.json');
  const blocks = JSON.parse(fileData);

  const block = blocks.find((blockEl) => blockEl.headerHash === blockHash);

  if (block.header.hashData !== hashData({ data: block.data })) {
    throw new Error('Invalid block');
  }

  if (block.headerHash !== hash(block.header)) {
    throw new Error('Invalid block');
  }

  return true;
};

export default validateBlock;
