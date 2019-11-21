<template>
  <div class="allNews">
    <mt-header fixed title="消息中心">
      <mt-button icon="back" slot="left" onclick="history.go(-1)"></mt-button>
    </mt-header>
    <ul class="allNews-main" v-if="allNewsList.length>0">
      <li v-for="item in allNewsList" :key="item.index" @click="doctorMessage(item.id)">
        <img src="./imgs/icon_pla_messagedoctor.png" alt="">
        <div>
          <div>
            <h2>{{item.categoryname}}</h2>
            <span>{{item.updatetime}}</span>
          </div>
          <p>{{item.content}}</p>
        </div>
      </li>
    </ul>
    <div class="none-data" v-else>
      <div class="none-dataImg"></div>
      <div class="none-til">暂无消息~</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      allNewsList: []
    };
  },
  methods: {
    // 跳转到医生信息页面
    doctorMessage(id) {
      this.$router.push('/allNews/doctorMessage');
    }
  },
  created() {
    // 医生消息，健康头条，订单消息
    ajax.get('/api/message/messagecategorylist').then(data => {
      if (data.status === 200 && data.data.code === 0) {
        this.allNewsList = data.data.data;
      }
    });
  }
};
</script>


<style scoped lang="less">
.allNews{
  padding-top: 44px;
  background: #fff;
  height: 100%;
  width: 100%;
}
.none-data{
  position: absolute;
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
.allNews-main{
  height: 100%;
  overflow: auto;
  background: #fff;
}
.allNews-main li{
  background: #fff;
  height: 90px;
  padding: 15px 12px;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img{
    width: 53px;
    height: 53px;
  }
  >div{
    margin-left: 18px;
    width: 100%;
    height: 100%;
    >div{
      display: flex;
      justify-content: space-between;
      h2{
        font-size: 15px;
        color: #000000;
      }
      span{
        margin-right: -10px;
        width: 80px;
        height: 16px;
        overflow: hidden;
        display: inline-block;
        color: #bcbbbb;
        transform: scale(0.8);
      }
    }
    p{
      color: #8c8c8c;
    }
  }
}
</style>
