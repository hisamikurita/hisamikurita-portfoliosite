export default class GlElments {
  constructor(targetElArray) {
    this.targetElArray = targetElArray;
    this.optionList = [];
  }

  init() {
    this._initOptionList();
  }

  _initOptionList() {
    for (let i = 0; i < this.targetElArray.length; i++) {
      const rect = this.targetElArray[i].getBoundingClientRect()

      this.optionList[i] = {};
      this.optionList[i].width = rect.width;
      this.optionList[i].height = rect.height;
      this.optionList[i].top = rect.top;
      this.optionList[i].left = rect.left;
      this.optionList[i].img = this.targetElArray[i].dataset.img;
    }
  }

  setOptionList() {
    for (let i = 0; i < this.targetElArray.length; i++) {
      const rect = this.targetElArray[i].getBoundingClientRect()

      this.optionList[i].width = rect.width;
      this.optionList[i].height = rect.height;
      this.optionList[i].top = rect.top;
      this.optionList[i].left = rect.left;
    }
  }

  onResize() {
    this.setOptionList();
  }
}
