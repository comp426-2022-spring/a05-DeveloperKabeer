# Coinserver Description

This package exposes endpoints and provides a web interface to emulate random chance coin flip events in the following ways:

1. Flip one coin - returns result of a coin flip
2. Flip many coins - returns the results of many coin flips with a summary
3. Guess a coin flip and - returns the result of a flip and guess match

# Coinserver Installation

Run `npm install` inside the package root directory.

This package was buid using Node.js LTS (16.x).
Other package dependency and version information can be found in `package.json`.

# Coinserver Runtime Documentation
```
node server.js [options]

--port, -p	Set the port number for the server to listen on. Must be an integer
            between 1 and 65535. Defaults to 5000.

--debug, -d If set to true, creates endlpoints /app/log/access/ which returns
            a JSON access log from the database and /app/error which throws 
            an error with the message "Error test successful." Defaults to 
            false.

--log, -l   If set to false, no log files are written. Defaults to true.
            Logs are always written to database.

--help, -h	Return this message and exit.
```

# Coinserver API Documentation

## Endpoints

### /app/ (GET)

#### Request cURL

```
curl http://localhost:5000/app/
```

#### Response body

```
{"message":"Your API works! (200)"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/ (GET)

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/flip'
```

#### Response body

```
{"flip":"heads"}
```

#### Response headers

```
iHTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flips/:number/ (GET)

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/flips/4'
```

#### Response body

```
{"raw":["heads","tails","tails","heads"],"summary":{"heads":2,"tails":2}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/:guess/ (GET)

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/flip/call/heads'
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/call/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"guess":"heads"}' http://localhost:5000/app/flip/call/
```

#### Response body

```
{"call":"heads","flip":"heads","result":"win"}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 46
ETag: W/"2e-U/q8iZ4JKqczXPIvtwiVRpEFlRc"
Date: Thu, 07 Apr 2022 16:30:07 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/flip/coins/ (POST)

#### Request cURL

```
curl -X POST -H 'Content-Type: application/json' -d '{"number":"30"}' http://localhost:5000/app/flip/coins/`
```

#### Response body

```
{"raw":["heads","heads","heads","tails","heads","heads","tails","tails","tails","heads","heads","heads","heads","heads","heads","tails","tails","heads","heads","heads","heads","heads","heads","heads","tails","heads","tails","heads","tails","heads"],"summary":{"heads":21,"tails":9}}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 283
ETag: W/"11b-9dPTqGfngSPFEOq4loChIlpdSIE"
Date: Thu, 07 Apr 2022 15:23:35 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/log/access/ (GET)

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/log/access'
```

#### Response body

```
[{"id":1,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245423.0","method":"GET","url":"/","protocol":"http","httpversion":"1.1","status":"200.0","referer":null,"useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":2,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245446.0","method":"GET","url":"/style.css","protocol":"http","httpversion":"1.1","status":"200.0","referer":"http://127.0.0.1:200/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":3,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245448.0","method":"GET","url":"/main.js","protocol":"http","httpversion":"1.1","status":"200.0","referer":"http://127.0.0.1:200/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":4,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245561.0","method":"GET","url":"/assets/favicon/android-icon-192x192.png","protocol":"http","httpversion":"1.1","status":"200.0","referer":"http://127.0.0.1:200/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":5,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245684.0","method":"GET","url":"/assets/favicon/manifest.json","protocol":"http","httpversion":"1.1","status":"200.0","referer":"http://127.0.0.1:200/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":6,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296245687.0","method":"GET","url":"/assets/favicon/favicon-32x32.png","protocol":"http","httpversion":"1.1","status":"200.0","referer":"http://127.0.0.1:200/","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":7,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296482621.0","method":"GET","url":"/app/flip","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":8,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651296551659.0","method":"GET","url":"/app/flip","protocol":"http","httpversion":"1.1","status":"200.0","referer":null,"useragent":"curl/7.79.1"},{"id":9,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300373442.0","method":"GET","url":"/flips/1","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":10,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300393414.0","method":"GET","url":"/appflips/1","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":11,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300394125.0","method":"GET","url":"/app/flips/1","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":12,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300413004.0","method":"GET","url":"/app/flips/4","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":13,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300441009.0","method":"GET","url":"/app/flips/coin","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":14,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300450906.0","method":"GET","url":"/app/flips/call/","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":15,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300455563.0","method":"GET","url":"/app/flips/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":16,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300456356.0","method":"GET","url":"/app/flips/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":17,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300459530.0","method":"GET","url":"/app/flips/call/head","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":18,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300460152.0","method":"GET","url":"/app/flips/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":19,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300461763.0","method":"GET","url":"/app/flips/call/tails","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":20,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300462733.0","method":"GET","url":"/app/flips/call/tail","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":21,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300481356.0","method":"GET","url":"/app/flip/call/tail","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":22,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300482126.0","method":"GET","url":"/app/flip/call/tail","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":23,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300502981.0","method":"POST","url":"/app/flip/call/tail","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":24,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300516393.0","method":"GET","url":"/app/flip/call/tail","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":25,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300552037.0","method":"GET","url":"/app/flip/call/tails","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":26,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300552833.0","method":"GET","url":"/app/flip/call/tails","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":27,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300560688.0","method":"GET","url":"/app/flip/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":28,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300562033.0","method":"GET","url":"/app/flip/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":29,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300731078.0","method":"GET","url":"/app/flip/coins.","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":30,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300731885.0","method":"GET","url":"/app/flip/coins/","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":31,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651300732348.0","method":"GET","url":"/app/flip/coins/","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":32,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651301154540.0","method":"GET","url":"/app/flip/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":33,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651301158470.0","method":"GET","url":"/app/flip/call/heads","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"},{"id":34,"remoteaddr":"::ffff:127.0.0.1","remoteuser":null,"time":"1651301198370.0","method":"GET","url":"/app/log/access","protocol":"http","httpversion":"1.1","status":"200.0","referer":"https://cs.cc.unc.edu/psc/campus/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_BROWSE_CATLG_P.GBL?ICType=Panel&ICElementNum=0&ICStateNum=52&ICResubmit=1&ICAJAX=1&","useragent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36"}]
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


### /app/log/error/ (GET)

_Not yet implemented_

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/log/error'
```

#### Response body

```
Error: Error test successful.
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/login/ (POST)

_Not yet implemented_

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/user/login/'
```

#### Response body

```
{"message" : "User successfully logged in!, "success" true}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/new/ (POST)

_Not yet implemented_

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/user/new/'
```

#### Response body

```
{"message": "User successfully created!", success: true}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/update/ (PATCH)

_Not yet implemented_

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/user/update/'
```

#### Response body

```
{message: "User successfully updated!", success: true}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### /app/user/delete/ (DELETE)

_Not yet implemented_

#### Request cURL

```
curl --location --request GET 'http://127.0.0.1:5000/app/user/delete/'
```

#### Response body

```
{message: "User successfully deleted!", success: true}
```

#### Response headers

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 35
ETag: W/"23-KNmhzXgQhtEE5ovS3fuLixylNK0"
Date: Thu, 07 Apr 2022 15:07:49 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```
