import path from 'path';
import fs from 'fs';

const userPath = path.join(__dirname, 'user/types.gql');
const userTypes = fs.readFileSync(userPath, 'utf-8');

module.exports = {
  userTypes
};
