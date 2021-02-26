/*jslint node: true */
/* global __mods */
"use strict";

const fs = require("fs-extra");

exports.init = function () {

    const config = __mods.config;

    const rootPath = process.cwd();

    if (config.clientConfig.logo) {
        fs.stat(config.clientConfig.logo, function (err, stat) {
            if (err == null) {
                const inStr = fs.createReadStream(config.clientConfig.property.logo);
                const outStr = fs.createWriteStream(rootPath + "/dist/images/logo_blanc.png");
                inStr.pipe(outStr);
            } else {
                console.warn((config.clientConfig.property.logo) + " not exists!");
                console.error(err);
            }
        });
    }
};
