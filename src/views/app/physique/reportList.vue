<template>
  <div class="reportList" id="reportList">
    <mt-header fixed title="我的脉诊报告">
      <mt-button icon="back" slot="left"></mt-button>
    </mt-header>
    <!-- <div class="list_wrapper">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false"
                   :bottomPullText="bottomText" ref="loadmore">
        <ul class="drug_list">
          <li class="item" v-for="item in reportList" :key="item.report_id" @click="checkDetail(item.record_id)">
            <div class="top">
              <span>检测人:{{item.tag_user}}</span>
              <span class="time">{{item.test_date}}</span>
            </div>
            <div class="body">
              <div>{{item.constitution}}</div>
              <div>{{item.viscera}}</div>
            </div>
          </li>
        </ul>
      </mt-loadmore>
    </div>-->
    <div class="item" v-for="item in reportList" :key="item.report_id" @click="checkDetail(item.record_id)">
      <div class="top">
        <span>检测人:{{item.tag_user}}</span>
        <span class="time">{{item.test_date}}</span>
      </div>
      <div class="body">
        <div>{{item.constitution}}</div>
        <div>{{item.viscera}}</div>
      </div>
    </div>
    <div class="no-data" v-if="noData">暂无数据~</div>
  </div>
</template>
<script>
import ajax from '@/utils/ajax';
import { Loadmore } from 'mint-ui';
import { getQueryString } from '@/utils/index';
import wxjs from '@/utils/wxjsInterface';
// import { weixinLogin } from '@/api/user';
export default {
  data() {
    return {
      reportList: [],
      PageIndex: 1,
      PageSize: 10,
      loading: false,
      allLoaded: false,
      bottomText: '上拉加载更多...',
      // phone: '18824654078',
      // phone: ''
      noData: false
    };
  },
  components: {
    'mt-loadmore': Loadmore,
  },
  created() {
    this.getReportList();
  },
  methods: {
    checkDetail(record_id) {
      this.$router.push({ path: `/physique/reportnew?record_id=` + record_id });
    },
    getReportList() {
      let code = getQueryString('code');
      wxjs.init(code).then((rs) => {
        if (rs) {
          let unionId = rs.wxconfig.unionid;
          if (unionId) {
            // weixinLogin(unionId).then(() => {
            let params = {
              phone: unionId,
              PageIndex: this.PageIndex,
              PageSize: this.PageSize,
            };
            ajax.post('/api/jinmu/getUserReportSimplePageList', params).then(data => {
              if (data.data.code === 0) {
                this.reportList = data.data.data.reports;
                this.noData = this.reportList.length === 0 && true;
              }
            });
            // });
          } else {
            this.$router.push('/physique/reportListRedirect');
          }
        }
      });
    },
    /*    async more() {
        this.PageIndex = this.PageIndex + 1;
        await this.getReportList();
      },
      loadTop: function () {
        this.PageIndex = 0;
        this.getReportList().then((res) => {
          this.$refs.loadmore.onTopLoaded();
        });
      },
      loadBottom: function () {
        this.more().then(() => {
          this.$refs.loadmore.onBottomLoaded();
        });
      },  */
  }
};
</script>
<style lang="less" scoped>
#reportList {
  background-color: #f2f2f2;
  height: 100%;
  overflow: scroll;
  padding-top: 44px;
}
.list {
  margin-top: 44px;
}
.item {
  background-color: #fff;
  margin-bottom: 10px;
}
.top {
  padding: 0 15px;
  border-bottom: 1px solid #999;
  display: flex;
  height: 35px;
  line-height: 35px;
  justify-content: space-between;
  .time {
    color: #999;
  }
  span {
    display: block;
  }
}
.body {
  padding: 5px 15px;
  font-size: 15px;
  line-height: 24px;
}
.list_wrapper {
  padding-top: 52px;
  /deep/ .drug_list {
    &.nomore {
      padding-bottom: 30px;
      li {
        &:last-child {
          position: relative;
          &:after {
            content: "没有更多了~";
            display: flex;
            width: 100%;
            height: 30px;
            background-color: #f8f8f8;
            position: absolute;
            bottom: -30px;
            left: 0;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
.no-data {
  margin-top: 60px;
  font-size: 16px;
  text-align: center;
}
</style>
