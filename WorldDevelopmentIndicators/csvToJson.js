// This file is taken from test2.js

var fs = require('fs'),
readline = require('readline'),
    stream = require('stream');
var data;
var instream = fs.createReadStream('./Indicators.csv');
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;
var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

var optio = new Object();
optio.flag = "a";
optio.encoding = "utf8"

var i = 1960;
var ruralPopulation;
var urbanPopulation;
var urbanPopulationGrowth;
var totalGrowth;
var year;
var tempData = {};
var jsonData = [];
var tempData1 = {};
var jsonData1 = [];

rl.on('line', function(line) {

    var arr = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    //console.log(arr);
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Rural population \(\% of total population\)/) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        ruralPopulation = arr[5];
        tempData["Growth"] = ruralPopulation;
        tempData["Year"] = i;
        tempData["Client"] = "Rural Population (% of total Population)";
        jsonData.push(tempData);
        tempData = {};
        console.log(ruralPopulation);

    }


    // Get the Urban population (%total)
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Urban population \(\% of total\)/) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        urbanPopulation = arr[5];

        tempData["Year"] = i;
        tempData["Client"] = "Uraban Population (% of total Population)";
        tempData["Growth"] = urbanPopulation;
        jsonData.push(tempData);
        tempData = {};
        console.log(urbanPopulation);
    }

    // Get the Urban population growth
    if (arr[2] == undefined && arr[0] == 'India') {

    } else if (arr[4] == i && arr[2].match(/Urban population growth \(annual \%\)/) && arr[0] == 'India') {
        //else if (arr[2].match(/Urban population growth \(/g) && arr[0] == 'India') {
        console.log(arr[0], arr[2], arr[4], i);
        urbanPopulationGrowth = arr[5];
        tempData1["Client1"] = "Urban Population Growth (% total Population)";
        year = i;
        tempData1["Growth"] = urbanPopulationGrowth;
        tempData1["Year"] = year;
        console.log(urbanPopulationGrowth, year);        
        i = i + 1;
        jsonData1.push(tempData1);
        tempData1 = {};
        
        /*tempData["UrbanPopulationGrowth"] = urbanPopulationGrowth;
        year = i;
        tempData["Year"] = year;
        console.log(urbanPopulationGrowth, year);        
        i = i + 1;

        jsonData.push(tempData);
        tempData={};
        */// fs.writeFileSync("data.json", JSON.stringify(jsonData), optio);
    }

});

rl.on('close',function(){
    fs.writeFileSync("test6.json", JSON.stringify(jsonData), optio);
    fs.writeFileSync("test61.json", JSON.stringify(jsonData1), optio);
});
