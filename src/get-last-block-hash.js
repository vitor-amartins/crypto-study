import fs from 'fs';

const getLastBlockHash = async () => {
  const fileData = await fs.readFileSync('src/blockchain.json');
  const blocks = JSON.parse(fileData);
  if (blocks.length) {
    return blocks[blocks.length - 1].hashHeader;
  }
  return '0000000000000000000000000000000000000000000000000000000000000000';
};

export default getLastBlockHash;
