<template>
  <div class="focusBox">
    <div>
      <img src="./img/pla_icon_moreth@3x.png" alt="" class="ewm">
    </div>
    <div>
      <h5>扫码关注“康美药葫芦”公众号</h5>
    </div>
    <div>
      <h5 class="twop">获取脉诊报告</h5>
    </div>
    <div>
      <div class="pbox">
        <p>查看脉诊报告，操作步骤：
          <br>
          1.关注“康美药葫芦”公众号,收到脉诊报告链接,点击查看；
          <br>
          2.绑定脉诊检测人手机号，查看就诊检测报告。
          <br>
          3.点击公众号底部菜单"脉诊报告"。
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .focusBox{
    width:100%;
    height:100%;
    background: url("./img/pla_background@3x.png") no-repeat;
    background-size: cover;
  }
  .focusBox>div{
    width:100%;
    display: flex;
    justify-content: center;
  }
  .ewm{
    width:210px;
    height:210px;
    border: 7px solid #c5d0a8;
    margin-top: 80px;
  }
  h5{
    width:210px;
    font-size: 15px;
    font-weight: normal;
    color: #665120;
    margin-top:15px;
    text-align: center;
  }
  .twop{
    margin-top:0;
  }
  .pbox{
    margin-top:53px;
    width:90%;
    padding:17px 13px;
    background-color: rgba(255, 255, 255,0.4);
    p{
      font-size: 13px;
      color: #7d8a55;
    }
  }
</style>
