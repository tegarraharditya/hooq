t debug = require('debug')('hello');

const fs = require('fs');
const parse = require('csv-parse');
const async = require('async');
const helper = require('./helper');
const transform = require('./transform');

function sendSms(line) {
    helper.sendSms(line, function afterSending(err, sendingStatus) {
        let lineToLog;
        if (err) {
            debug(err.message);

            lineToLog = {
                sendingStatus,
                line,
            };
        }

        if (lineToLog) {
            helper.logToS3(lineToLog, function afterLogging(err, loggingStatus) {
                if (err) {
                    debug(err.message);
                }
            });
        }
    });
}

function readCsv(filename) {
    async.waterfall([
        function (thenParse) {
            fs.readFile(filename, thenParse);
        },

        parse,
    ], function (err, parsed) {
        parsed.splice(0, 1);
        async.each(parsed, function (line, callback) {
            line = transform(line);

            sendSms(line);
        }, function (err) {

            debug(err);
        });
    });
}

readCsv(__dirname + '/sample.csv');
