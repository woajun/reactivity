const B0 = reactive({ name: "준희" });
const B1 = ref("내 이름은 ");
const B2 = computed(() => B1.value + B0.name);

B0.name = "juni";
