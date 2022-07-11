const A0 = ref(1);
const A1 = ref(2);
let A2 = A0.value + A1.value;

console.log(A2); // 3

A0.value = 2;
console.log(A2); // still 3

function ref(value) {
  const obj = {
    value: value,
  };

  return obj;
}
