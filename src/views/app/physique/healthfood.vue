<template>
  <div id="page">
    <mt-header fixed title="养生药膳">
      <a href="javascript:;" slot="left" onClick="window.history.go(-1);">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <!--养生药食-->
    <div class="container">
      <h1 style="height: 25px"></h1>
      <!--康美人生-->
      <section class="box2" v-show="lists.data.life.length>0">
        <ul class="heartrate-box viscera-good">
          <div style="background: #FFF" class="box-nameout">
            <div class="boxname-left"></div>
            <div class="boxname">康美人生</div>
            <div class="boxname-right"></div>
          </div>
          <li v-for="good in lists.data.life" v-bind:key="good.id" @click.self="download">
            <p v-html="good.product_introduce">
            </p>
            <div class="viscera-goodImg">
              <img :src="good.product_pic" alt="">
              <div>
                <span>{{good.product_name}}</span>
                <p>{{good.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <!--养生药品-->
      <section class="box2" v-show="lists.data.product.length>0">
        <ul class="heartrate-box viscera-good" v-show="true">
          <div style="background: #FFF" class="box-nameout">
            <div class="boxname-left"></div>
            <div class="boxname">养生药品</div>
            <div class="boxname-right"></div>
          </div>
          <li v-for="good in lists.data.product" v-bind:key="good.id" @click.self="download">
            <h1>{{good.product_name}}</h1>
            <p v-html="good.product_introduce">
            </p>
            <div class="viscera-goodImg">
              <img :src="good.product_pic" alt="">
              <div>
                <span>{{good.product_name}}</span>
                <p>{{good.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <!--养生汤品-->
      <section class="box2" v-show="lists.data.soup.length>0">
        <ul class="heartrate-box viscera-good" v-show="true">
          <div style="background: #FFF" class="box-nameout">
            <div class="boxname-left"></div>
            <div class="boxname">养生汤品</div>
            <div class="boxname-right"></div>
          </div>
          <li v-for="good in lists.data.soup" v-bind:key="good.id" @click.self="download">
            <p v-html="good.product_introduce">
            </p>
            <div class="viscera-goodImg">
              <img :src="good.product_pic" alt="">
              <div>
                <span>{{good.product_name}}</span>
                <p>{{good.description}}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import { Toast } from 'mint-ui';
export default {
  name: 'healFood',
  data() {
    return {
      lists: {
        data: {
          life: [],
          soup: [],
          product: []
        }
      }
    };
  },
  created() {
    document.title = '健康';
  },
  mounted() {
    // 获取报告详情
    this.getReportResult();
  },
  methods: {
    // 获取报告信息
    getReportResult() {
      let _this = this;
      let name = this.$route.query.key;
      ajax.get(`api/jinmu/GetReportProductOrSoup/` + name).then(resp => {
        if (resp.status === 200 && resp.data.code === 0) {
          _this.lists = resp.data;
        }
        else {
          Toast(resp.data.message);
        }
      });
    },
    // 写入脉搏波
    // 养生阅读
  }
};
</script>
<style lang="less" scoped>
  html {
    height: auto;
    overflow: auto;
  }
  #page {
    height: 100%;
    &:before {
      height: 100%;
      width: 100%;
      content: ' ';
      position: fixed;
      z-index: -1;
      top: 0;
      left: 0;
      background: #FFF;
    }
  }
  /*总布局*/
  .container {
    width: 100%;
    height: 100%;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #EFF0E8;
    font-family: "SimHei";
    padding: 20px 0 0;
    .box2 {
      background-color: #FFF;
      margin: 15px 10px;
      border-radius: 10px;
      padding: 12px 10px;
      position: relative;
      h1 {
        font-size: 16px;
        font-weight: 400;
      }
    }
  }
  .heartrate-box {
    position: relative;
    border: solid 2px #EBEDDB;
    margin-top: 20px;
    h1 {
      font-weight: 17px;
      color: #665120;
    }
    .box-nameout {
      position: absolute;
      top: -11px;
      left: 50%;
      margin-left: -37px;
      display: flex;
      .boxname-left {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_left.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        white-space: nowrap;
        height: 20px;
        padding-left: 3px;
        padding-right: 3px;
        font-size: 15px;
        color: #333;
        background: url("./img/title_mid.png");
        background-position: 50% 100%;
        background-size: 100% 50%;
        background-repeat: no-repeat;
      }
      .boxname-right {
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/title_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .more-box {
      position: absolute;
      top: -11px;
      right: 13px;
      display: flex;
      height: 40px;
      width: 50px;
      background-color: #FFF;
      .more-bottom {
        position: absolute;
        width: 100%;
        height: 10px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_more_bg.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
      .boxname {
        position: absolute;
        right: 13px;
      }
      .more-right {
        position: absolute;
        top: -3px;
        right: 5px;
        width: 6px;
        height: 15px;
        background: #FFF;
        margin-top: 10px;
        background: url("./img/xh_arrow_right.png");
        background-size: 100%;
        background-repeat: no-repeat;
      }
    }
    .heartrate-imgSize {
      width: 49px;
      height: 22px;
      position: absolute;
      right: 15px;
    }
    .heartrate-boxAn {
      top: -11px;
    }
    .heartrate-boxUp {
      bottom: -11px;
    }
    .more {
      position: absolute;
      right: 15px;
      top: -13px;
      width: 58px;
      text-align: center;
      white-space: nowrap;
      height: 20px;
      padding-left: 3px;
      padding-right: 3px;
      font-size: 15px;
      color: #333;
      background: url("./img/title_mid.png");
      background-position: 50% 100%;
      background-size: 100% 50%;
      background-repeat: no-repeat;
    }
    .heartrate-content {
      line-height: 25px;
      margin: 18px 12px 20px;
      h6 {
        color: #665120;
        font-size: 17px;
      }
      p {
        color: #333;
        font-size: 15px;
        line-height: 25px;
      }
    }
    .pan {
      position: relative;
      /* &:after{
         font-size: 13px;
         content: ' ... ';
         display: inline-block;
         position: absolute;
         right: 7px;
         bottom: 0;
         color: #000;
         background: #fff;
         padding: 2px 4px;
       }*/
    }
  }
  .viscera-header {
    margin: 15px 10px;
    font-size: 15px;
    color: #333;
    ul {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      margin-top: 15px;
      &:after {
        display: block;
        content: ' ';
        clear: both;
      }
      li {
        text-align: center;
        width: 50%;
        img {
          width: 100px;
          height: 78.64px;
        }
        span {
          display: inline-block;
          text-align: center;
          font-size: 16px;
          color: #665120;
          margin-top: 10px;
          margin-bottom: 10px;
          width: 88px;
        }
      }
    }
  }
  .viscera-good {
    padding: 3px 15px 15px;
    li {
      margin-top: 15px;
      line-height: 25px;
      h6 {
        font-size: 17px;
        color: #665120;
      }
      p {
        font-size: 14px;
        color: #333;
      }
      .viscera-goodImg {
        display: flex;
        margin: 10px 0 0;
        img {
          width: 111px;
          height: 111px;
          background: #333;
          border: 1px solid #F3F3F3;
          border-radius: 3px;
        }
        div {
          flex: 1;
          padding-left: 15px;
          span {
            font-size: 17px;
            color: #333;
          }
          p {
            font-size: 15px;
            color: #77716A;
            line-height: 18px;
            margin-top: 5px;
          }
        }
      }
    }
  }
</style>
