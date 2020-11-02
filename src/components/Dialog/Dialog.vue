<template>
  <transition name="mo-dialog-fade">
    <div
      :class="['mo-dialog-wrapper', { 'mo-message': !hasContent }]"
      v-show="visible"
      @click="popClose"
    >
      <div class="mo-dialog" :class="[css]" @click.stop>
        <div class="mo-dialog-header">
          <div class="mo-dialog-title" v-if="title">
            <span>{{ title }}</span>
          </div>
          <button
            v-show="showClose"
            type="button"
            @click="hide"
            class="mo-dialog-close"
          >
            <i class="mo-icon-close"></i>
          </button>
        </div>

        <div class="mo-dialog-content" v-if="hasContent">
          <slot>
            <div v-html="message"></div>
          </slot>
        </div>
        <div class="mo-dialog-footer">
          <mo-button
            @click="item.callback"
            v-for="item in mouiButtons"
            :key="item.title"
            plain
            :border="false"
            :type="item.type"
            class="mo-dialog-btn"
            >{{ item.title }}
          </mo-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PopupManager from "../lib/maskManager";
let idSeed = 1;

export default {
  name: "mo-dialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
      required: true
    },
    css: String,
    title: String,
    message: String,
    buttons: {
      type: [Array, Object],
      default() {
        return [{ title: "确定", type: "primary" }];
      }
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    },
    modalAppendToBody: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    }
  },
  model: {
    prop: "visible",
    event: "input"
  },

  beforeMount() {
    this._popupId = "popup-" + idSeed++;
    PopupManager.register(this._popupId, this);
  },

  beforeDestroy() {
    if (this.modalAppendToBody) {
      this.$el.remove();
    }
    PopupManager.deregister(this._popupId);
    PopupManager.closeModal(this._popupId);
  },

  data() {
    return {
      opened: false,
      rendered: false,
      isCommand: false
    };
  },
  computed: {
    mouiButtons() {
      let buttons = this.buttons;
      return buttons.map(btn => {
        let myBtn = Object.assign({}, btn);
        myBtn.callback = () => {
          if (!btn.callback || btn.callback() !== false) {
            this.hide();
          }
        };
        return myBtn;
      });
    },
    hasContent() {
      return this.$slots.default || this.message;
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this._opening) return;
        if (!this.rendered) {
          this.rendered = true;
          this.$nextTick(() => {
            this.open();
          });
        } else {
          this.open();
        }
      } else {
        this.close();
      }
    }
  },

  methods: {
    open() {
      if (!this.rendered) {
        this.rendered = true;
      }

      const props = this.$props;

      if (this._closeTimer) {
        clearTimeout(this._closeTimer);
        this._closeTimer = null;
      }
      clearTimeout(this._openTimer);

      const openDelay = Number(props.openDelay);
      if (openDelay > 0) {
        this._openTimer = setTimeout(() => {
          this._openTimer = null;
          this.doOpen(props);
        }, openDelay);
      } else {
        this.doOpen(props);
      }
    },

    doOpen(props) {
      if (this.opened) return;

      this._opening = true;

      const dom = this.$el;
      const zIndex = props.zIndex;

      if (zIndex) {
        PopupManager.zIndex = zIndex;
      }

      if (this._closing) {
        PopupManager.closeModal(this._popupId);
        this._closing = false;
      }

      PopupManager.openModal(
        this._popupId,
        PopupManager.nextZIndex(),
        this.modalAppendToBody ? undefined : dom
      );

      if (getComputedStyle(dom).position === "static") {
        dom.style.position = "absolute";
      }

      dom.style.zIndex = PopupManager.nextZIndex();
      this.opened = true;

      this.doAfterOpen();
    },

    doAfterOpen() {
      this._opening = false;
    },

    close() {
      if (this._openTimer !== null) {
        clearTimeout(this._openTimer);
        this._openTimer = null;
      }
      clearTimeout(this._closeTimer);

      const closeDelay = Number(this.closeDelay);

      if (closeDelay > 0) {
        this._closeTimer = setTimeout(() => {
          this._closeTimer = null;
          this.doClose();
        }, closeDelay);
      } else {
        this.doClose();
      }
    },

    doClose() {
      this._closing = true;

      this.onClose && this.onClose();

      this.opened = false;

      this.doAfterClose();
    },

    doAfterClose() {
      PopupManager.closeModal(this._popupId);
      this._closing = false;
      if (this.isCommand) {
        this.$el.remove();
        this.$destroy();
      }
    },
    hide() {
      this.$emit("input", false);
    },
    popClose() {
      if (this.closeOnClickModal) {
        this.hide();
      }
    }
  },
  mounted() {
    if (this.modalAppendToBody) {
      document.body.appendChild(this.$el);
    }
  }
};
</script>
