<script setup lang="ts">
/**
 * Checkbox 컴포넌트
 *  말그대로 체크박스이다. v-model 로는 선택한 체크박스의 value 들을 갖고 있다.
 *  value 에는 체크 시 제어할 데이터를 지정하고, name 으로 checkbox 그룹을 지정한다.
 */
import {computed, ref, withDefaults} from "vue";

type CheckboxValue = any | any[] | boolean;

interface IProps {
  modelValue?: CheckboxValue, // v-model 체크한 데이터 배열
  label?: string; // 체크박스 제목
  name?: string;  // 체크박스 그룹
  value: any; // 체크박스 데이터
  disabled?: boolean; // disabled 여부
  block?: boolean; // block element 여부
}

const props = withDefaults(defineProps<IProps>(), {
  label: '',
  disabled: false,
  block: false,
});

interface IEmits {
  (eventName: 'update:modelValue', value: CheckboxValue): void, // v-model
  (eventName: 'change', value: CheckboxValue): void,  // v-model 과 동일하지만, 쉽고 직관적인 이벤트 이름을 위해서
}

const emits = defineEmits<IEmits>();
const wrapperRef = ref<HTMLElement>();

// 체크박스 클래스 목록
const classesCheck = computed(() => {
  const classList = Object.create(null);
  classList['disabled'] = props.disabled;
  classList['block'] = props.block;
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

defineExpose({
  wrapperRef,
});
</script>

<template>
  <div
      ref="wrapperRef"
      class="check-wrapper"
      :class="classesCheck"
      @click.stop>
    <label class="checkbox">
      <span class="checkbox-area">
        <input
            type="checkbox"
            v-model="proxyCheck"
            :value="props.value"
            :name="props.name"
            :disabled="props.disabled"/>
        <span class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.302 16.604">
            <path id="icon_check" d="M114.7,3389.746c-.019-.031,5.865,6.77,5.865,6.77l7.454-10.621"
                  transform="translate(-112.195 -3382.412)" fill="none" stroke="#fff" stroke-linecap="round"
                  stroke-linejoin="round" stroke-width="5"/>
          </svg>
        </span>
      </span>
      <span class="display-label">
        <slot></slot>
      </span>
    </label>
    <label>{{ props.label }}</label>
  </div>
</template>

<style scoped lang="scss">
.check-wrapper {
  display: inline-flex;
  align-items: center;

  .checkbox {
    position: relative;
    display: inline-flex;
    column-gap: 10px;
    cursor: pointer;

    .checkbox-area {
      position: relative;
      font-size: 0;
      line-height: 0;

      input {
        appearance: none;
        margin: 0;
        width: 33px;
        height: 33px;
        background-color: #ECECEC;
        //border: 3px solid #DBDBDB;
        border-radius: 5px;
        transition: background-color .2s;

        &:checked {
          border-color: #017EFF;
          background-color: #017EFF;
        }

        &:checked + .icon {
          visibility: visible;
        }
      }

      .icon {
        visibility: hidden;
        position: absolute;
        top: 8px;
        left: 8px;
        width: 19px;
        height: 19px;
      }
    }

    .display-label {
      font-size: 28px;
      line-height: 38px;
      user-select: none;
    }
  }

  &.block {
    display: block;
  }

  &.disabled {
    .checkbox {
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
  .check-wrapper {
    .checkbox {
      column-gap: vw(10);

      .checkbox-area {
        input {
          width: vw(33);
          height: vw(33);
          border-radius: vw(5);
        }

        .icon {
          top: vw(8);
          left: vw(7);
          width: vw(19);
          height: vw(19);
        }
      }

      .display-label {
        font-size: vw(28);
        line-height: vw(38);
      }
    }
  }
}
</style>