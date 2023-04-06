class localCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  // 清除单个缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清除所有缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default localCache
