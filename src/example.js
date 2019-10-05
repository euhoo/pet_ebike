const obj = {
  name: 'Vasya',
  getName() {
    return this.name;
  },
};
const name1 = obj.getName();
console.log(name1); // Vasya
const name2 = obj.getName;
console.log(name2()); //
console.log(name2.call(obj)); //Vasya
const name3 = obj.getName.bind(obj);
console.log(name3()); // Vasya