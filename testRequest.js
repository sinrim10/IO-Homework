/**
 * Created by lsk on 2017-04-23.
 */
"use strict";
const request = require('request');
const print = console.log;
(function(){
    //findBlock("000000000000000001c1f9030b4b2bc4fd43a0be866bd75b5b55e1339acfbcd4");
    //findBlockType("000000000000000001c1f9030b4b2bc4fd43a0be866bd75b5b55e1339acfbcd4","input")
    findBlockType("000000000000000001c1f9030b4b2bc4fd43a0be866bd75b5b55e1339acfbcd4","output")
})();


/*
* 트랜잭션(tx) 수
 평균 트랜잭션의 값(value)
 평균 트랜잭션의 수수료(fee)
 평균 트랜잭션의 크기(size)
*
* */
function findBlock(blockhash){
    const url = "https://blockchain.info/block-index/"+blockhash;
    request({
        url: url, //URL to hit
        method: 'GET',
        qs:{"format":'json'}
    }, function(error, response, body){
        if(error){
            return cb(null,error);
        }
        const json = JSON.parse(body);
        //print(JSON.stringify(json,null,3));
        print(json.tx.length);
        let sum = 0;
        if(Array.isArray(json.tx)){
            let i = 0;
            json.tx.forEach(function(k){
                ++i;
                let sub_sum = 0;
                if(Array.isArray(k.out)){
                    k.out.forEach(function(r){
                        sub_sum+=r.value;
                    });
                    sum += sub_sum;
                }
            })
        }
        print(sum/json.tx.length);
    });
}

function findBlockType(blockhash,type) {
    const url = "https://blockchain.info/block-index/"+blockhash;
    if(['input','output'].indexOf(type) === -1){
        print('not type')
    }
    request({
        url: url, //URL to hit
        method: 'GET',
        qs:{"format":'json'}
    }, function(error, response, body){
        if(error){
            return cb(null,error);
        }
        const obj = [];
        const json = JSON.parse(body);
        json.tx.forEach(function(r){
            if(type === 'input'){
                obj.push(r.inputs);
            } else if (type === 'output'){
                obj.push(r.out);
            }
        });
        print(JSON.stringify(obj,null,3))
    });
}

