<template>
  <!-- Fancybox için kapsayıcı -->
  <div ref="container" class="container">
    <slot></slot>  <!-- Slot içerik eklemek için -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, onMounted, onUpdated, onUnmounted, ref } from 'vue';
import { Fancybox } from '@fancyapps/ui';
import { Carousel } from "@fancyapps/ui/dist/carousel/carousel.esm.js";

import '@fancyapps/ui/dist/fancybox/fancybox.css';
import '@fancyapps/ui/dist/carousel/carousel.css';

export default defineComponent({
  props: {
    options: {
      type: Object as PropType<Record<string, unknown>>, // Options tipi
      required: false,
      default: () => ({}),
    },
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (container.value) {
        Fancybox.bind(container.value, '[data-fancybox]', {
          ...(props.options || {}),
          Carousel: {
            Panzoom: {
              decelFriction: 0.5,
            },
            transition: "slide",
            infinite: true,
          },
        });
      }
      setTimeout(() => {
        const carouselElement = document.getElementById("myCarousel");
        if (carouselElement) {
          new Carousel(carouselElement, { Dots: false,Navigation:false });
        }
      }, 1000); // 1 saniye (1000 milisaniye) sonra çalıştır
    });

    onUpdated(() => {
      if (container.value) {
        Fancybox.unbind(container.value);
        Fancybox.close();

        Fancybox.bind(container.value, '[data-fancybox]', {
          ...(props.options || {}),
        });
      }
    });

    onUnmounted(() => {
      if (container.value) {
        Fancybox.destroy();
      }
    });

    return {
      container,
    };
  },
});
</script>

<style>
.container {
  width: 100%;
  height: 200px;
  display: flex;
  overflow-y: scroll;
  overflow-x: scroll;
}

.fancybox__container {
  z-index: 9999;
  background-color: black;
  width: 100vw !important;
}
</style>
