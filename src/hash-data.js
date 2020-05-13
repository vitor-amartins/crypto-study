import sha256 from 'crypto-js/sha256';

const hashData = ({ data }) => sha256(data.join('')).toString();

export default hashData;
