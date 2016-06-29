

const debug = require('debug')('hello');
			
			const fs = require('fs');
			const parse = require('csv-parse');
			const helper = require('./helper');
			const transform = require('./transform');
			
			function readFile(filename) {
			    return new Promise(function promiseBody(resolve, reject) {
			        fs.readFile(filename, function handlePromise(err, data) {
			            if (err) {
			                reject(err);
			                return;
			            }
			
			            resolve(data);
			        });
			    });
			}
			
			function parseCsv(data) {
			    return new Promise(function promiseBody(resolve, reject) {
			        parse(data, function transformEachLine(err, parsed) {
			            if (err) {
			                reject(err);
			                return;
			            }
			
			            resolve(parsed);
			        });
			    });
			}
			
			function sendSms(data) {
			    return new Promise(function (resolve, reject) {
			        helper.sendSms(data, function afterSending(err, sendingStatus) {
			            if (err) {
			                lineToLog = {
			                    sendingStatus,
			                    line: data,
			                };
			                reject(lineToLog);
			                return;
			            }
			
			            resolve(sendingStatus);
			        });
			    });
			}
			
			function logToS3(data) {
			    return new Promise(function (resolve, reject) {
			        helper.logToS3(data, function afterLogging(err, loggingStatus) {
			            if (err) {
			                reject(err);
			                return;
			            }
			
			            resolve(loggingStatus);
			        });
			    });
			}
			
			function readCsv(filename) {
			    readFile(filename).then(function (data) {
			        return parseCsv(data);
			    }).then(function (parsed) {
			        for (let index in parsed) {
			            let line = parsed[index];
			            line = transform(line);
			
			            if (index > 0) {
			                debug(`sending data index: ${index - 1}`);
			                sendSms(line).catch(function (reason) {
			                    debug(reason);
			                    return logToS3(reason);
			                }).catch(function (err) {
			                    debug(err);
			                });
			            }
			
			            index;
			        }
			    }).catch(function (err) {
			        debug(err);
			    });
			}
			
			readCsv(__dirname  '/sample.csv');

