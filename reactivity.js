const A0 = ref(1);
const A1 = ref(2);
let A2 = computed(() => A0.value + A1.value);

console.log(A2.value); // 3

A0.value = 2;

console.log(A2.value); // 4
