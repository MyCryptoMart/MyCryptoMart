const greets = [{ hello: "world"}, { how: "are you" }];
const cars = [{ big: "van" }, { fat: "car" }];

const children = greets.concat(cars);
console.log(children.sort(() => (Math.random() > .5) ? 1 : -1))