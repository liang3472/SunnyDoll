const axios = require('axios');
const process = require('child_process');

const location = '%E5%8C%97%E4%BA%AC';
const ak = '8UI6PHtek99nSfQdnoC0Pawf';
const appKey = 'Dh5DSr00QESCDBfmZmm5Xytw';
const secretKey = 'MXY3QUpGfd2xbUQT9i2NvV8b1C0uWTTD';
let weatherApi = `http://api.map.baidu.com/telematics/v3/weather?location=${location}&output=json&ak=${ak}`;
let bdAuth = `https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=${appKey}&client_secret=${secretKey}`;

let getWeather = (func) => {
	axios.get(weatherApi)
 	.then(response => {
    	let weatherInfo = response.data.results[0];
    	let city = weatherInfo.currentCity;
    	let weather = weatherInfo.weather_data[0].weather;
    	let pm25 = weatherInfo.pm25;
    	let temperature = weatherInfo.weather_data[0].temperature.replace(' ~ ','到').replace('℃','');
		let wind = weatherInfo.weather_data[0].wind;
		let drsg = weatherInfo.index[0];
		let flu = weatherInfo.index[2];

    	let weatherText = `${city}今天天气:${weather},气温:${temperature}摄氏度,风向:${wind},pm2.5:${pm25},流感指数:${flu.zs},${flu.des} 穿衣指数:${drsg.zs},${drsg.des}`;
    	func && func(weatherText);
  	})
  	.catch(error => {
    	// console.log(error);
    	console.log(error);
  	});
}

let execCmd = cmd => {
	process.exec(cmd, (error, stdout, stderr) => {
		console.log(stdout);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}

let getToken = (func) => {
	axios.get(bdAuth)
 		.then(response => {
 			let token = response.data.access_token;
 			func && func(token);
	  	})
	  	.catch(error => {
	    	console.log(error);
	  	});
}

let getVoiceUrl = (token, text) => {
	let date = Date.now();
	return `http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=${date}&tok=${token}&tex=${text}&vol=9&per=0&spd=5&pit=5`;
}

getWeather(text => {
	console.log(text);
	getToken(token => {
		console.log(getVoiceUrl(token, text));
		execCmd(`mpg123 ${getVoiceUrl(token, text)}`);
	});
});




