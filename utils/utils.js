/**
 * Created by lsk on 2017-04-23.
 */
const request = require('request');
const cheerio = require('cheerio');
const url = "https://blockchain.info/ko/blocks";

const block_chain = [];

function scraping(cb){
    if(block_chain.length == 0){
        request({
            url: url, //URL to hit
            method: 'GET'
        }, function(error, response, body){
            if(error){
                return cb(null,error);
            }
            const $ = cheerio.load(body);
            $('table.table-striped tr td a').each(function(i, elem) {
                if((i+1)%3 == 0){
                    block_chain.push($(this).text());
                }
            });
            cb(block_chain);
        });
    }else{
        cb(block_chain);
    }

}

module.exports = {
    scrap:scraping
};