<template>
  <div class="mhealth-body">
    <mt-header title="健康头条" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="mhealth-m">
      <li>
        <div class="mhealth-time">
          <span>2018-04-20 20:11:26</span>
        </div>
        <div class="mhealth-more">
          <div class="mhealth-moreIn">
            <div class="mhealth-mleft">
              <p>跑步的神奇力量，你值得拥有健康完
                美的身体跑步的神奇力量，你值得拥有健康完
                美的身体跑步的神奇力量，你值得拥有健康完
                美的身体</p>
              <span>搜狐健康 &nbsp;&nbsp;&nbsp;阅读量1320</span>
            </div>
            <div class="mhealth-mRight">
              <img src="./img/1.jpg" alt="">
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="mhealth-time">
          <span>2018-04-20 20:11:26</span>
        </div>
        <div class="mhealth-more">
          <div class="mhealth-moreIn">
            <div class="mhealth-mleft">
              <p>abnm,ksololpsl;;apoiwuijuhjkkaallll;a;;aiqijqbabgsj,sslp;sweewrewqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</p>
              <span>搜狐健康 &nbsp;&nbsp;&nbsp;阅读量1320</span>
            </div>
            <div class="mhealth-mRight">
              <img src="" alt="">
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  .mhealth-body{
    width: 100%;
    height: 100%;
    background-color: #ededed;
  }
  .mhealth-m{
    width:100%;
    li{
      .mhealth-time{
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          height: 20px;
          margin-top: 15px;
          display: block;
          background-color: rgba(0, 0, 0, 0.09);
          border-radius:10px;
          /*opacity: 0.09;*/
          font-size: 10px;
          padding-left: 10px;
          padding-right: 10px;
          color: rgba(123, 123, 123, 0.61);
          text-align: center;
          line-height: 20px;
        }
      }
    }
  }
  .mhealth-more{
    margin-top: 10px;
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .mhealth-moreIn{
      width: 95%;
      background: #ffffff;
      border-radius: 3px;
      display: flex;
      padding: 10px;
      .mhealth-mleft{
        width:72%;
        padding-right: 5px;
        padding-bottom: 5px;
        p{
          min-height: 40px;
          font-size: 14px;
          color: #333333;
          margin-bottom: 10px;
          position: relative;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          display: -moz-box;
          -moz-line-clamp:2 !important;
          -moz-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span{
          font-size: 12px;
          color: #666666;
        }
      }
      .mhealth-mRight{
        flex:1;
        background: red;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .mhealth-m{
    padding-top:44px;
  }
</style>
