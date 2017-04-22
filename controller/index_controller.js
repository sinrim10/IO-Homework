/**
 * Created by lsk on 2017-04-23.
 */
'use strict'
const utils = require('../utils/utils');

function crawler(req,res,next){
    utils.scrap(function(lists,err){
        if(err){
            return next(err);
        }
        res.render('index', { result: lists });
    })
}


module.exports = {
    crawler : crawler
}