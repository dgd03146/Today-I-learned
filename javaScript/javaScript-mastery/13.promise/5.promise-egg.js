function fetchEgg(chicken) {
  return Promise.resolve(`${chicken} => π₯`);
}

function fryEgg(egg) {
  return Promise.resolve(`${egg} => π³`);
}

function getChicken() {
  return Promise.reject(new Error('μΉν¨μ κ°μ§κ³  μ¬ μ μμ'));
  //return Promise.resolve(`π± => π`);
}

getChicken() //
  .catch((error) => 'π')
  .then(fetchEgg)
  .then(fryEgg)
  .then(console.log); // π => π₯ => π³
// .catch((error) => console.log(error.name));
