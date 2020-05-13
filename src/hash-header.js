import sha256 from 'crypto-js/sha256';

const hash = ({ data, nonce }) => sha256(nonce + data).toString();

export default hash;
