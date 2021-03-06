const map = new Map([
  ['key1', 'π'],
  ['key2', ['π']]
]);
console.log(map); // Map(2) { 'key1' => 'π', 'key2' => [ 'π' ] }

// μ¬μ΄μ¦ νμΈ
console.log(map.size);

// μ‘΄μ¬νλμ§ νμΈ
console.log(map.has('key1')); // true
console.log(map.has('key2')); // true

// μν
map.forEach((value, key) => console.log(key, value));
console.log(map.keys());
console.log(map.values());
console.log(map.entries());

// μ°ΎκΈ°
console.log(map.get('key1'));
console.log(map.get('key2'));
console.log(map.get('key3'));

// μΆκ°
map.set('key3', 'π');
console.log(map); // Map(3) { 'key1' => 'π', 'key2' => [ 'π' ], 'key3' => 'π' }

// μ­μ 
map.delete('key3');
console.log(map);

// μ λΆμ­μ 
map.clear();
console.log(map);

// μ€λΈμ νΈμμ ν° μ°¨μ΄μ ?
const key = { name: 'milk', price: 10 };
const milk = { name: 'milk', price: 10, decription: 'λ§μλμ°μ ' };
const obj = {
  [key]: milk
};
console.log(obj); // { '[object Object]': { name: 'milk', price: 10, decription: 'λ§μλμ°μ ' } }
const map2 = new Map([[key, milk]]);
console.log(map2); // Map(1) { { name: 'milk', price: 10 } => { name: 'milk', price: 10, decription: 'λ§μλμ°μ ' }}
console.log(obj[key]); // { name: 'milk', price: 10, decription: 'λ§μλμ°μ ' }
console.log(map2[key]); // undefined
console.log(map2.get(key)); // { name: 'milk', price: 10, decription: 'λ§μλμ°μ ' } getμ μ΄μ©ν΄μΌ keyμ κ°μ μ»μμ μλ€.
