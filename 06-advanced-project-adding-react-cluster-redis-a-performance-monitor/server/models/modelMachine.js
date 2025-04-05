const mongoose = require("mongoose");

module.exports = mongoose.Schema({
  memoryFree: Number,
  memoryTotal: Number,
  memoryUsed: Number,
  memoryUsage: Number,
  osType: String,
  uptime: Number,
  //   cpus: String,
  //   core: String,
  cpuModel: String,
  coresNumber: Number,
  spuSpeed: Number,
  cpuLoad: Number,
});
