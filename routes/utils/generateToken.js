const crypto = require("crypto");
function generateToken(email) {
  const timestamp = Date.now().toString();
  return crypto
    .createHash("sha256")
    .update(email + timestamp)
    .digest("hex");
}
module.exports = { generateToken };
