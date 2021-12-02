/**
 * ページ遷移後にハンバーガーメニューを閉じる
 */
export default ({ app, store }) => {
  app.router.afterEach((to, from) => {
    store.commit('hambergerMenu/close')
  });
};