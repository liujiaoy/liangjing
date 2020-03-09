<template>
  <div class="home">
    <Hello>
  </div>
</template>

<script>
// @ is an alias to /src
import Hello from "@/components/hello.vue";

export default {
  name: "Home",
  components: {
    Hello
  }
};
</script>
