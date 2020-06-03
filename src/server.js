import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import moment from 'moment';
import morgan from 'morgan';

import getBlockchain from './utils/get-blockchain';
import getLastBlockHash from './utils/get-last-block-hash';
import getLastBlock from './utils/get-last-block';
import hashBody from './utils/hash-body';
import hashHeader from './utils/hash-header';
import appendBlock from './utils/append-block';
import { difficulty, version } from './constans';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/blockchain', async (req, res) => {
  const blockchain = await getBlockchain();
  res.json(blockchain);
});

app.get('/difficulty', (req, res) => {
  res.status(200).json(difficulty);
});

app.get('/version', (req, res) => {
  res.status(200).json(version);
});

app.get('/last-block/hash', async (req, res) => {
  const hashLastBlock = await getLastBlockHash();
  res.json(hashLastBlock);
});

app.post('/propose-block', async (req, res) => {
  const {
    headerHash,
    header,
    body,
  } = req.body;

  if (hashBody(body) !== header.hashBody) {
    return res.status(400).json({ error: 'Invalid hash body' });
  }

  if (header.difficulty !== difficulty) {
    return res.status(400).json({ error: 'Invalid difficulty' });
  }

  if (header.version !== version) {
    return res.status(400).json({ error: 'Invalid version' });
  }

  const hashPreviousBlock = await getLastBlockHash();

  if (header.hashPreviousBlock !== hashPreviousBlock) {
    return res.status(400).json({ error: 'Invalid hash of previous block' });
  }

  if (headerHash !== hashHeader(header)) {
    return res.status(400).json({ error: 'Invalid hash header' });
  }

  if (!Number.isInteger(header.nonce)) {
    return res.status(400).json({ error: 'Invalid nonce' });
  }

  if (!Number.isInteger(header.timestamp)) {
    return res.status(400).json({ error: 'Invalid timestamp' });
  }

  const lastBlock = await getLastBlock();
  if (lastBlock && moment(header.timestamp) <= lastBlock.timestamp) {
    return res.status(400).json({ error: 'Invalid timestamp' });
  }

  if (!headerHash.match(new RegExp(`^0{${difficulty}}`))) {
    return res.status(400).json({ error: 'Hash of the block does not meet the minimum requirement of difficulty' });
  }

  await appendBlock({ headerHash, header, body });

  const blockchain = await getBlockchain();

  return res.status(200).json(blockchain);
});

const port = process.env.PORT || 5888;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
