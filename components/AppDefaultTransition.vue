<template>
  <a @click="onClick"><slot></slot></a>
</template>

<script>
export default {
  methods: {
    onClick(e){
      e.preventDefault();
    }
  }
}
</script>