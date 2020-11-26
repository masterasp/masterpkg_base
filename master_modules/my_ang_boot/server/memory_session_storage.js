/*jslint node: true */
"use strict";

const session = require('express-session');

const MSStorage = function (db) {
    this.db = db;
    if (db.memorySessions == null) {
        db.memorySessions = {};
    }
};

MSStorage.prototype.__proto__ = session.Store.prototype;

MSStorage.prototype.get = function (sid, cb) {
    if (this.db.memorySessions[sid]) {
        return cb(null, this.db.memorySessions[sid].data);
    } else {
        return cb(null, null);
    }
};

MSStorage.prototype.set = function (sid, data, cb) {
    const self = this;
    let session = self.db.memorySessions[sid];
    if (session == null) {
        session = {
            sid,
            data,
            idUser: data.passport.user
        }
        self.db.memorySessions[sid] = session;
    }
    session.date = new Date();
    cb();
};

/**
 * Destroy a session's data
 */
MSStorage.prototype.destroy = function (sid, cb) {
    delete this.db.memorySessions[sid]
    cb();
};

module.exports = MSStorage;
