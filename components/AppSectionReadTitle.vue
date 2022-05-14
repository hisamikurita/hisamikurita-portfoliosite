<template>
  <span
    class="cmn-title-read-text-wrapper"
    :class="`cmn-title-read-text-wrapper--${modifier}`"
  >
    <span
      v-for="(char, index) of text"
      :key="index"
      class="cmn-title-read-text"
      :class="`cmn-title-read-text-0${index}`"
    >
      <AppTextSegment
        :state="state"
        :start="start + index * 0.12"
        :rotate="$BASEROTATE.right"
        :text="char"
        :sp-animation="spAnimation"
      />
    </span>
  </span>
</template>

<script>
export default {
  props: {
    text: {
      type: Array,
      required: true,
    },
    start: {
      type: Number,
      default: 0,
    },
    modifier: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    spAnimation: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped lang="scss">
.cmn-title-read-text-wrapper {
  display: block;
  font-size: 12px;
  font-family: $helvetica;
  letter-spacing: 0.02em;
  line-height: 1.04;

  @include tab-vertical() {
    font-size: 10px;
  }

  @include sp() {
    font-size: 10px;
  }
}

//modifier

.cmn-title-read-text-wrapper--section {
  & .cmn-title-read-text-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include tab-vertical() {
      font-size: 30px;
      text-indent: -1.6px;
    }

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }
}

.cmn-title-read-text-wrapper--project-section {
  & .cmn-title-read-text-00 {
    position: relative;
    right: -6px;
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include sp() {
      font-size: 28px;
      text-indent: 0;
      line-height: 1;
    }
  }
}

.cmn-title-read-text-wrapper--pickup-section {
  font-size: 14px;
  text-align: right;

  @include sp() {
    font-size: 10px;
  }

  & .cmn-title-read-text-00 {
    position: relative;
    left: 4px;
    font-size: 36px;
    line-height: 0.79;

    @include sp() {
      font-size: 28px;
      text-indent: 0;
      line-height: 0.86;
    }
  }
}

.cmn-title-read-text-wrapper--contact-section {
  & .cmn-title-read-text-00 {
    display: block;
    margin: 0 0 6px 0;
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.8;

    @include tab-vertical() {
      margin: 0 0 3px 0;
      font-size: 28px;
      text-indent: -1px;
    }

    @include sp() {
      margin: 0 0 3px 0;
      font-size: 28px;
      text-indent: -1.5px;
    }
  }

  & .cmn-title-read-text-01 {
    font-size: 20px;

    @include tab-vertical() {
      font-size: 16px;
    }

    @include sp() {
      font-size: 10px;
    }
  }
}

.cmn-title-read-text-wrapper--award-section {
  & .cmn-title-read-text-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }

  & .cmn-title-read-text-01 {
    font-size: 14px;

    @include sp() {
      font-size: 10px;
    }
  }
}

.cmn-title-read-text-wrapper--about-project-section {
  color: $black;

  & .cmn-title-read-text-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 28px;
      text-indent: 0;
    }
  }

  & .cmn-title-read-text-01,
  & .cmn-title-read-text-02 {
    font-size: 14px;

    @include sp() {
      font-size: 10px;
    }
  }
}

.cmn-title-read-text-wrapper--works-section {
  font-size: 14px;

  @include sp() {
    font-size: 10px;
    line-height: 1.1;
  }

  & .cmn-title-read-text-00 {
    font-size: 36px;
    text-indent: -2px;
    line-height: 0.79;

    @include sp() {
      display: inline-block;
      margin: 0 0 0 -4.5px;
      font-size: 26px;
      text-indent: 0;
    }
  }
}

/* stylelint-disable */
.is-windows {
  & .cmn-title-read-text-wrapper--section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: -8px;
    }
  }

  & .cmn-title-read-text-wrapper--pickup-section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: 14px;
    }
  }

  & .cmn-title-read-text-wrapper--project-section {
    & .cmn-title-read-text-00 {
      position: relative;
      right: -14px;
    }
  }

  & .cmn-title-read-text-wrapper--contact-section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: -8px;
    }
  }

  & .cmn-title-read-text-wrapper--award-section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: -8px;
    }
  }

  & .cmn-title-read-text-wrapper--about-project-section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: -8px;
    }
  }

  & .cmn-title-read-text-wrapper--works-section {
    & .cmn-title-read-text-00 {
      position: relative;
      left: -8px;
    }
  }
}

// .is-android {
//   & .cmn-title-read-text-wrapper--section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: -6px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--pickup-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: 12px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--project-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         right: -11px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--contact-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: -5px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--award-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: -4px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--about-project-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: -4px;
//       }
//     }
//   }

//   & .cmn-title-read-text-wrapper--works-section {
//     & .cmn-title-read-text-00 {
//       @include sp() {
//         position: relative;
//         left: -4px;
//       }
//     }
//   }
// }
/* stylelint-enable */
</style>