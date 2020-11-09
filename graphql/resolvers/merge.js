const DataLoader = require('dataloader');

const Mare = require('../../models/mare');
const User = require('../../models/user');

const mareLoader = new DataLoader((mareIds) => {
  return mares(mareIds);
});

const userLoader = new DataLoader(userIds => {
  return User.find({_id: {$in: userIds}});
});

const mares = async mareIds => {
  try {
    const mares = await Mare.find({ _id: { $in: mareIds } });
    return mares.map(mare => {
      return transformMare(mare);
    });
  } catch (err) {
    throw err;
  }
};

const singleMare = async mareId => {
  try {
    const mare = await mareLoader.load(mareId.toString());
    return mare;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdMares: () => mareLoader.loadMany(user._doc.createdMares)
    };
  } catch (err) {
    throw err;
  }
};

const transformMare = mare => {
  return {
    ...mare._doc,
    _id: mare.id,
    date: mare._doc.dueDate,
    creator: user.bind(this, mare.creator)
  };
};

const transformLog = log => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, log._doc.user),
    mare: singleMare.bind(this, log._doc.mare),
    createdAt: log._doc.createdAt,
    updatedAt: log._doc.updatedAt
  };
};

exports.transformMare = transformMare;
exports.transformLog = transformLog;
