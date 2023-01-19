<template>
  <div class="card-award">
    <article class="card-award-article" :class="'card-award-article-' + modifier">
      <div class="card-award-inner">
        <div class="card-award-title-wrapper-01">
          <span v-if="group === 'AWWWARDS'">
            <img src="/images/awwwards.webp" width="112" height="66" alt="AWWWARDS" />
          </span>
          <span v-else-if="group === 'CSS DESIGN AWARDS'">
            <img src="/images/cssda.webp" width="156" height="118" alt="CSS DESIGN AWARDS" />
          </span>
          <span v-else-if="group === 'CSS WINNER'">
            <img src="/images/csswinner.webp" width="156" height="98" alt="CSS WINNER" />
          </span>
        </div>
        <p class="card-award-title-wrapper-02">{{ rank }}</p>
        <p class="card-award-title-wrapper-03">{{ date }}</p>
        <h2 class="card-award-title-wrapper-04">{{ title }}</h2>
        <div class="card-award-title-wrapper-05">
          <span v-if="rank === 'HONORARABLE MENTION'">HM</span>
          <span v-else-if="rank === 'MOBILE EXELLENCE'">ME</span>
          <span v-else-if="rank === 'SITE OF THE DAY'">SOTD</span>
          <span v-else-if="rank === 'SPECIAL KDOS'">KDS</span>
          <span v-else-if="rank === 'UI DESIGN AWARD'">UI AWD</span>
          <span v-else-if="rank === 'UX DESIGN AWARD'">UX AWD</span>
          <span v-else-if="rank === 'INNOVATION AWARD'">INN AWD</span>
          <span v-else-if="rank === 'WEBSITE OF THE DAY'">WOTD</span>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  /**
   * group : グループ(AWWWARDS/CSS DESIGN AWARDS/CSS WINNER)
   * title : タイトル
   * rank : ランク
   * date : 日付
   * modifier : 見た目を変更するクラス
   */
  props: {
    group: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    rank: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    modifier: {
      type: String,
      default: '',
    },
  },
}
</script>

<style scoped lang="scss">
$awwwwardsLogo: 28px;
$awwwwardsLogoBottomMargin: 24px;
$cssdaLogo: 39px;
$cssdaLogoBottomMargin: 20px;
$csswinnerLogo: 39px;
$csswinnerLogoBottomMargin: 21px;

.card-award {
  position: absolute;
  top: 0;
  left: 0;
}

.card-award-article {
  position: relative;
  width: 234px;
  height: 320px;
  padding: 28px 18px;
  background-color: $white;
  color: $black;
  border-radius: 10px;
}

.card-award-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.card-award-title-wrapper-01 {
  display: block;
}

.card-award-title-wrapper-02 {
  white-space: nowrap;
}

.card-award-title-wrapper-02,
.card-award-title-wrapper-03 {
  margin: 0 0 1px 0;
}

.card-award-title-wrapper-02,
.card-award-title-wrapper-03,
.card-award-title-wrapper-04 {
  display: block;
  width: 120px;
  font-size: 12px;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.card-award-title-wrapper-04 {
  color: $white;
}

.card-award-title-wrapper-05 {
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 100%;
  font-size: 120px;
  font-family: 'Six Caps', sans-serif;
}

.card-award-article-aw-hm {
  background-color: #9dd5d6;

  & .card-award-title-wrapper-01 {
    width: $awwwwardsLogo;
    margin: 0 0 $awwwwardsLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #3b9b9e;
  }
}

.card-award-article-aw-me {
  background-color: #ec732e;

  & .card-award-title-wrapper-01 {
    width: $awwwwardsLogo;
    margin: 0 0 $awwwwardsLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #c82015;
  }
}

.card-award-article-aw-sotd {
  background-color: #e53138;

  & .card-award-title-wrapper-01 {
    width: $awwwwardsLogo;
    margin: 0 0 $awwwwardsLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #8b181b;
  }
}

.card-award-article-da-kds {
  background-color: #df6588;

  & .card-award-title-wrapper-01 {
    width: $cssdaLogo;
    margin: 0 0 $cssdaLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #feafc9;
  }
}

.card-award-article-da-uiawd {
  background-color: #fab740;

  & .card-award-title-wrapper-01 {
    width: $cssdaLogo;
    margin: 0 0 $cssdaLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #a47a35;
  }
}

.card-award-article-da-uxawd {
  background-color: #7aa0d0;

  & .card-award-title-wrapper-01 {
    width: $cssdaLogo;
    margin: 0 0 $cssdaLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #576b88;
  }
}

.card-award-article-da-innawd {
  background-color: #d66954;

  & .card-award-title-wrapper-01 {
    width: $cssdaLogo;
    margin: 0 0 $cssdaLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #904b3d;
  }
}

.card-award-article-da-wotd {
  background-color: #484072;

  & .card-award-title-wrapper-01 {
    width: $cssdaLogo;
    margin: 0 0 $cssdaLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #8e8eb1;
  }
}

.card-award-article-cw-sotd {
  background-color: #fff;

  & .card-award-title-wrapper-01 {
    width: $csswinnerLogo;
    margin: 0 0 $csswinnerLogoBottomMargin 0;
  }

  & .card-award-title-wrapper-04 {
    color: $black;
  }

  & .card-award-title-wrapper-02,
  & .card-award-title-wrapper-03,
  & .card-award-title-wrapper-05 {
    color: #de4246;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 226px;
    height: 312px;
    border: solid 2px #de4246;
    border-radius: 10px;
  }
}
</style>
