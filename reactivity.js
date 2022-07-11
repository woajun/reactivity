const A0 = refForA0(1);
const A1 = 2;
let A2 = A0.value + A1;

console.log(A2); // 3

A0.value = 2;
console.log(A2); // still 3, but i want 4

function refForA0(value) {
  const obj = {
    get value() {
      return value;
    },
    set value(newValue) {
      A2 = newValue + A1;
      value = newValue;
    },
  };

  return obj;
}
