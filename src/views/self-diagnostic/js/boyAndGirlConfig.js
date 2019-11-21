// 男士
export function boyConfig() {
  return {
    head: {
      se: 'one',
      nm: 'head',
      bodyPic: 1,
      headPosition: ['头部', '眼睛', '鼻子', '耳朵', '口腔', '咽喉', '颈椎'],
    },
    neck: {
      se: 'one',
      nm: 'neck',
      bodyPic: 1,
      headPosition: ['头部', '眼睛', '鼻子', '耳朵', '口腔', '咽喉', '颈椎'],
    },
    chest: {
      se: 'two',
      nm: 'chest',
      bnm: 'bchest',
      bodyPic: 2,
      headPosition: ['呼吸道', '肺', '胸部', '心脏', '肝', '胃', '肾', '腰腹部', '肠']
    },
    belly: {
      se: 'two',
      nm: 'belly',
      bnm: 'sex',
      bodyPic: 2,
      headPosition: ['呼吸道', '肺', '胸部', '心脏', '肝', '胃', '肾', '腰腹部', '肠']
    },
    sex: {
      se: 'three',
      nm: 'sex',
      bnm: 'sex_',
      bodyPic: 3,
      headPosition: ['膀胱', '生殖器']
    },
    foot: {
      nm: 'foot'
    },
    hand: {
      nm: 'hand',
      bnm: 'belly'
    }
  };
}
// 女士
export function girlConfig() {
  return {
    head: {
      nm: 'head',
      bodyPic: 4,
      se: 'four',
      headPosition: ['头部', '眼睛', '鼻子', '耳朵', '口腔', '咽喉', '颈椎'],
    },
    neck: {
      se: 'four',
      nm: 'neck',
      bodyPic: 4,
      headPosition: ['头部', '眼睛', '鼻子', '耳朵', '口腔', '咽喉', '颈椎'],
    },
    chest: {
      se: 'five',
      nm: 'chest',
      bnm: 'bchest',
      bodyPic: 5,
      headPosition: ['呼吸道', '肺', '胸部', '心脏', '肝', '胃', '肾', '腰腹部', '肠']
    },
    belly: {
      se: 'five',
      nm: 'belly',
      bnm: 'sex',
      bodyPic: 5,
      headPosition: ['呼吸道', '肺', '胸部', '心脏', '肝', '胃', '肾', '腰腹部', '肠']
    },
    sex: {
      se: 'three',
      nm: 'sex',
      bnm: 'sex_',
      bodyPic: 6,
      headPosition: ['膀胱', '生殖器']
    },
    foot: {
      nm: 'foot'
    },
    hand: {
      nm: 'hand',
      bnm: 'belly'
    }
  };
}