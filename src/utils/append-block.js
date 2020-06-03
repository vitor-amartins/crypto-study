import fs from 'fs';

/**
 * Append a block to the blockchain
 * @param {Object} block The valid block to append on blockchain
 * @param {String} block.headerHash The hash of the header of the block
 * @param {Object} block.header The header of the block
 * @param {Array.<String>} block.body The body of the block
 */
const appendBlock = async (block) => {
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
