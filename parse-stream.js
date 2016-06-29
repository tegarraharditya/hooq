const debug = require('debug')('hello');
			+
			+const readline = require('readline');
			+const fs = require('fs');
			+const parse = require('csv-parse');
			+const helper = require('./helper');
			+const transform = require('./transform');
			+
			+function readCsv(filename) {
			+    const rl = readline.createInterface({
			+        input: fs.createReadStream(filename),
			+    });
			+
			+    let parser = parse();
			+    let firstLine = true;
			+    parser.on('readable', function readRecords() {
			+        let record;
			+        while (record = parser.read()) {
			+            if (firstLine) {
			+                firstLine = false;
			+                continue;
			+            }
			+
			+            record = transform(record);
			+            let line = record;
			+            helper.sendSms(line, function afterSending(err, sendingStatus) {
			+                let lineToLog;
			+                if (err) {
			+                    debug(err.message);
			+                    lineToLog = {
			+                        sendingStatus,
			+                        line,
			+                    };
			+                }
			+
			+                if (lineToLog) {
			+                    helper.logToS3(lineToLog, function afterLogging(err, loggingStatus) {
			+                        if (err) {
			+                            debug(err.message);
			+                        }
			+                    });
			+                }
			+            });
			+        }
			+    });
			+
			+    rl.on('line', function writeLine(line) {
			+        parser.write(line);
			+        parser.write('\n');
			+    }).on('close', function readDone() {
			+        parser.end();
			+    });
			+}
			+
const debug = require('debug')('hello');
			
			const readline = require('readline');
			const fs = require('fs');
			const parse = require('csv-parse');
			const helper = require('./helper');
			const transform = require('./transform');
			
			function readCsv(filename) {
			    const rl = readline.createInterface({
			        input: fs.createReadStream(filename),
			    });
			
			    let parser = parse();
			    let firstLine = true;
			    parser.on('readable', function readRecords() {
			        let record;
			        while (record = parser.read()) {
			            if (firstLine) {
			                firstLine = false;
			                continue;
			            }
			
			            record = transform(record);
			            let line = record;
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
			    });
			
			    rl.on('line', function writeLine(line) {
			        parser.write(line);
			        parser.write('\n');
			    }).on('close', function readDone() {
			        parser.end();
			    });
			}
			
			readCsv(__dirname  '/sample.csv');
			+readCsv(__dirname + '/sample.csv');
4rse-stream.js


const debug = require('debug')('hello');
			+
			+const readline = require('readline');
			+const fs = require('fs');
			+const parse = require('csv-parse');
			+const helper = require('./helper');
			+const transform = require('./transform');
			+
			+function readCsv(filename) {
			+    const rl = readline.createInterface({
			+        input: fs.createReadStream(filename),
			+    });
			+
			+    let parser = parse();
			+    let firstLine = true;
			+    parser.on('readable', function readRecords() {
			+        let record;
			+        while (record = parser.read()) {
			+            if (firstLine) {
			+                firstLine = false;
			+                continue;
			+            }
			+
			+            record = transform(record);
			+            let line = record;
			+            helper.sendSms(line, function afterSending(err, sendingStatus) {
			+                let lineToLog;
			+                if (err) {
			+                    debug(err.message);
			+                    lineToLog = {
			+                        sendingStatus,
			+                        line,
			+                    };
			+                }
			+
			+                if (lineToLog) {
			+                    helper.logToS3(lineToLog, function afterLogging(err, loggingStatus) {
			+                        if (err) {
			+                            debug(err.message);
			+                        }
			+                    });
			+                }
			+            });
			+        }
			+    });
			+
			+    rl.on('line', function writeLine(line) {
			+        parser.write(line);
			+        parser.write('\n');
			+    }).on('close', function readDone() {
			+        parser.end();
			+    });
			+}
			+
			+readCsv(__dirname + '/sample.csv');
/ 0.
 Please use readline (https://nodejs.org/api/readline.html) to deal with per line file reading
// 1. Then use the parse API of csv-parse (http://csv.adaltas.com/parse/ find the Node.js Stream API section)

