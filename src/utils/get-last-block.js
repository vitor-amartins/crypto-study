import fs from 'fs';

const getLastBlock = async () => {
  const fileData = await fs.readFileSync('src/blockchain.json');
  const blocks = JSON.parse(fileData);
  if (blocks.length) {
    return blocks[blocks.length - 1];
  }
  return null;
};

export default getLastBlock;
