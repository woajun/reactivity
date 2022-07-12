const A0 = ref(1);
const A1 = ref(2);
const A2 = computed(() => A0.value + A1.value);
const A3 = ref();

watchEffect(() => {
  A3.value = A0.value + A1.value;
});
