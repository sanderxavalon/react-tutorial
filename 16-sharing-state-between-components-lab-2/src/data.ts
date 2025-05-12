export function filterItems(items: { id: number; name: string; description: string }[], query: string) {
    query = query.toLowerCase();
    return items.filter(item =>
      item.name.split(' ').some(word =>
        word.toLowerCase().startsWith(query)
      )
    );
  }
  
  export const foods = [{
    id: 0,
    name: 'Sushi',
    description: '壽司是一道傳統的日本料理，由醋飯製成'
  }, {
    id: 1,
    name: 'Dal',
    description: '最常見的豆類烹飪方式是做成湯，可以加入洋蔥、番茄和各種香料'
  }, {
    id: 2,
    name: 'Pierogi',
    description: '波蘭餃子是一種餡料餃子，用未發酵的麵團包裹鹹味或甜味餡料，然後在沸水中煮熟'
  }, {
    id: 3,
    name: 'Shish kebab',
    description: '烤肉串是一道受歡迎的菜餚，由串在籤子上並烤製的肉塊組成'
  }, {
    id: 4,
    name: 'Dim sum',
    description: '點心是廣東人在傳統上在餐廳享用早餐和午餐時食用的一系列小菜'
  }];
  