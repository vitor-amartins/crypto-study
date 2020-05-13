import fs from 'fs';

const appendBlock = async ({ block }) => {
  if (!block) {
    throw new Error('You should pass the block to append');
  }
  const fileData = await fs.readFileSync('src/blockchain.json');
  const blocks = JSON.parse(fileData);
  blocks.push(block);
  const writeData = JSON.stringify(blocks);
  await fs.writeFileSync('src/blockchain.json', writeData);
};

export default appendBlock;
