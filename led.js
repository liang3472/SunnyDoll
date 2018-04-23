var rpio = require('rpio');
var pin = 12;
rpio.open(pin, rpio.OUTPUT, rpio.LOW);

for (var i = 0; i < 5; i++) {
    rpio.write(12, rpio.HIGH);
    rpio.sleep(1);
 
    rpio.write(12, rpio.LOW);
    rpio.msleep(500);
}

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);