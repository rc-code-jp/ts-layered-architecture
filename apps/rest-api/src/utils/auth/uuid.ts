const { v4: uuidv4 } = require('uuid');

export function generateUUID() {
  return uuidv4();
}
