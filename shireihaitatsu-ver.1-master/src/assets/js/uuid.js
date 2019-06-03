const uuidv1 = require('uuid/v1');

const uuidGenerator = function() {
  return uuidv1();
}

export default uuidGenerator