const superagent = require('superagent');
const cheerio = require('cheerio');
const charset2 = require('superagent-charset');

const url = "http://www.lingquanbuy.com/index.php?r=l&kw=&page=1"
let result;
const getDetail = (ctx,next) => {
    superagent
        .get(url) 
        .set({  //设置请求头
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Host": "www.lingquanbuy.com",
            "Origin": "http://www.lingquanbuy.com",
            "Referer": "http://www.lingquanbuy.com/index.php?r=l&kw=&page=1",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
        })
        .end((err,res) => {  
            //错误优先
            if(err){
                console.log(err);
                return ;
            }
            setTimeout(()=>{
                result = [];
                const $ = cheerio.load(res.text);
                // const arr = $('.dis_product').children;
                console.log($('.dis_product .pro_detail').length);
                //存储图片
                $('.goods-list li').each((index,element) => {
                    result.push({
                        href:  "http://www.lingquanbuy.com"+$(element).children('a').attr('href'),
                        imgUrl: $(element).children('a').children('img').attr('src'),
                        tittle: $(element).children('.goods-padding').find('a').text().trim(),
                        price: $(element).children('.goods-padding').find('.price').text().replace(/￥|券后价/g,''),
                        oldPrice: $(element).children('.goods-padding').find('.old-price').text().replace('￥',''),
                        coupon: $(element).children('.goods-padding').find('.coupon').text().replace('券￥',''),
                        goodsNum: $(element).children('.goods-padding').find('.goods-num').find('b').text(),
                    })
                });
            },3000)
            
        })
        ctx.body = result;  // 请求到的html在text属性中
}

module.exports = {
    getDetail
}