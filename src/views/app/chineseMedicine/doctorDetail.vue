<template>
<div class="medicalOnline" :class="from!=='app'?'pdt45':''">
  <div class="header" v-if="from !== 'app'">
    <span onclick="history.go(-1)" class="icon"></span>
    <h2>
      国医在线
    </h2>
  </div>
  <div class="main" :class="from==='app'?'nulltop':''">
    <div class="banner"  v-if="detailData">
      <div class="content">
        <div class="img-class"><img :src="detailData.photo_path" alt="" class="portrait"></div>
        <h4>{{detailData.doctor_name}}</h4>
        <h5>{{detailData.title}}</h5>
      </div>
    </div>
    <div class="txt"  v-if="detailData">
      <h3>医生介绍</h3>
      <p>
        {{detailData.description}}
      </p>
      <h3>擅长</h3>
      <p>
        {{detailData.expert}}
      </p>
    </div>
    <div class="listWrapper"  v-if="detailData">
      <ul>
        <li v-for="item in detailData.appointments" :key="item.index">
          <div class="time">
            <p class="day">{{item.day}}</p>
            <p class="week">{{item.week}}</p>
          </div>
          <div class="shop">{{item.hospital}}</div>
          <a :href='"tel:"+detailData.tel' class="preconditioning" v-if="item.status==1">预约</a>
          <a v-else></a>
        </li>
      </ul>
    </div>
  </div>
  <a :href='"tel:"+detailData.tel' class="tel"  v-if="detailData">
    电话预约
  </a>
</div>
</template>

<script>
import ajax from '@/utils/ajax';
import { getQueryString } from '@/utils/index';
export default {
  data() {
    return {
      from: '',
      Id: this.$route.query.id ? this.$route.query.id : 4,
      detailData: null
    };
  },
  methods: {
    // 请求商品列表数据的请求
    getData() {
      ajax.get('/api/medicine/getFamousDoctorDetail/' + this.Id).then(data => {
        console.log(data);
        if (data.status === 200) {
          this.detailData = data.data;
        }
      });
    },
  },
  created() {
    let _self = this;
    let from = getQueryString('from');
    _self.from = from;
    // 获取商品列表数据
    this.getData();
  }
};
</script>

<style scoped lang="less">
.img-class{
  width: 70px;
  height: 70px;
  position: relative;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #fff;
}
.pdt45 {
  padding-top: 45px;
}
.medicalOnline{
  height: 100%;
  position: relative;
  background: #fff;
  .header{
    height: 45px;
    border-bottom: 1px solid #e2e3e7;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    .icon{
      display: flex;
      width: 18px;
      height: 18px;
      background: url(./img/icon_03.jpg);
      background-size: 100% 100%;
      position: absolute;
      top: 15px;
      left: 15px;
    }
    h2{
      font-size: 19px;
      color: #baa189;
      font-weight: normal;
    }
  }
  .main{
    position: absolute;
    width: 100%;
    top: 45px;
    bottom: 47px;
    left: 0;
    right: 0;
    overflow: auto;
  }
  .nulltop{
    top: 0;
  }
  .banner{
    width: 100%;
    height: 158px;
    background: url(./img/bg-2.png);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content{
      width: 70px;
      height: 110px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .portrait{
        width: 70px;
        height: 100%;
      }
      h4{
        width: 70px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-weight: normal;
        color: #ffffff;
        margin-top: 5px;
      }
      h5{
        width: 70px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-size: 12px;
        font-weight: normal;
        color: #d6d6d6;
        margin-top: 0px;
      }
    }
  }
  .txt{
    padding: 0 10px;
    margin-bottom: 15px;
    h3{
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
    }
    p{
    font-size: 13px;
    font-weight: normal;
    line-height: 15px;
    color: #727272;
    }
  }
  .listWrapper{
    padding: 0 10px;
    margin-bottom: 40px;
    >ul{
      padding: 0 10px;
      border-radius: 4px;
      border: solid 1px #e6e6e6;
      >li{
        height: 45px;
        border-bottom: 1px solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: normal;
        color: #000000;
        .time{
          width: 62px;
          p{
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
        .preconditioning{
          width: 45px;
          height: 22px;
          background-color: #baa189;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color:#fff;
        }
      }
      >li:last-child{
        border: none;
      }
    }
  }
  .tel{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 47px;
    background: #bba18a;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
}
</style>
