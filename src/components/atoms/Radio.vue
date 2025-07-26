<script setup lang="ts">
/**
 * Radio 컴포넌트
 *  name 으로 그룹을 묶어서, v-model 데이터에는 선택한 radio 의 단일 값만 가지고 있다.
 */
import {computed, withDefaults} from "vue";

interface IProps {
  modelValue?: any, // v-model 체크한 데이터 배열
  name?: string;  // 체크박스 그룹
  value: any; // 체크박스 데이터
  size?: 'regular' | 'large'; // 크기
  disabled?: boolean; // disabled 여부
}
const props = withDefaults(defineProps<IProps>(), { 
  size: 'regular',
  disabled: false,
});
interface IEmits {
  (eventName: 'update:modelValue', value: any[]): void, // v-model  
  (eventName: 'change', value: any): void,  // v-model 과 동일하지만, 쉽고 직관적인 이벤트 이름을 위해서
}
const emits = defineEmits<IEmits>();

// 라디오 클래스 목록
const classesRadio = computed(() => {
  const classList = Object.create({});
  classList['large'] = props.size === 'large';
  classList['disabled'] = props.disabled;
  return classList;
});
// 아이콘의 클랙스 목록
const classesIcon = computed(() => {
  const classList = Object.create(null);
  classList['large'] = props.size === 'large';
  return classList;
});
// v-model 두개를 연결하기 위한 proxy 이다.
// get : props 로 들어온 v-model 데이터를 반환
// set : set 하려는 데이터를 외부로 emit 한다.
const proxyCheck = computed({
  get() {
    return props.modelValue;
  },
  set(value: any) {
    emits('update:modelValue', value);
    emits('change', value);
  }
});
</script>

<template>
  <div class="radio-wrapper" :class="classesRadio" >
    <label class="radio">
      <span class="radio-area">
        <input
            type="radio"
            v-model="proxyCheck"
            :value="props.value"
            :name="props.name"
            :disabled="props.disabled" />

        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.963 12.9">
            <path id="icon_check" d="M114.7,3388.837c-.015-.024,4.481,5.172,4.481,5.172l5.7-8.115" transform="translate(-112.695 -3383.109)" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
          </svg>
        </div>
      </span>

      <span class="display-label">
        <slot></slot>
      </span>
    </label>
  </div>
</template>

<style scoped lang="scss">
.radio-wrapper {
  display: inline-flex;
  align-items: center;

  .radio {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    column-gap: 10px;

    .radio-area {
      position: relative;
      font-size: 0;
      line-height: 0;

      input {
        appearance: none;
        margin: 0;
        width: 28px;
        height: 28px;
        border: 1px solid #DDDDDD;
        border-radius: 50%;
        transition: .2s;

        &:checked {
          border-color: #136EFB;
          background-color: #136EFB;
        }

        &:checked + .icon {
          visibility: visible;
        }
      }

      .icon {
        visibility: hidden;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-7.3px, -7.3px, 0);
        width: 14.67px;
        height: 14.67px;
      }

      .display-label {
        font-size: 30px;
        line-height: 33px;
        user-select: none;
        margin-left: 10px;
        font-weight: 600;
      }
    }
  }
  &.disabled {
    .radio {
      input {
        background-color: #ddd;
        border-color: #ccc;

        &:checked {
          border-color: #ddd;
          background-color: #ddd;
        }
      }
    }
  }
}
@media only screen and (max-width: $mobile-max-width) {
  .radio-wrapper {
    .radio {
      column-gap: vw(10);
      .radio-area {
        input {
          width: vw(28);
          height: vw(28);
          border: vw(1) solid #DDDDDD;
        }
        .icon {
          transform: translate3d(vw(-7.3), vw(-7.3), 0);
          width: vw(14.67);
          height: vw(14.67);
        }
        .display-label {
          font-size: vw(30);
          line-height: vw(33);
          margin-left: vw(10);
        }
      }
    }
  }
}
</style>