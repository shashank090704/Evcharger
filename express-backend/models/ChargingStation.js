const mongoose = require('mongoose');

// Equivalent of Spring's ChargingStation.java @Document(collection = "ChargingStation")
const chargingStationSchema = new mongoose.Schema({
  stationId:       { type: Number },
  stationName:     { type: String },
  location:        { type: String },
  openingTime:     { type: String },
  closingTime:     { type: String },
  chargingType:    { type: String },
  completeAddress: { type: String },
  images:          [{ type: String }],
  latitude:        { type: Number },
  longitude:       { type: Number },
}, {
  collection: 'ChargingStation',
  toJSON: {
    transform(doc, ret) {
      // Mirror Spring's stationId as the identifier
      if (!ret.stationId && ret._id) ret.stationId = ret._id;
      delete ret._id;
      delete ret.__v;
      // Remove null/undefined fields (mirrors @JsonInclude(NON_NULL))
      Object.keys(ret).forEach((k) => { if (ret[k] == null) delete ret[k]; });
      return ret;
    },
  },
});

module.exports = mongoose.model('ChargingStation', chargingStationSchema);
