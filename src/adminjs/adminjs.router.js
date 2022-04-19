const adminJsService = require('./adminjs.service');
const AdminJSExpress = require('@adminjs/express');

module.exports = AdminJSExpress.buildRouter(adminJsService);
