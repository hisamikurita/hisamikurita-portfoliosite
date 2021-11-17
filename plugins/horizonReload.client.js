import { reload } from "../lib/reload"

export default () => {
  /**
   * ブレイクポイントを跨いだ時に強制的にロードさせる
   */
  const mediaQuery = window.matchMedia('(max-width: 768px)')
  mediaQuery.addEventListener('change', reload)
}