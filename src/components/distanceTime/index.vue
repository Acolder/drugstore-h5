<template>
  <div>{{distanceTxt}}</div>
</template>
<script>
import { getCoordinate, distanceByLnglat, distanceTime } from '@/api/coordinate';
export default {
  data() {
    return {
      distanceTxt: ''
    };
  },
  props: {
    location: Object
  },
  mounted() {
    this.getgetDistance();
  },
  methods: {
    getgetDistance() {
      let _self = this;
      getCoordinate((result) => {
        if (result.latitude) {
          const s = distanceByLnglat(result.longitude, result.latitude, _self.location.longitude, _self.location.latitude);
          const dt = distanceTime(s);
          _self.distanceTxt = dt.hintTxt;
        }
      });
    }
  }
};

</script>
