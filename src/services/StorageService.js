export class StorageService {
  // # 을 사용하는 경우 클래스 외부에서 접근할 수 없는 요소 - private 와 같은 역할
  #storageName;

  constructor(storageName) {
    if(!storageName) {
      throw new Error('Storage Service requires a name');
    }

    this.#storageName = storageName;

    // 테스트 데이터
    if (localStorage.getItem(this.#storageName) === null) {
      this.addItem({ title: '영화', content: '조커, 승부'});
      this.addItem({ title: '도서', content: '연금술사, 이방인'});
      this.addItem({ title: '게임', content: 'GTA6'});
    }
  }

  // 조회
  #getStorageData() {
    const json = localStorage.getItem(this.#storageName);

    if(json) {
      return JSON.parse(json);
    }

    return {
      items: [],
      nextId: 1,
    }
  }

  // 저장
  #saveStorageData(obj) {
    const json = JSON.stringify(obj);
    localStorage.setItem(this.#storageName, json);
  }

  // 신규 항목 추가
  addItem(item) {
    // 1. 객체에 get
    const storageData = this.#getStorageData();
    // 2. item 의 id 값 + 1
    item.id = storageData.nextId++;
    // 3. 객체에 item 삽입
    storageData.items.push(item);
    // 4. 객체 저장
    this.#saveStorageData(storageData);
  }

  // 모든 항목 조회
  getItems() {
    return this.#getStorageData().items;
  }

  // 특정 항목 조회 - id 기반 조회
  getItem(id) {
    return this.#getStorageData().items.find(i => i.id === id);
  }

  // 특정 항목 수정
  setItem(item) {
    // 1. 객체에 get
    const storageData = this.#getStorageData();
    // 2. for 문으로 순회하며 id 값 일치하는 item 탐색 및 덮어쓰기
    for (let i = 0; i < storageData.items.length; i++) {
      if(storageData.items[i].id === item.id) {
        storageData.items[i].item = item;
        break;
      }
    }
    // 3. 저장
    this.#saveStorageData(storageData);
  }

  // 특정 항목 삭제
  deleteItem(id) {
    // 1. 객체에 get
    const storageData = this.#getStorageData();
    // 2. 인덱스 가져오기
    const idx = storageData.items.findIndex(i => i.id === id);
    // 3. 제거
    if (idx > -1) {
      storageData.items.splice(idx, 1);
      this.#saveStorageData(storageData);
    }
  }
}
