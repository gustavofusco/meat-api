"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = void 0;
exports.environment = {
    server: { port: process.env.SERVER_PORT || 80 },
    db: { url: process.env.DB_URL || 'mongodb://localhosst/meat-api' }
};
