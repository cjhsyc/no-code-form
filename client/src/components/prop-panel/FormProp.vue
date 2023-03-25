<template>
  <div class="form-props">
    <div class="prop" v-for="(prop, key) in designerStore.formProps" :key="key">
      <div class="label">
        <div class="title">{{ prop.label }}</div>
        <div class="tips" v-if="prop.tips">
          <el-tooltip :content="prop.tips" placement="top">
            <el-icon :size="14">
              <Warning />
            </el-icon>
          </el-tooltip>
        </div>
      </div>
      <div class="setter">
        <component :is="prop.setter" v-model="prop.value" v-bind="prop.attrs"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDesignerStore } from '@/stores/designer'

const designerStore = useDesignerStore()
</script>

<style scoped lang="scss">
@use '@/styles/mixin.scss' as *;

.form-props {
  height: 100%;
  width: 300px;
  padding: 10px 14px 0;
  overflow: scroll;
  @include scrollbar();
  .title {
    .name {
      border-left: 4px solid var(--color-primary);
      padding-left: 10px;
      font-weight: bolder;
    }
  }
  .prop {
    & + .prop {
      margin-top: 8px;
    }
    .label {
      display: flex;
      align-items: center;
      .title {
        font-size: 14px;
      }
      .tips {
        margin-left: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>
