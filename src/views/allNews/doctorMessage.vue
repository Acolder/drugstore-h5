<template>
  <div class="doctorMessage">
    <mt-header fixed title="医生消息">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <ul class="doctorMessage-main" v-if="newsList.length>0">
      <!-- <li v-for="item in newsList" :key="item.index"  @click="jump(item)"> -->
      <li v-for="item in newsList" :key="item.index">
        <div class="doctorMessage-left">
          <span></span>
          <i class="circle"></i>
        </div>
        <div class="doctorMessage-right">
          <div class="doctorMessage-time">
            <span>{{item.createdtime}}</span>
          </div>
          <div class="doctorMessage-reply">
            <h5>{{item.title}}</h5>
            <b>{{item.content}}</b>
            <p>{{item.prompt}}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="none-data" v-else>
      <div class="none-dataImg"></div>
      <div class="none-til">暂无消息~</div>
    </div>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      allNews: {
        categoryId: this.$route.query.id ? this.$route.query.id : 1,
        pageIndex: 0,
        pageSize: 12
      },
      newsList: []
    };
  },
  methods: {
    // jump(item) {
    //   console.log(item);
    //   window.location.href = '/inquiry/consultPharmacist?targetId=' + item.relationid + '&doctorName=' + item.doctorname;
    //   // this.$router.push('/allNews/doctorMessage');
    // }
  },
  created() {
    ajax.get('/api/message/getmessagelist?categoryId=0&pageSize=999&pageIndex=0').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        // console.log('categoryId=0', data.data.data);
      }
    });
    // 医生消息
    ajax.get('/api/message/getmessagelist?categoryId=1&pageSize=999&pageIndex=0').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        console.log(data.data.data);
        this.newsList = data.data.data;
      }
    });
    // 健康头条
    ajax.get('/api/message/getmessagelist?categoryId=2&pageSize=999&pageIndex=0').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        // console.log('categoryId=2', data.data.data);
      }
    });
    // 订单消息
    ajax.get('/api/message/getmessagelist?categoryId=3&pageSize=999&pageIndex=0').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        // console.log('categoryId=3', data.data.data);
      }
    });
  }
};
</script>


<style scoped lang="less">
@import '../../styles/mixin.less';
.doctorMessage{
  background: #ededed;
  padding-top: 44px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9;
}
.none-data{
  position: absolute;
  background: #fff;
  top: 44px;
  bottom: 0;
  left: 0;
  width: 100%;
  .none-dataImg{
    margin-top: 120px;
    width: 100%;
    height: 190px;
    background: url(./imgs/iconlh-zwxx@2x.png);
    background-size: 100% 100%;
  }
  .none-til{
    margin-top: 30px;
    text-align: center;
    color: #666666;
  }
}
.doctorMessage-main{
  height: 100%;
  overflow: auto;
  >li{
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    .doctorMessage-left{
      padding-top:50px;
      margin-right: 10px;
      position: relative;
      .circle{
        display: inline-block;
        width:12px;
        height: 12px;
        border-radius: 50%;
        background-color: #bfbfbf;
      }
      span{
        position: absolute;
        display: block;
        width: 1px;
        height: 100%;
        background: #d2d2d2;
        left: 6px;
        z-index: -1;
        top: 55px
      }
    }
    .doctorMessage-right{
      flex: 1;
      .doctorMessage-time{
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
          span{
          height: 20px;
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
      .doctorMessage-reply{
        margin-top:10px;
        background: #ffffff;
        border-radius: 10px;
        padding: 10px 15px 20px;
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
          font-size: 12px;
          margin-top:6px;
          color: #333333;
        }
      }
    }
  }
}
</style>
