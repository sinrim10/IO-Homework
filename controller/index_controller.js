/**
 * Created by lsk on 2017-04-23.
 */
'use strict'
const utils = require('../utils/utils');
const request = require('request');
function crawler(req,res,next){
    utils.scrap(function(lists,err){
        if(err){
            return next(err);
        }
        res.render('index', { result: lists });
    })
}

function findBlockInfo(req,res,next) {
    const url = "https://blockchain.info/block-index/"+req.params.hash;
    request({
        url: url, //URL to hit
        method: 'GET',
        qs:{"format":'json'}
    }, function(error, response, body){
        if(error){
            return cb(null,error);
        }
        const result = {};
        const json = JSON.parse(body);
        let tx_length;
        let value_sum = 0;
        let size_sum = 0;
        tx_length = json.tx.length;
        if(Array.isArray(json.tx)){
            let i = 0;
            json.tx.forEach(function(k){
                let sub_sum = 0;
                size_sum += k.size;
                if(Array.isArray(k.out)){
                    k.out.forEach(function(r){
                        sub_sum+=r.value;
                    });
                    value_sum += sub_sum;
                }
                ++i;
            })
        }
        result.tx_length = tx_length;
        result.avg_value = value_sum/tx_length;
        result.avg_size = size_sum/tx_length;
        result.avg_fee = json.fee/tx_length;
        res.render('lists', { result: result });
    });
}

module.exports = {
    crawler : crawler,
    findBlockInfo: findBlockInfo
}