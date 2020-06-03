import fs from 'fs';

const getBlockchain = async () => {
  const fileData = await fs.readFileSync('src/blockchain.json');
  const blocks = JSON.parse(fileData);
  if (blocks) {
    return blocks;
  }
  return [];
};

export default getBlockchain;
