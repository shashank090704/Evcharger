const mongoose = require('mongoose');

// Equivalent of Spring's User.java @Document(collection = "User")
const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName:  { type: String },
  password:  { type: String },
  email:     { type: String, unique: true },
  brand:     { type: String },
  model:     { type: String },
}, {
  collection: 'User',
  // Spring's @JsonInclude(NON_NULL) -> toJSON transform below
  toJSON: {
    transform(doc, ret) {
      ret.userId = ret._id;
      delete ret._id;
      delete ret.__v;
      // Remove null/undefined fields (mirrors @JsonInclude(NON_NULL))
      Object.keys(ret).forEach((k) => { if (ret[k] == null) delete ret[k]; });
      return ret;
    },
  },
});

module.exports = mongoose.model('User', userSchema);
