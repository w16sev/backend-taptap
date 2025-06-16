const crypto = require("crypto");
function encodePassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
module.exports = { encodePassword };
