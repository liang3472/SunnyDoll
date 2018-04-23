const rpio = require('rpio');
const pin = 12;

rpio.open(pin, rpio.OUTPUT, rpio.LOW);

let flash = (count) => {
    for(let i=0; i<count; i++) {
        setTimeout(()=>{
            rpio.write(pin, rpio.HIGH);
            rpio.sleep(1);
        
            rpio.write(pin, rpio.LOW);
            rpio.msleep(500);
        }, count * 1000);
    }
}

flash(30);

var arguments = process.argv.splice(2);
console.log('所传递的参数是：', arguments);