import { Toast } from 'mint-ui';
import ajax from '@/utils/ajax';
// unionId(微信unionId), Is_Default(是否默认就诊人 0不是 1是), DoctorId(医生id),
// real_name(医生姓名), avatar(医生头像), Description(病情描述)
export function wxConsultDoctor(unionId, doctorId, realName, avatar, hasBack) {
  let data = {
    UnionId: unionId,
    Is_Default: '1',
    DoctorId: doctorId,
    real_name: realName,
    avatar: avatar,
    Description: '',
  };
  console.log(JSON.stringify(data));
  ajax.post('/api/user/wxConsultDoctor', data).then(res => {
    console.log(res);
    if (res.status === 200) {
      let resCode = res.data.code;
      if (resCode === 0) {
        console.log(res);
        console.log(JSON.stringify(res.data.data));
        sessionStorage.setItem('consultData', JSON.stringify(res.data.data));
        sessionStorage.setItem('wxUnionId', unionId);
        window.location.href = `/inquiry/doing?consultType=1&hasback=${hasBack}`;
      }
      else {
        Toast(res.data.message);
      }
    }
  });
}
