<script setup>
import { reactive } from 'vue'
import { StorageService } from '@/services/StorageService.js'
import { useRouter } from 'vue-router'

// 스토리지 서비스 객체
const storageService = new StorageService('myMemo')

// 라우터
const router = useRouter()

// 반응형 상태
const state = reactive({
  memo: {
    id: undefined,
    title: '',
    content: '',
  },
})

// submit
const submit = () => {
  // memo 삽입
  storageService.addItem(state.memo)

  // 알림 출력
  window.alert('저장 완료')

  // 라우터로 '/' 경로로 이동 (리다이렉트?)
  router.push({ path: '/' })
}
</script>

<template>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3">
      <label for="title" class="form-label">TITLE</label>
      <input type="text" id="title" class="form-control p-3"
             v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">CONTENT</label>
      <textarea id="content" class="form-control p-3"
                v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">SAVE</button>
  </form>
</template>
