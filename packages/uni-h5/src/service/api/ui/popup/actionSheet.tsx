import { defineComponent, ExtractPropTypes, ref, watch } from 'vue'

const props = {
  title: {
    type: String,
    default: '',
  },
  itemList: {
    type: Array,
    default() {
      return []
    },
  },
  itemColor: {
    type: String,
    default: '#000000',
  },
  popover: {
    type: Object,
    default: null,
  },
  visible: {
    type: Boolean,
    default: false,
  },
}

type Props = ExtractPropTypes<typeof props>

export default defineComponent({
  name: 'ActionSheet',
  props,
  setup(props) {
    useActionSheetState(props)
  },
})

function useActionSheetState(props: Props) {
  const HEIGHT = ref(260)
  const contentHeight = ref(0)
  const titleHeight = ref(0)
  const deltaY = ref(0)
  const scrollTop = ref(0)
}

// 由于模拟滚动阻止了点击，使用自定义事件来触发点击事件
function initClick(dom: HTMLElement) {
  const MAX_MOVE = 20
  let x = 0
  let y = 0
  dom.addEventListener('touchstart', (event) => {
    const info = event.changedTouches[0]
    x = info.clientX
    y = info.clientY
  })
  dom.addEventListener('touchend', (event) => {
    const info = event.changedTouches[0]
    if (
      Math.abs(info.clientX - x) < MAX_MOVE &&
      Math.abs(info.clientY - y) < MAX_MOVE
    ) {
      const target = event.target as HTMLElement
      const currentTarget = event.currentTarget as HTMLElement
      const customEvent = new CustomEvent('click', {
        bubbles: true,
        cancelable: true,
        target,
        currentTarget,
      } as any)
      ;['screenX', 'screenY', 'clientX', 'clientY', 'pageX', 'pageY'].forEach(
        (key) => {
          ;(customEvent as any)[key] = (info as any)[key]
        }
      )
      event.target!.dispatchEvent(customEvent)
    }
  })
}

/* <template>
  <uni-actionsheet @touchmove.prevent>
    <transition name="uni-fade">
      <div v-show="visible" class="uni-mask uni-actionsheet__mask" @click="_close(-1)" />
    </transition>
    <div
      :class="{ 'uni-actionsheet_toggle': visible }"
      :style="popupStyle.content"
      class="uni-actionsheet"
    >
      <div ref="main" class="uni-actionsheet__menu" @wheel="_handleWheel">
        <!-- title占位 -->
        <div
          v-if="title"
          class="uni-actionsheet__cell"
          :style="{ height: `${titleHeight}px` }"
        />
        <div v-if="title" class="uni-actionsheet__title">
          {{ title }}
        </div>
        <div :style="{ maxHeight: `${HEIGHT}px`, overflow: 'hidden' }">
          <div ref="content">
            <div
              v-for="(itemTitle, index) in itemList"
              :key="index"
              :style="{ color: itemColor }"
              class="uni-actionsheet__cell"
              @click="_close(index)"
            >
              {{ itemTitle }}
            </div>
          </div>
        </div>
      </div>
      <div class="uni-actionsheet__action">
        <div
          :style="{ color: itemColor }"
          class="uni-actionsheet__cell"
          @click="_close(-1)"
        >
          {{ $$t("uni.showActionSheet.cancel") }}
        </div>
      </div>
      <div :style="popupStyle.triangle" />
    </div>
    <keypress :disable="!visible" @esc="_close(-1)" />
  </uni-actionsheet>
</template>
<script>
import popup from "./mixins/popup";
import keypress from "../../../helpers/keypress";
import { i18nMixin } from "uni-core/helpers/i18n";
import touchtrack from "uni-mixins/touchtrack";
import scroller from "uni-mixins/scroller/index";
import { Friction } from "uni-mixins/scroller/Friction";
import { Spring } from "uni-mixins/scroller/Spring";
import { initScrollBounce, disableScrollBounce } from "uni-platform/helpers/scroll";

export default {
  components: {
    keypress,
  },
  mixins: [i18nMixin, popup, touchtrack, scroller],
  watch: {
    visible(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          // title 占位
          if (this.title) {
            this.titleHeight = document.querySelector(
              ".uni-actionsheet__title"
            ).offsetHeight;
          }
          // 滚动条更新
          this._scroller.update();
          // 获取contentHeight 滚动时使用
          this.contentHeight = this.$refs.content.clientHeight - this.HEIGHT;
          // 给每一个项添加点击事件
          document.querySelectorAll(".uni-actionsheet__cell").forEach((item) => {
            initClick(item);
          });
        });
      }
    },
  },
  mounted() {
    // 模拟滚动使用
    this.touchtrack(this.$refs.content, "_handleTrack", true);
    this.$nextTick(() => {
      this.initScroller(this.$refs.content, {
        enableY: true,
        friction: new Friction(0.0001),
        spring: new Spring(2, 90, 20),
        onScroll: (e) => {
          this.scrollTop = e.target.scrollTop;
        },
      });
    });
    initScrollBounce();
  },
  methods: {
    _close(tapIndex) {
      this.$emit("close", tapIndex);
    },
    _handleTrack: function (e) {
      if (this._scroller) {
        switch (e.detail.state) {
          case "start":
            this._handleTouchStart(e);
            disableScrollBounce({
              disable: true,
            });
            break;
          case "move":
            this._handleTouchMove(e);
            break;
          case "end":
          case "cancel":
            this._handleTouchEnd(e);
            disableScrollBounce({
              disable: false,
            });
        }
      }
    },
    _handleWheel($event) {
      const deltaY = this.deltaY + $event.deltaY;
      if (Math.abs(deltaY) > 10) {
        this.scrollTop += deltaY / 3;
        this.scrollTop =
          this.scrollTop >= this.contentHeight
            ? this.contentHeight
            : this.scrollTop <= 0
            ? 0
            : this.scrollTop;
        this._scroller.scrollTo(this.scrollTop);
      } else {
        this.deltaY = deltaY;
      }
      $event.preventDefault();
    },
  },
};
</script>
 */
