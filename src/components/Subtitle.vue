<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="md-12 align-center mh-2 subtitle">
    <h3 class="black">{{ msg }}</h3>
  </div>
</template>

<script></script>
