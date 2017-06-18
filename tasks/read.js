/**
 * 1.向网址发出请求得到响应体
 * 2.把得到的body的buffer转成字符串
 * 3.字符串中提取我们需要的内容
 * 4.把提取到的结果传入回调函数
 */
let request = require('request');
let iconv = require('iconv-lite');
let cheerio = require('cheerio');
let debug = require('debug')('crawl:read');//项目名：模块名
module.exports = function (url, callback) {
    request({url, encoding: null}, (err, response, body) => {
        body = iconv.decode(body, 'gbk');
        let $ = cheerio.load(body);
        let movies=[];

        $('.keyword a.list-title').each(function(){
            let movie={};
            let $this = $(this);
            movie.name=$this.text();
            movie.url=$this.attr('href');
            debug(`读到电影:${movie.name}`);
            movies.push(movie);
        });
        // let content = $('.item-info .item-text>a').text();
        // let hot = $('.hideline .last>.icon-rise').text();


        callback(err,movies);

    })
};
