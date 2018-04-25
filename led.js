const rpio = require('rpio');
const red = 12;
const green = 18;

rpio.open(red, rpio.OUTPUT, rpio.LOW);
rpio.open(green, rpio.OUTPUT, rpio.LOW);

let flash = (led, count) => {
    for(let i=0; i<count; i++) {
        setTimeout(()=>{
            rpio.write(led, rpio.HIGH);
            rpio.sleep(1);
        
            rpio.write(led, rpio.LOW);
            rpio.msleep(500);
        }, i * 1000);
    }
}

flash(red, 30);
var arguments = process.argv.splice(2);
console.log('arguments='+arguments);
if(arguments === 'red') {
    flash(red, 30);
} else if(arguments === 'green') {
    flash(green, 30);
}