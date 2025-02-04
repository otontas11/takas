<template>
  <div class="chat-header clearfix">
    <img alt="avatar" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg"/>
    <div class="chat-about">
      <div class="chat-with">chat kişi veya eşya alanı</div>
      <div class="chat-num-messages">{{ totalMessageCount }} mesaj</div>
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  totalMessageCount: {
    type: Number,
    default: 0
  }
})
</script>

<style lang="scss" scoped>

</style>