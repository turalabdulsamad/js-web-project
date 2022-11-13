const Employee = require("../model/Employee");
const User = require("../model/User");
const bcrypt = require('bcrypt')


const getAllUsers = async (req, res) => {
  const users = await User.find();

  if (!users) return res.status(204);

  res.json(users);
};

const updateUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "ID is required" });

  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(204);
  }
  try {
  if (req.body?.user) user.username = req.body.user;

  if (req.body?.pwd) {
    const hashedPwd = await bcrypt.hash(req.body.pwd,  10)
    user.password = hashedPwd
  }
    const result = await user.save();
    res.json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteUser = async (req, res) => {

  if (!req?.body?.id)
    return res.status(400).json({ message: "ID parameter is required" });


  const user = await User.findOne({ _id: req.body.id }).exec();

  if (!user) {
    return res.status(204).json({
      message: `No user matches ID ${req.body.id}`,
    });
  }

  const result = await user.deleteOne({_id:req.body.id})

  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "ID parameter is required" });
 
    const user = await User.findOne({ _id: req.params.id }).exec();
     if (!user) {
      return res.status(204).json({
        message: `No user matches ID ${req.params.id}`,
      });
    }

  res.json(user);
};

module.exports = {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
};
