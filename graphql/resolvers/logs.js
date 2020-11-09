const Mare = require('../../models/mare');
const Log = require('../../models/log');
const { transformLog, transformMare } = require('./merge');

module.exports = {
  logs: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const logs = await Log.find({user: req.userId});
      return logs.map(log => {
        return transformLog(log);
      });
    } catch (err) {
      throw err;
    }
  },
  createLog: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const fetchedMare = await Mare.findOne({ _id: args.eventId });
    const log = new Log({
      user: req.userId,
      mare: fetchedMare
    });
    const result = await log.save();
    return transformLog(result);
  },
  deleteLog: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const log = await Log.findById(args.logId).populate('mare');
      const event = transformMare(log.mare);
      await Log.deleteOne({ _id: args.logId });
      return mare;
    } catch (err) {
      throw err;
    }
  }
};
