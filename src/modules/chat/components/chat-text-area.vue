<template>
  <div class="chat-text-area">
    <div class="message" :class="isFrom?'my-message':'other-message'">{{text}}
      <img alt="sol ok" :class="isFrom?'right-icon':'left-icon'" :src="arrowIcon">
    </div>

  </div>
</template>


<script lang="ts" setup>
import { computed } from "vue";
import sagIcon from "@/assets/sag.png";
import solIcon from "@/assets/sol.png";

const props = defineProps({
  text: {
    type: String,
    default: ''
  },

  origin :{
    type: String,
    default: 'from'
  }

})

const isFrom = computed(() => props.origin === "from");
const arrowIcon = computed(() => isFrom.value ? sagIcon :solIcon );

</script>

<style lang="scss" scoped>
$main: #901B6A;
$blue: #DCDCDC;
$orange: #E38968;
$gray: #92959E;
.chat-text-area {
    padding: 30px 30px 20px;
    .message {
      color: white;
      padding: 18px 20px;
      line-height: 26px;
      font-size: 16px;
      border-radius: 20px;
      position: relative;

      &.my-message {
        background: $main;
        .right-icon {
          position: absolute;
          bottom: -10px;
          right: 20px;
          width: 20px;
          height: auto;
        }
      }

      &.other-message {
        background: $blue;
        color: black;
        display: inline-block;
        max-width: 90%;
        word-wrap: break-word;
        .left-icon {
          position: absolute;
          bottom: -9px;
          left: 20px;
          width: 20px;
          height: auto;
        }
      }
    }




}
</style>