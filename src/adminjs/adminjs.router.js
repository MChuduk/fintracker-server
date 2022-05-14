const adminJsService = require('./adminjs.service');
const AdminJSExpress = require('@adminjs/express');
const config = require('../config');
const User = require('../database/models/user.model');
const utilsService = require('../utils/utils.service');

// module.exports = AdminJSExpress.buildRouter(adminJsService);

module.exports = AdminJSExpress.buildAuthenticatedRouter(adminJsService, {
  authenticate: async (email, password) => {
    const [user] = await User.findAll({
      where: {email},
    });
    if (!user) return false;
    return (await utilsService.scryptVerify(password, user.password)) ? user : false;
  },
  cookiePassword: config.ADMIN_JS_SESSION_SECRET,
});
