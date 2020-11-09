const Mare = require('../../models/mare');
const User = require('../../models/user');

const { transformMare } = require('./merge');

module.exports = {
  mares: async () => {
    try {
      const mares = await Mare.find();
      return mares.map(mare => {
        return transformMare(mare);
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    const mare = new Mare({
      name: args.mareInput.name,
      camera: args.mareInput.camera,
      age: +args.mareInput.age,
      dueDate: args.mareInput.dueDate,
      status: args.mareInput.status,
      creator: req.userId
    });
    let createdMare;
    try {
      const result = await mare.save();
      createdMare = transformMare(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdMares.push(mare);
      await creator.save();

      return createdMare;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
