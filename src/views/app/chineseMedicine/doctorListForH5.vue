<template>
  <div id="doctorCNOnline">
    <mt-header fixed title="国医在线">
      <i @click="$router.go(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </i>
    </mt-header>
    <div class="page">
      <ul class="doctorList" v-infinite-scroll="getDoctorCNList" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <div class="item" v-for="item in doctorList" :key="item.id">
          <div class="left"><img :src="item.photo_path" alt=""></div>
            <div class="right">
              <div class="R-top">
                <div class="R-T-left">
                  <h1 font-family="mFont">{{item.doctor_name}}</h1>
                  <h2>{{item.main_hospital}}</h2>
                  <h2>{{item.hospital}}</h2>
                  <h3>{{item.title}}</h3>
                  <h3>{{item.depart}}</h3>
                </div>
                <div class="btn-order" @click="order(item.id)"></div>
              </div>
              <div class="R-bottom">{{item.expert}}</div>
            </div>
          </div>
          <div class="end" v-if="nodata">没有数据了...</div>
      </ul>
    </div>
  </div>
</template>
<style lang="less" scoped="">
@font-face {
  font-family: mFont;
  src: url('./font/hwxk.ttf');
}

@subColor: #967D72;

#doctorCNOnline {
  .header {
    position: fixed;
    height: 45px;
    border-bottom: 1px solid #E2E3E7;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    background: #FFF;

    .icon {
      display: flex;
      width: 18px;
      height: 18px;
      background: url(./img/icon_03.jpg);
      background-size: 100% 100%;
      position: absolute;
      top: 15px;
      left: 15px;
    }

    h2 {
      font-size: 19px;
      color: #BAA189;
      font-weight: normal;
    }
  }

  .page {
    padding: 49px 5px 5px 5px;
  }

  .item {
    width: 100%;
    height: 180px;
    background: url(./img/bg.png);
    background-size: 100% 100%;
    background-position: center;
    padding: 10px 10px 10px 10px;
    display: flex;
    margin-bottom: 5px;

    .left {
      display: flex;
      width: 100px;
      flex-shrink: 0;
      background-color: #D9D9D9;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .right {
      display: flex;
      padding: 0 0 0 10px;
      flex-direction: column;
      justify-content: space-around;
      flex-grow: 1;

      .R-top {
        display: flex;
        justify-content: space-between;

        .R-T-left {
          display: flex;
          flex-shrink: 1;
        }

        h1 {
          width: 39px;
          word-wrap: break-word;
          letter-spacing: 15px;
          font-size: 25px;
          line-height: 28px;
          color: red;
          font-family: mFont;
          font-weight: lighter;
        }

        h2 {
          width: 22px;
          font-size: 13px;
          line-height: 15px;
          font-weight: lighter;
          word-wrap: break-word;
          letter-spacing: 20px;
        }

        h3 {
          width: 22px;
          font-size: 12px;
          line-height: 15px;
          font-weight: lighter;
          word-wrap: break-word;
          letter-spacing: 20px;
          color: #967D72
        }

        .btn-order {
          /* position: absolute;
             right: 20px;*/
          height: 50px;
          width: 50px;
          background: url("./img/yuyue.png");
          background-size: 100% 100%;
          background-position: center;
          flex-shrink: 0;
        }
      }

      .R-bottom {
        width: 100%;
        height: 70px;
        font-size: 12px;
        background: url(./img/bk.png);
        background-size: 100% 100%;
        background-position: center;
        padding: 10px 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 27px;
      }
    }
  }

  .end {
    text-align: center;
  }
}

</style>
<script>
import ajax from '@/utils/ajax';
export default {
  data() {
    return {
      doctorList: [],
      loading: false,
      PageIndex: 1,
      nodata: false,
    };
  },
  methods: {
    getDoctorCNList() {
      this.loading = true; // 當值為ture時,禁止加載...
      let url = 'api/medicine/getFamousDoctorList';
      ajax.post(url, { PageIndex: this.PageIndex, PageSize: 10 }).then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          if (res.data.code === 0 && this.doctorList.length < res.data.recordscount) {
            this.doctorList = [...this.doctorList, ...res.data.data];
            this.PageIndex++;
            this.loading = false;
          }
          if (res.data.code === 0 && res.data.data.length <= 0) {
            this.nodata = true;
          }
        }
      });
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        let last = this.list[this.list.length - 1];
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i);
        }
        this.loading = false;
      }, 2500);
    },
    order(id) {
      this.$router.push({
        path: '/chineseMedicine/doctorDetail',
        query: {
          id: id,
          from: 'app'
        }
      });
    }
  },
  mounted() {
    this.getDoctorCNList();
  }
};

</script>
