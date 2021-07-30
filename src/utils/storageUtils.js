import store from 'store';

const storage = {
    //设置
    setStorage(data) {
        store.set('user', data)
    },
    //获取
    getStorage() {
        return store.get('user')
    },
    //删除
    removeStorage() {
        store.remove('user')
    }
}
export default storage;