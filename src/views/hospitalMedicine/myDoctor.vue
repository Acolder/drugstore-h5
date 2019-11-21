<template>
  <div class="has-header my-doctor-page" :class="doctorList ? 'gray-background' : ''">
    <mt-header fixed title="我的医生">
      <!-- <a href="javascript:history.back(-1)" slot="left">
        <mt-button icon="back"></mt-button>
      </a> -->
    </mt-header>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadMore">
      <ul class="doctor-list">
        <li v-for="(doctorInfo, i) in doctorList" :key="doctorInfo[i]" @click="goDoctorDetail(doctorInfo.userid)" v-if="doctorList">
          <div class="pic-name">
            <span class="box">
              <img :src="doctorInfo.avatar" class="pic" />
              <label class="name">{{doctorInfo.realname}}</label>
            </span>
          </div>
          <div class="box-flex other-info">
            <div class="top display-box">
              <label class="box-flex info-name">{{doctorInfo.titlename}} | {{doctorInfo.hosname}}</label>
              <div class="consult-btn" @click.stop="goInquiry(doctorInfo.userid, doctorInfo.realname, doctorInfo.avatar)">咨询医生</div>
            </div>
            <p class="good-at">擅长: {{doctorInfo.expert}}</p>
          </div>
        </li>
      </ul>
    </mt-loadmore>
    <div class="no-more" v-show="showNoInfoMore">没有更多了</div>
    <div class="no-data" v-if="noData">
      <img src="./img/xh_icon_noddoctor.png" />
      <label class="txt">暂无医生~</label>
    </div>
  </div>
</template>
<script>
import { Header, Loadmore, Indicator, MessageBox } from 'mint-ui';
import ajax from '@/utils/ajax';
import wxjs from '@/utils/wxjsInterface';
import { getQueryString } from '@/utils/index';
import { wxConsultDoctor } from '@/api/wxConsultDoctor';
import { weixinLogin } from '@/api/user';
export default {
  data() {
    return {
      unionId: '',
      pageindex: 1,
      doctorList: null,
      allLoaded: false,
      showNoInfoMore: false,
      noData: false
    };
  },
  components: {
    'mt-header': Header,
    'mt-loadmore': Loadmore
  },
  beforeCreate() {
    Indicator.open();
  },
  created() {
    this.wxInterfaceInit();
  },
  methods: {
    wxInterfaceInit() {
      let _self = this;
      let code = getQueryString('code');
      wxjs.init(code).then((rs) => {
        if (rs) {
          let unionId = rs.wxconfig.unionid;
          if (unionId) {
            weixinLogin(unionId).then(() => {
              Indicator.close();
              this.unionId = unionId;
              this.getDoctorList();
            });
          } else {
            MessageBox.confirm('微信unionId获取失败，是否重试？', '提示').then(() => {
              _self.$router.push('/hospitalMedicine/doctorRedirect');
            });
          }
        } else {
          this.noData = true;
          this.showNoInfoMore = false;
        }
      });
    },
    // 获取医生列表
    getDoctorList() {
      if (!!this.unionId === false) {
        return false;
      }
      ajax.post('/api/user/getwxdoctorlist', {
        unionId: this.unionId,
        pageindex: this.pageindex,
        pagesize: 10
      }).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            let resData = res.data.data;
            let pagesCount = res.data.pagescount;
            if (resData) {
              this.doctorList = this.doctorList ? [...this.doctorList, ...resData] : resData;
              if (this.pageindex >= pagesCount) {
                this.allLoaded = true;
                this.showNoInfoMore = true;
              }
              else {
                this.allLoaded = false;
                this.showNoInfoMore = false;
              }
              if (pagesCount === 1 && resData.length < 7) {
                this.showNoInfoMore = false;
              }
            }
            else {
              this.noData = true;
              this.showNoInfoMore = false;
            }
          }
        }
      });
      // });
    },
    // 下拉刷新
    loadTop() {
      this.pageindex = 1;
      this.doctorList = [];
      this.getDoctorList();
      this.$refs.loadMore.onTopLoaded();
    },
    // 上拉加载更多
    loadBottom() {
      this.pageindex += 1;
      this.getDoctorList();
      this.$refs.loadMore.onBottomLoaded();
    },
    // 查看医生详情
    goDoctorDetail(doctorId) {
      sessionStorage.setItem('wxUnionId', this.unionId);
      this.$router.push({
        path: '/doctorDetail',
        query: {
          doctorid: doctorId,
          // unionId: this.unionId
        }
      });
    },
    // 咨询医生
    goInquiry(doctorId, realName, avatar) {
      wxConsultDoctor(this.unionId, doctorId, realName, avatar);
    }
  }
};

</script>
<style lang="less" scoped>
@import '../../styles/mixin.less';
.my-doctor-page{
  min-height: 100%;
}
.doctor-list{
  li {
    display: flex;
    margin-top: 10px;
    border-top: @border-line;
    border-bottom: @border-line;
    background: @white-color;
    .pic-name{
      display: flex;
      margin: 0 17px 0 10px;
      align-items: center;
      .pic{
        display: block;
        width: 46px;
        height: 46px;
        margin: 0 auto 4px;
        border-radius: 50%;
      }
      .name{
        display: block;
        overflow: hidden;
        width: 60px;
        height: 20px;
        line-height: 22px;
        font-size: 12px;
        text-align: center;
      }
    }
    .other-info{
      .top{
        height: 40px;
        padding-right: 15px;
        border-bottom: @border-line;
        align-items: center;
        .info-name{
          font-size: 13px;
          color: #888;
        }
        .consult-btn{
          .border-radius-btn(24px, 5px , @green-color, 4px, 14px);
          line-height: 22px;
        }
      }
      .good-at{
        min-height: 42px;
        line-height: 22px;
        margin: 10px 15px 12px 0;
        color: @color666;
        text-align: justify;
        word-break: break-all;
        .multi-text-overflow(2);
      }
    }
  }
}
.no-more{
  margin-top: 10px;
  text-align: center;
}
.no-data{
  color: @color666;
  text-align: center;
  img{
    display: block;
    width: 100%;
    margin: 92px auto 18px;
  }
}
</style>
