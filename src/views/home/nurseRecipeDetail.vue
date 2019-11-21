<template>
  <div id="nurseRecipeDetail">
    <mt-header title="睡不着">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="tap-graphic">
      <div class="article-item border-bottom continue-read textOverflow-tip">
        <p>再次看床头的表。。。。已经躺下很久了，怎么还是醒着？</p>
        <p>无论多么厌倦却依然难以入睡？睡不着哦啊！一个失眠的夜晚睡不着或者</p>
      </div>
      <div class="tap-graphic">
        <div class="head graphic">
          <div class="icon-doubt"></div>
          <div class="title">形成原因？</div>
          <div class="turn-icon"></div>
        </div>
        <div class="item">
          <div class="article-item  ">
            <p>压力大、睡眠习惯不好、身体紧张等原因，都有可能导致睡不着、梦多、睡不醒、睡不成等睡眠困扰。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="tap-graphic">
      <div class="head graphic">
        <div class="icon-doctor"></div>
        <div class="title">何时就医</div>
        <div class="turn-icon"></div>
      </div>
      <div class="item ">
        <div class="article-item ">
          <p>压力大、睡眠习惯不好、身体紧张等原因，都有可能导致睡不着、梦多、睡不醒、睡不成等睡眠困扰。</p>
        </div>
      </div>
    </div>
    <div class="tap-graphic">
      <div class="head graphic">
        <div class="icon-cafe"></div>
        <div class="title">生活建议</div>
        <div class="turn-icon"></div>
      </div>
      <div class="item hide">
        <div class="article-item ">
          <p>压力大、睡眠习惯不好、身体紧张等原因，都有可能导致睡不着、梦多、睡不醒、睡不成等睡眠困扰。</p>
        </div>
      </div>
    </div>
    <div class="tap-box">
      <div class="tap-graphic">
        <div class="head">
          <div class="title">酸枣安神汤</div>
          <div class="check-detail">
            <div class="mes">查看详情</div>
            <div class="turn-icon-small"></div>
          </div>
        </div>
        <div class="item">
          <div class="article-item " style="padding: 0 5px 10px 5px">
            <p>压力大、睡眠习惯不好、身体紧张等原因，都有可能导致睡不着、梦多、睡不醒、睡不成等睡眠困扰。</p>
          </div>
        </div>
        <div class="item">
          <div class="box-one ">
            <div class="box-left">
              <img src="./imgs/szast.png" alt="">
            </div>
            <div class="box-right">
              <div class="box-head sigleTextOverflow">酸枣茯苓冲调粉 调理脾胃 改善jglkejlgkjelkgjlk</div>
              <div class="box-min">
                <div class="buttom">养心</div>
                <div class="buttom">安神</div>
                <div class="buttom">益气和胃</div>
              </div>
              <div class="box-bottom">
                <div class="prive"><span class="RMB"></span>55.00</div>
                <div class="icon-shopCar"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blank-content">
      <inquiryEntrance></inquiryEntrance>
    </div>
  </div>
</template>
<script>
import { Header }  from 'mint-ui';
import inquiryEntrance  from '@/components/inquiryEntrance/index.vue';
export default {
  name: 'nurseRecipeDetail',
  components: {
    'mt-header': Header,
    'inquiryEntrance': inquiryEntrance
  },
};
</script>
<style lang="less" scoped>
  @import "../../styles/mixin.less";
  @page-back-color: #EFEFF4;
  @title-size: 17px;
  @light-blue-color: #8CD2FE;
  // 通用css
  .textOverflow-tip {
    .multipleTextOverflow(85px, 0 80px 4px 5px, #FFF);
  }
  .continue-read:after {
    color: #000;
    content: "继续阅读";
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    padding: 0 15px 4px 15px;
    text-decoration: underline;
  }
  #nurseRecipeDetail {
    font-size: 14px;
    color: #666;
    background-color: @page-back-color;
  }
  .border-bottom {
    border-bottom: solid 1px #E6E6E6;
  }
  .tap-graphic {
    padding-left: 5px;
    background-color: #FFF;
    border-bottom: solid 1px #E6E6E6;
    /* 内容框 */
    .article-item {
      padding: 10px 5px;
      p {
        line-height: 20px;
        + p {
          margin-top: 10px;
        }
      }
    }
    /* 头部 */
    .head {
      display: flex;
      height: 50px;
      justify-content: space-between;
      align-items: center;
      &.graphic {
        border-bottom: 1px solid #E6E6E6;
      }
      .title {
        color: #666;
        font-size: @title-size;
        flex-grow: 1;
        margin-left: 5px;
      }
      .turn-icon {
        position: relative;
        margin-right: 20px;
        bottom: 5px;
      }
      .check-detail {
        .mes {
          display: inline-block;
        }
        color: #CCC;
      }
      .turn-icon-small {
        position: relative;
        margin-right: 20px;
      }
    }
  }
  .tap-box {
    margin-top: 10px;
    .box-one {
      display: flex;
      .box-left {
        width: 28%;
        margin-right: 2%;
        img {
          width: 100px;
          height: 70px;
          border: 1px solid #CCC;
        }
      }
      .box-right {
        width: 70%;
        .box-head {
          font-size: @title-size;
        }
        .box-min {
          display: flex;
          margin: 10px 0 0 0;
          .buttom {
            border: 1px solid @light-blue-color;
            font-size: 12px;
            padding: 0 5px;
            margin-right: 10px;
            color: @light-blue-color;
          }
        }
        .box-bottom {
          position: relative;
          font-size: @title-size;
          padding: 10px 10px 10px 0;
          .RMB:before {
            display: inline-block;
            content: "¥";
            margin-right: 5px;
            font-size: 15px;
          }
          .icon-shopCar {
            position: absolute;
            right: 10px;
            top: 0
          }
        }
      }
    }
  }
  .blank-content {
    height: 180px;
    background-color: #FFF;
  }
  /*图标*/
  [class^="icon-"] {
    margin: 0 5px;
  }
  .icon-doubt {
    .icon-construction("./imgs/icon-xcyy@2x.png", 20px);
  }
  .icon-doctor {
    .icon-construction("./imgs/icon-hsjy@2x.png", 20px);
  }
  .icon-cafe {
    .icon-construction("./imgs/icon-shjy@2x.png", 20px);
  }
  .icon-shopCar {
    .icon-construction("./imgs/icon-gwcj@2x.png", 20px);
  }
</style>

