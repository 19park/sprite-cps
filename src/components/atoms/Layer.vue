<script setup lang="ts">
import {withDefaults} from "vue";

interface IPopupProps {
  value?: string;
  absolute?: boolean;
}

const props = withDefaults(defineProps<IPopupProps>(), {
  value: '',
  absolute: true,
});
</script>

<template>
  <div class="blink-layer" :class="{absolute: absolute}">
    <slot>
      <div class="layer-wrap">
        <p v-html="props.value"></p>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.blink-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .55);
  color: #fff;
  z-index: 10;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  .layer-wrap {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    font-family: $font-family-gmarket;
    font-size: 40px;
    font-weight: bold;
  }
}

@media only screen and (max-width: $mobile-max-width) {
  .blink-layer {
    .layer-wrap {
      width: 80%;
      height: 80%;
    }

    p {
      font-size: vw(40);
    }
  }
}
</style>