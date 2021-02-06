const jwt = require('jsonwebtoken');
const bcrybt = require('bcrypt');

const { checkUserByEmail } = require('../../../database/queries/user');
const boomify = require('../../../utils/boomify');

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const {
      rows: [check],
    } = await checkUserByEmail(email);

    if (!check) throw boomify(404, 'User does not exist');

    const match = await bcrybt.compare(password, check.password);

    if (!match) throw boomify(400, 'Invalid username/password');

    const token = await jwt.sign(check.id, process.env.SECRET_TOKEN);

    res
      .json({
        statusCode: 200,
        message: 'Login successfully',
      })
      .cookie('token', token);
  } catch (error) {
    next(error);
  }
};

module.exports = login;
