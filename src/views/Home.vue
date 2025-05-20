<script setup>
import { reactive } from 'vue';
import { StorageService } from '@/services/StorageService.js';

// 스토리지 서비스 생성
const storageService = new StorageService('myMemo');

// 반응형 상태
const state = reactive({
  memos: []
});

const remove = (id) => {
  if(!window.confirm(`Do you want to delete?`)) {
    return;
  }

  storageService.deleteItem(id);

  state.memos = storageService.getItems();
}

// 커스텀 생성 훅
(async function onCreated() {
  state.memos = storageService.getItems();
})();
</script>

<template>
  <div class="memo-list">
    <router-link :to="`/memos/${m.id}`" class="item" v-for="m in state.memos">
      <div class="d-flex pt-3">
        <div class="pb-3 mb-0 w-100">
          <div class="d-flex justify-content-between">
            <b>{{ m.title }}</b>
            <div>
              <span role="button" class="delete-button" @click.prevent="remove(m.id)">- DELETE</span>
            </div>
          </div>
          <div class="mt-2">{{ m.content }}</div>
        </div>
      </div>
    </router-link>
    <router-link to="/memos/add" class="add btn btn-light">+ ADD</router-link>
  </div>
</template>

<style lang="scss" scoped>
.memo-list {
  .item {
    background: #f8f9fa;
    border: 1px solid #eee;
    display: block;
    color: #000;
    text-decoration: none;
    padding: 20px 30px;
    margin: 15px 0;

    &:hover {
      border-color: #aaa;
    }
  }

  .add {
    display: block;
    padding: 25px;
    border: 1px solid #eee;
  }

  .delete-button {
    cursor: pointer;
    color: #ff4000;
    padding: 4px 8px;
    border: 1px solid #ff4000;
    border-radius: 3px;
    background-color: transparent;
    transition: background-color 0.2s ease;
    font-weight: bold;
  }

  .delete-button:hover {
    background-color: #661400;
  }
}
</style>
