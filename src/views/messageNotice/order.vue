<template>
  <div class="mhealth-body">
    <mt-header title="订单消息" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <ul class="mhealth-m">
      <li>
        <div class="mhealth-time">
          <span>2018-04-20 20:11:26</span>
        </div>
        <div class="mhealth-mess">
          <i></i>
          <div class="mhealth-messRight">
            <div class="mhealth-messRc">
              <h5>订单状态变更通知</h5>
              <div>
                <b>药品订单支付成功，请耐心等候配送</b>
                <p>你可以进入我的>订单详情中，查看配送物流信息。</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
  @import '../../styles/mixin.less';
  .mhealth-body{
    width: 100%;
    height: 100%;
    background-color: #ededed;
  }
  .mhealth-m{
    width:100%;
    padding-top: 44px;
    li{
      .mhealth-time{
        display: flex;
        justify-content: center;
        align-items: center;
      }
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
    .mhealth-mess{
      display: flex;
      margin-top:10px;
      i{
        width:10px;
        height: 10px;
        margin:10px 10px;
        border-radius: 50%;
        background-color: #bfbfbf;
      }
      .mhealth-messRight{
        flex:1;
        .mhealth-messRc{
          width:95%;
          background: #ffffff;
          border-radius: 10px;
          padding: 10px 15px 20px;
        }
      }
      h5{
        font-size: 14px;
        line-height: 30px;
        letter-spacing: 0;
        color: #888888;
        border-bottom: 1px solid #dfdfdf;
      }
      b{
        display: block;
        margin-top: 6px;
        font-size: 15px;
        color: @green-color;
        font-weight: 500;
      }
      p{
        font-size: 13px;
        margin-top:6px;
        color: #333333;
      }
    }
  }
</style>
