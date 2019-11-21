<template>
  <div id="app">
    <div id="top-logo">
      <img src="./img/6logo.png">
      <div>药葫芦商家版</div>
    </div>
    <div class="banner-wrapper">
      <div class="banner-main">
        <a href="https://itunes.apple.com/cn/app/药葫芦药店端/id1437732245?mt=8" class="ios"></a>
        <a href="https://uploads.kangmei.com.cn/app/app_yhl_sj_1.1.apk" class="android"></a>
      </div>
    </div>
    <div class="main5">
      <h5>关于药葫芦商家版</h5>
      <h4></h4>
      <div class="main_content5">
        <p>
          药葫芦商家版App是由药葫芦官方为商家推出的手机App，通过App商家可以随时随地查看订单配送相关信息以及处理退款、退单等多种业务问题，还可以进行营业管理，随时调整营业信息，让商家轻轻松松管理药房。
        </p>
      </div>
    </div>
    <footer>
      康美药业 版权所有
      &copy;  2018
      <br>康美药业股份有限公司. All rights reserved.
    </footer>

  </div>
</template>
<style lang="less" scoped>
  a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,summary,table,tbody,td,textarea,tfoot,th,thead,time,tr,tt,u,ul,var,video,textarea{margin:0;padding:0;border:0;font:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}body{line-height:1}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}table{border-collapse:collapse;border-spacing:0}em,i{font-style:normal}html{-webkit-text-size-adjust:none}body{font-family:"å¾®è½¯é›…é»‘",Helvetica,STHeiTi,sans-serif;color:#6e6e6e;-webkit-tap-highlight-color:transparent;-webkit-tap-highlight-color:transparent}body,html{-webkit-user-select:none;user-select:none}a,img{-webkit-touch-callout:none}a{text-decoration:none}.clearfix:after,.clearfix:before{content:"";display:table}.clearfix:after{clear:both}.clearfix{zoom:1}
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  a{color: #333}
  html, body{width: 100%; font-size: 20px; background: #fff; height: 100%;}
  .main1, .main3, .main4, .main5 { position: relative; width: 100%; height: auto; min-width: 1200px;}
  .main1 > img, .main3 > img, .main4 > img, .main5 > img { width: 100%; height: auto;}
  .main5 h5,.main5>h4{
    width:30%;
    display: flex;
    justify-content: center;
    font-size:12px;
    margin:0 auto;
    font-weight: 600;
  }
  .main5>h4{
    height: 1px;
    display: block;
    width:10%;
    border-bottom: 1px solid #45C300;
  }
  .main5 h5{
    margin-top:15px;
  }
  .content { position: absolute; width: 1200px; left: 50%; margin-left: -600px; text-align: center;}
  .logo {
    position: absolute; top: 50px; left: 10%;
    display: flex;
    img{
      width:50px;height:50px;
    }
    span{
      margin-left:10px;
      color: #ffffff;
      font-size:24px;
      line-height: 50px;
    }
  }
  .main_content1 {
    top: 25%;
    button.main1_3{
      width:10%;
      color:#45C300;
      border:1px solid #45C300;
      border-radius: 5px;
      font-size:20px;
    }
  }
  .main1_1, .main1_2, .main1_3 { margin: 20px auto; }

  .main_content2 { top: 10%;}

  .main_content3 { top: 15%;}
  .main_content3 img { margin: 20px auto;}

  .main_content4 { top: 35%; }

  .main_content5 {
    top: 10%; height: 100%;
    margin:10px 15px 20px;
    font-size:12px;
    color: #7D7D7D;
    word-wrap:break-word;
  }
  .main5_2 { margin-top: 100px;}
  .main_content5 p{  width: 100%; text-align: center;}
  @media only screen and (max-width: 1500px) {
    .main_content3 { top: 5%;}
  }

  @media only screen and (max-width: 1400px) {
    .main1_1 { width: 35%;}
    .main1_2 { width: 20%;}
    .main_content1 button.main1_3 {
      width: 20%;
      font-size:12px;
    }

    .main3_1 { width: 15%;}
    .main3_2 { width: 80%;}

    .main_content3 { top: 10%;}

    .main4_1 { width: 80%;}

    .main5_1 { width: 60%;}
    .main5_2 { width: 80%;}
  }

  @media only screen and (max-width: 1200px) {
    .main1_1 { width: 33%;}
    .main1_2 { width: 18%;}
    .main_content1 button.main1_3 {
      width: 18%;
      font-size:12px;
    }

    .main_content3 { top: 5%;}

    .main_content5 p { bottom: 10px;}
  }

  @media only screen and (max-width: 1024px) {
    .main1, .main3, .main4, .main5 { min-width: 1024px;}
    .content { width: 1024px; margin-left: -512px;}

  }

  @media only screen and (max-width: 960px) {
    .main1, .main3, .main4, .main5 { min-width: 100%;}
    .content { width: 100%; left: 0; margin-left: 0;}

    .main_content1 { top: 25%;}
    .logo {
      width: 100%;
      height: 10%;
      margin-bottom: 10px;
      top: 15px; left: 10px;
      span{
        font-size:12px;
        line-height: 25px;
      }
    }
    .logo img { width: 25px; height: 25px;}
    .main1 { }
    .main1 > img { width: 100%; height: 100%;}
    .main1_1 { width: 50%;}
    .main1_2 { width: 25%;}
    .main_content1 button.main1_3 {
      width: 20%;
      font-size: 12px;
    }
    .main1_1, .main1_2, .main1_3 { margin: 5px auto; }

    .main_content2 { top: 5%;}
    .main_content3 img { margin: 0 auto;}
    .main_content3 img:nth-of-type(2) { margin-top: 20px; }
    .main5_2 { margin-top: 20px;}
    .main5_3 { width: 60%;}
  }
  footer{
    width:100%;
    background: #ffffff;
    font-size:12px;
    color: #ccc;
    text-align: center;
  }
  #top-logo{
    width: 100%;
    height: 40px;
    background:  #fff;
    display: flex;
    align-items: center;
    padding-left: 5px;
    img{
      width: 25px;
      height: 25px;
    }
    div{
      margin-left: 5px;
      flex: 1;
      font-size: 12px;
      display: flex;
      height: 100%;
      align-items: center;
      color: #000;
    }
  }
  .banner-wrapper{
    position: relative;
  }
  .banner-main{
    width: 100%;
    height: 33.33vw;
    background: url(./img/banner1.png) no-repeat;
    background-size: 100% 100%;
    a{
      width: 11.3vw;
      height: 3.86458vw;
      position: absolute;
    }
    .ios{
      left: 53.6vw;
      top: 18.5vw;
    }
    .android{
      left: 67vw;
      top: 18.5vw;
    }
    .sanjiao{
      position: absolute;
      width: 0;
      height: 0;
      border-left: 0.5vw solid transparent;
      border-right: 0.5vw solid transparent;
      border-bottom: 1vw solid #ccc;
      top: 2.8vw;
      left: 4vw;
      display:none;
    }
    .codeImg-wrapper{
      width: 11.41666vw;
      height: 11.41666vw;
      position: absolute;
      top: 3.6vw;
      left: -0.64584vw;
      display:none;
      padding: 0.5vw;
      border: 0.2vw solid #ccc;
    }
    .codeImg{
      width: 100%;
      height: 100%;
    }
  }
</style>
<script>
export default {
  name: 'record',
  data() {
    return {
    };
  },
  created() {
    document.title = '药葫芦商家版';
  },
  methods: {
  }
};
</script>
