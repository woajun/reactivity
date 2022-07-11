const A0 = ref(1);
const A1 = ref(2);
const A2 = ref();

watchEffect(() => {
  A2.value = A0.value + A1.value;
});

const A3 = computed(() => A0.value + A1.value);
