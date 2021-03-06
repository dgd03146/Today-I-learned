const dog = { name: '์์ฐ', emoji: '๐ถ' };

console.log(Object.keys(dog)); // ๋ชจ๋  ํค๋ค์ ๋ํด์ ๋ฐฐ์ด๋ก ์ ๋ฌ
console.log(Object.values(dog)); // ๋ชจ๋  ๊ฐ์ ๋ํด์ ๋ฐฐ์ด๋ก ์ ๋ฌ
console.log(Object.entries(dog)); // ํค์ ๊ฐ์ pair๋ก ๋ฐ๊ณ  ์ถ๋ค๋ฉด ์ฌ์ฉ

console.log('name' in dog); // ํน์ ํ ํค๊ฐ ์๋์ง ์๋์ง ๊ฒ์ฌ
console.log(dog.hasOwnProperty('name')); // ํค๊ฐ ์๋์ง ์๋์ง ๊ฒ์ฌ

// ์ค๋ธ์ ํธ์ ๊ฐ๊ฐ์ ํ๋กํผํฐ๋ ํ๋กํผํฐ ๋์คํฌ๋ฆฝํฐ๋ผ๊ณ  ํ๋ ๊ฐ์ฒด๋ก ์ ์ฅ๋จ
const desriptors = Object.getOwnPropertyDescriptors(dog);
console.log(desriptors); /* {
  name: { value: '์์ฐ', writable: true, enumerable: true, configurable: true },
  emoji: { value: '๐ถ', writable: true, enumerable: true, configurable: true }
}*/

const desc = Object.getOwnPropertyDescriptor(dog, 'name'); // ํ๋๋ง ๋ฐ์์ฌ ์ ์์
console.log(desc);
/*{ value: '์์ฐ', writable: true, enumerable: true, configurable: true }*/

Object.defineProperty(dog, 'name', {
  value: '๋ฉ๋ฉ',
  writable: false,
  enumerable: false,
  configurable: false
});

console.log(dog.name); // ๋ฉ๋ฉ
console.log(Object.keys(dog)); // [ 'emoji' ] name์ด๋ผ๋ ํค๋ ์ด๊ฑฐ๋ฅผ ๋ถ๊ฐ๋ฅํ๊ฒ ํ๊ธฐ ๋๋ฌธ
delete dog.name; // configureable์ false๋ก ํด์ ํค๋ฅผ ์์ ํ ์๋ ์๋ค.

const student = {};
Object.defineProperties(student, {
  firstName: {
    value: '์ํฌ',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value: '๊น',
    writable: true,
    enumerable: true,
    configurable: true
  },
  fullName: {
    get() {
      return `${lastName} ${firstName}`;
    },
    set(name) {
      [this.lastName, this.firstName] = name.split(' ');
    },
    configurable: true
  }
});
console.log(student);
