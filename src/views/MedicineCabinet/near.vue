<template>
  <div class="checkDrug-header">
    <mt-header fixed title="附近药柜">
      <a slot="left" @click="$router.go(-1);">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div id="allmap"></div>
    <div class="returnSelfIcon" @click="returnSelf">
      <img src="./img/con_xh_dw@3x.png" alt="">
    </div>
    <footer>
      <div  v-if="!nearDetailShow">
        <div class="near-title">
          <div>
            <img src="./img/icon_ckqbyg.png" alt="">
            <p>查看全部药柜（{{content.length}}台）</p>
          </div>
          <div class="iconImg">
            <img src="./img/icon_xss.png" alt="" class="needShow" v-show="needShow" @click="needShowMore">
            <img src="./img/icon_xx.png" alt="" style="display: none"  v-show="!needShow" @click="needShowMore">
          </div>
        </div>
        <div class="near-ul" v-show="!needShow" >
          <ul>
            <li v-for="(item,index) in content" :key="item.seller_user_Id" @click="poiChange(index)">
              <div>
                <span>{{item.seller_name}}</span>
                <i class="long" v-show="item.mdata == '>30'">>3km&nbsp;&nbsp;>30分钟</i>
                <i v-show="item.mdata !== '>30'">{{item.m}}&nbsp;&nbsp;{{item.mdata}}分钟</i>
              </div>
              <p>{{item.seller_address}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="nearDetail" v-if="nearDetailShow">
        <div class="nearImg">
          <img src="./img/xh_picture_yg.png" alt="">
        </div>
        <div class="nearDetailBot">
          <p v-show="content[oldNum].mdata == '>30'">药柜距离较远，超出步行取药范围，暂不能购买。</p>
          <img v-show="content[oldNum].mdata !== '>30'" src="./img/xh_icon_qgy.png" alt="" @click="goSee(content[oldNum].seller_user_Id, content[oldNum].seller_name, content[oldNum].m, content[oldNum].mdata, content[oldNum].seller_address, content[oldNum].lat, content[oldNum].lon)">
          <img v-show="content[oldNum].mdata == '>30'" src="./img/icon-yjfk.png" alt="" @click="goSee(content[oldNum].seller_user_Id, content[oldNum].seller_name, content[oldNum].m, content[oldNum].mdata, content[oldNum].seller_address, content[oldNum].lat, content[oldNum].lon)">
          <div class="nearLi">
            <div>
              <span>{{content[oldNum].seller_name}}</span>
              <i v-show="content[oldNum].mdata !== '>30'">{{content[oldNum].m}}&nbsp;&nbsp;{{content[oldNum].mdata}}分钟</i>
              <i v-show="content[oldNum].mdata == '>30'" class="redSpan">>3km&nbsp;&nbsp;>30分钟</i>
            </div>
            <p>{{content[oldNum].seller_address}}</p>
          </div>
        </div>
      </div>
    </footer>
    <loading :loadingShow="loadingShow"></loading>
  </div>
</template>
<script>
import BMap from 'BMap';
import selfIcon from './img/ic_a.png';
import iconCar from './img/xh_icon_ygzb@3x.png';
import BigIconCar from  './img/xh_icon_bigyg@3x.png';
import javaAjax from '@/utils/javaApiRequest';
import { getCoordinate, distanceByLnglat, distanceTime } from '@/api/coordinate.js';
import { Toast, MessageBox } from 'mint-ui';
import loading from '@/components/loading/index';
export default {
  data() {
    return {
      content: [],
      needShow: true,
      nearDetailShow: false,
      lat: 0,
      lon: 0,
      nowPoi: [],
      oldNum: null,
      nearDetail: null,
      map: null,
      selfPoi: null,
      nearhave: true,
      loadingShow: true,
      pointArray: null
    };
  },
  components: {
    MessageBox,
    Toast,
    loading
  },
  methods: {
    // F-1：获取所有药柜数据
    getInfo() {
      let that = this;
      let url = `${process.env.ES_BASE_HOST}/elasticsearch/batsearch/getCabineListNear`;
      let data = {
        lat: that.lat,
        lon: that.lon,
        version: '3.3.0',
      };
      return javaAjax.post(url, data);
    },
    // F-2：获取坐标，创建地图及poi
    getLat() {
      let that = this;
      return new Promise(function (resolve) {
        let coordinate = JSON.parse(sessionStorage.getItem('coordinate'));
        if (coordinate) {
          console.log(coordinate, '获取缓存');
          that.lat = coordinate.latitude;
          that.lon = coordinate.longitude;
          resolve(true);
        } else {
          getCoordinate((res) => {
            console.log(res, '当前定位获取');
            if (res.latitude) {
              that.lat = res.latitude;
              that.lon = res.longitude;
              resolve(true);
            } else if (res === 'cancel') {
              Toast('定位授权失败');
              // that.lat = 22.5618500000;
              // that.lon = 114.0344920000;
            }
          });
        }
      });
    },
    createbdMap() {
      let that = this;
      // F-1-1：获取经纬度;有设置过，取设置的数据，没有取当前定位
      // 百度地图API功能
      that.getLat().then(res => {
        if (res) {
          that.map = new BMap.Map('allmap');
          console.log(that.lat, that.lon, '当前经纬');
          let point = new BMap.Point(that.lon, that.lat);
          let selfIconPoi = new BMap.Icon(selfIcon, new BMap.Size(30, 30));
          selfIconPoi.imageSize = new BMap.Size(30, 30);
          selfIconPoi.anchor = new BMap.Size(15, 30);
          selfIconPoi = new BMap.Marker(point, { icon: selfIconPoi });
          that.map.addOverlay(selfIconPoi);
          that.selfPoi = point;
          // that.map.centerAndZoom(point, 15);
          // 缩放
          that.map.enableScrollWheelZoom(true);
          // 地图点击事件
          that.map.addEventListener('click', this.mapOld);
          //  F-2-1：确保数据加载完成后，生成地图坐标
          this.getInfo().then(function (data) {
            if (data.data.resultCode === '0') {
              console.log(data.data.resultData.content, '所有数据2');
              let content = data.data.resultData.content;
              for (let j = 0; j < content.length; j++) {
                let m = distanceByLnglat(content[j].lon, content[j].lat, that.lon, that.lat);
                let mdata = distanceTime(m);
                if (m <= 3000) {
                  content[j].m = mdata.distanceTxt;
                  content[j].mdata = mdata.time;
                } else {
                  content[j].m = '>3km';
                  content[j].mdata = '>30';
                }
                if (j === 0 && content[j].mdata === '>30') {
                  // 附近3km无药柜
                  console.log('附近3km无药柜');
                  that.nearhave = false;
                }
              }
              that.content = content;
              for (let i = 0; i < that.content.length; i++) {
                that.createPoi(that.content[i].lon, that.content[i].lat, that.content[i], i);
              }
              that.loadingShow = false;
              if (!that.nearhave) {
                MessageBox.confirm('', {
                  title: '提示',
                  message: '附近3公里内暂无药柜，不适合步行自提药品',
                  confirmButtonText: '查看最近药柜',
                  showCancelButton: true
                }).then(action => {
                  if (action === 'confirm') {
                    // 确认的回调
                    console.log(1);
                    that.poiChange(0);
                  }
                }).catch(err => {
                  if (err === 'cancel') {
                    // 取消的回调
                    console.log(2);
                  }
                });
              }
            }
          });
        }
      });
    },
    //  F-3：创建标注
    createPoi(lon, lat, label, index) {
      let that = this;
      let pt = new BMap.Point(lon, lat);
      this.myIcon = new BMap.Icon(iconCar, new BMap.Size(21, 21));
      this.myIcon.imageSize = new BMap.Size(21, 21);
      this.myIcon.anchor = new BMap.Size(10, 21);
      let marker = new BMap.Marker(pt, { icon: that.myIcon });
      that.nowPoi = new BMap.Label(index, { offset: new BMap.Size(20, 0) });
      // 设置地图缩放级别
      if (index === 0) {
        let selfPoint = that.selfPoi;
        let shopPoint = pt;
        let pointArray = [selfPoint, shopPoint];
        that.pointArray = pointArray;
        that.setViewPort(pointArray);
      }
      that.nowPoi.setStyle({ display: 'none' });
      marker.setLabel(that.nowPoi);
      that.content[index].chargerMarker = marker;
      that.map.addOverlay(marker);
      // F-3-1：标注点击事件,存oldnum,之前的标注数字，如果有将图标还原
      marker.addEventListener('click', function(e) {
        e.domEvent.stopPropagation();
        // 改变图标
        let tag = e.target.getLabel().content;
        that.poiChange(tag);
      });
    },
    // F-4：设置地图缩放级别，显示当前定位和最近的药柜
    setViewPort(pointArray) {
      let viewPort = this.map.getViewport(pointArray);
      this.map.centerAndZoom(viewPort.center, viewPort.zoom);
    },
    // F-5：点击坐标改变
    poiChange(tag) {
      let that = this;
      let BigIcon = new BMap.Icon(BigIconCar, new BMap.Size(50, 55));
      BigIcon.imageSize = new BMap.Size(50, 55);
      BigIcon.anchor = new BMap.Size(25, 55);
      // 如果有改变过的图标，将图标变为原样，如果没有，将现在的变为原样
      if (that.oldNum === null) {
        console.log('null');
      } else {
        console.log(that.oldNum, 'oldnum1执行回复');
        that.content[that.oldNum].chargerMarker.setIcon(that.myIcon);
      }
      that.oldNum = tag;
      that.content[tag].chargerMarker.setIcon(BigIcon);
      console.log(that.oldNum, 'oldnum2');
      that.map.panTo(new BMap.Point(that.content[tag].lon, that.content[tag].lat));
      that.needShow = false;
      that.nearDetailShow = true;
    },
    // F-6：查看药柜更多
    needShowMore() {
      this.needShow = !this.needShow;
    },
    // F-7：地图点击，拖拽，查看全部药柜缩回，地图恢复原样
    mapOld() {
      console.log('click');
      // alert('click');
      let that = this;
      this.needShow = true;
      this.nearDetailShow = false;
      if (that.oldNum === null) {
        return;
      } else {
        console.log(that.content[that.oldNum], that.myIcon);
        that.content[that.oldNum].chargerMarker.setIcon(that.myIcon);
        that.oldNum = null;
      }
    },
    // F-8：去看看
    goSee(machineId, seller_name, m, mdata, seller_address, lat, lon) {
      this.$router.push({
        path: `/MedicineCabinet/CheckDrug`,
        query: {
          machineId: machineId,
          seller_name: seller_name,
          m: m,
          mdata: mdata,
          seller_address: seller_address,
          lat: lat,
          lon: lon
        }
      });
    },
    // F-10：返回显示当前定位
    returnSelf() {
      this.setViewPort(this.pointArray);
    }
  },
  watch: {
  },
  mounted() {
    this.createbdMap();
  }
};
</script>
<style lang="less" scoped>
  .checkDrug-header{
    height: 100%;
  }
  #allmap{
   position: fixed;
    top:44px;
    /*bottom: 50px;*/
    left:0;
    right: 0;
    height: ~"calc(100% - 94px)";
  }
  #allmap img {
    max-width: inherit;
  }
  .returnSelfIcon{
    width:40px;
    height: 40px;
    bottom: 60px;
    right: 10px;
    position: fixed;
    z-index: 8;
    img{
      width:100%;
      height: 100%;
    }
  }
  footer{
    box-shadow: 0 0px 20px rgb(219, 216, 216);
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 10;
    width:100%;
    background: #ffffff;
    .near-title{
      width:100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 50px;
      div{
        display: flex;
        align-items: center;
        img{
          width:20px;
          height: 20px;
          margin-left: 10px;
          margin-right: 11px;
        }
        p{
          font-size: 17px;
          color: #333333;
        }
      }
      .iconImg{
        width:40px;
        height: 100%;
        img{
          width: 20px;
          height:10px;
          margin-right: 10px;
        }
      }
    }
    .near-ul{
      max-height:300px;
      overflow: scroll;
      ul{
        width:100%;
      }
    }
    li,.nearLi{
      padding: 0 12px;
      border-top: 1px solid #e0e0e0;
      div{
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        span,i{
          font-size: 14px;
          color: #333333;
        }
        i.long{
          color: #f94f4f;
        }
      }
      p{
        width:80%;
        margin-top: 9px;
        font-size: 13px;
        color: #666666;
        margin-bottom: 15px;
      }
    }
    .nearDetail{
      width: 100%;
      .nearImg{
        width:100%;
        height:181px;
        img{
          width:100%;
          height:100%;
        }
      }
      .nearDetailBot{
        width:100%;
        position: relative;
        >p{
          height:25px;
          width:100%;
          line-height:25px;
          background-color: #fce7e0;
          font-size: 12px;
          color: #ff5962;
          padding-left: 10px;
        }
        >img{
          width:54px;
          height: 54px;
          position: absolute;
          right:10px;
          top:-30px;
        }
        .nearLi{
          border-top: none;
          div{
            justify-content: flex-start;
            i{
              margin-left: 15px;
            }
            i.redSpan{
              color: #ff5962;
            }
            p{
              width:100%;
            }
          }
        }
      }
    }
  }
</style>
