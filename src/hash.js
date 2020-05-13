import sha256 from 'crypto-js/sha256';

const hash = ({
  version, hashPreviousBlock, hashData, timestamp, difficulty, nonce,
}) => {
  const data = `${version}${hashPreviousBlock}${hashData}${timestamp}${difficulty}${nonce}`;
  return sha256(nonce + data).toString();
};

export default hash;
