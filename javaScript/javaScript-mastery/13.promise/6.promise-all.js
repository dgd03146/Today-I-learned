function getBanana() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('๐');
    }, 1000);
  });
}

function getApple() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('๐');
    }, 3000);
  });
}

function getOrange() {
  return Promise.reject(new Error('no orange'));
}

// ๋ฐ๋๋๊ณผ ์ฌ๊ณผ๋ฅผ ๊ฐ์ด ๊ฐ์ง๊ณ  ์ค๊ธฐ
getBanana() //
  .then((banana) =>
    getApple() //
      .then((apple) => [banana, apple])
  )
  .then(console.log);

// Promise.all ๋ณ๋ ฌ์ ์ผ๋ก ํ๋ฒ์ ๋ชจ๋  Promise๋ค์ ์คํ!
Promise.all([getBanana(), getApple()]) //
  .then((fruits) => console.log('all', fruits)); // ๋ณ๋ ฌ์ ์ผ๋ก ๋์์ ์คํํด์ 3์ด ์๋ค๊ฐ ๋ฐ๋ก ์คํ์ด ๋จ.

// Promise.race ์ฃผ์ด์ง Promise์ค์ ์ ์ผ ๋นจ๋ฆฌ ์ํ๋๊ฒ์ด ์ด๊น!
Promise.race([getBanana(), getApple()]) //
  .then((fruit) => console.log('race', fruit));

Promise.all([getBanana(), getApple(), getOrange()]) // ์ฑ๊ณตํ์๋๋ง ๊ฐ์ ธ์ฌ ๊ฒ์ด๋ผ๋ฉด all์ ์ฌ์ฉ.
  .then((fruits) => console.log('all-error', fruits))
  .catch(console.log); // all ์ค์ ์๋ฌ๊ฐ ๋ฐ์ํ๋๊ฒ์ด ์๋ค๋ฉด catch๋ฅผ ํด์ฃผ์ด์ผํ๋ค.

Promise.allSettled([getBanana(), getApple(), getOrange()]) // ์คํจํ๋  ์ฑ๊ณตํ๋  ๋ชจ๋  ๊ฒฐ๊ณผ๋ฅผ ๋ณด์ฌ์ค๋ค.
  .then((fruits) => console.log('all-settle', fruits))
  .catch(console.log);
