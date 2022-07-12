const count = ref(0);

watchEffect(() => {
  document.getElementById("count").innerHTML = `count is: ${count.value}`;
});

document.getElementById("btn").addEventListener("click", () => {
  count.value++;
});
