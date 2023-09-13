<template>
  <div
    class="bubble"
    :class="bubbleClasses"
  >
    <div
      class="content"
      :style="{textAlign}"
    >
      <slot />
    </div>
    <div
      v-if="!hideStatus"
      class="status text-secondary"
    >
      <slot name="status" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "#imports";
// Define props for the position and color of the bubble
const props = withDefaults(
    defineProps<{
        posx?:
        "left" | "right" | "center";
        posy?: "top" | "bottom";
        textAlign?: "left" | "right" | "center";
        color?: string;
        liveTyping?: boolean;
        pointer?: boolean;
        hideStatus?: boolean;
    }>(),
    {
        posx: "left",
        posy: "bottom",
        color: "turquoise",
        liveTyping: false,
        pointer: true
    }
);

const bubbleClasses = computed(() => {
    const classes = [props.posx, props.posy];
    if (props.liveTyping) {
        classes.push("live-typing");
    }
    if (props.pointer === false) {
        classes.push("no-pointer");
    }
    return classes;
});
</script>

<style scoped lang="scss">
$bottom-triangle-height: 0.3rem;

.bubble {
    --current-color: var(--e-color-elev);
    --text-color: var(--e-color-dark);
    position: relative;
    font-family: sans-serif;
    width: fit-content;
    min-width: 0;
    overflow-wrap: break-word;
    padding: var(--e-core-padding-x);
    background: var(--current-color);
    //outline: 0.07rem solid var(--e-color-elev-2);

    border-radius: 1rem;
    color: rgb(var(--text-color));
    margin-top: 0px;
    max-width: 50%;
    min-width: 10rem;
    transition: transform 0.15s ease-in-out;

    &:active {
        transform: scale(0.95);
    }

    .overline {
        font-weight: bold;
        text-align: left;
    }

    .status {
        text-align: right;
        margin-top: 0.5rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        animation: anim2 2s ease-in-out infinite;
    }

    &.no-pointer {
        &:before {
            display: none;
        }

        margin-bottom: 0.5rem !important;

    }

    &.right {
        &:before {
            left: unset;
            right: calc($bottom-triangle-height * 2);
            border-right: calc($bottom-triangle-height * 2) solid var(--current-color);
            border-left: $bottom-triangle-height solid transparent;
        }

align-self: flex-end;
        animation: enter-right 0.3s ease-in-out;
    }

    &.center{
        align-self: center;
    }

    &.left {
        &:before {
            left: calc($bottom-triangle-height * 2);
            border-left: calc($bottom-triangle-height * 2) solid var(--current-color);
            border-right: $bottom-triangle-height solid transparent;
        }

        animation: enter-left 0.3s ease-in-out;
    }

    &.live-typing {
        .content {
            animation: live-typing 5s linear infinite;
            background-clip: text;
            background: linear-gradient(to right,
                    rgba(var(--text-color), 1) 20%,
                    rgba(var(--text-color), 0.5) 40%,
                    rgba(var(--text-color), 0.5) 60%,
                    rgba(var(--text-color), 1) 80%);
            -webkit-background-clip: text;

            background-size: 200% auto;
            color: transparent;
        }
    }
}

.bottom {
    margin-bottom: $bottom-triangle-height * 4;

    &:before {
        border-top: $bottom-triangle-height solid var(--current-color);
        border-bottom: calc($bottom-triangle-height * 2) solid transparent;
        left: calc($bottom-triangle-height * 2);
        bottom: calc(-2.5 * $bottom-triangle-height);
    }
}

.top {
    margin-top: $bottom-triangle-height * 4;

    &:before {
        top: calc(-2.5 * $bottom-triangle-height);
        border-bottom: $bottom-triangle-height solid var(--current-color);
        border-top: calc($bottom-triangle-height * 2) solid transparent;
    }
}

@keyframes enter-left {
    from {
        transform: scale(0.8) translateX(-30%) translateY(20%);
    }

    to {
        transform: scale(1) translateX(0%) translateY(0%);
    }
}

@keyframes enter-right {
    from {
        transform: scale(0.8) translateX(30%) translateY(20%);
    }

    to {
        transform: scale(1) translateX(0%) translateY(0%);
    }
}

@keyframes live-typing {
    to {
        background-position: -200% center;
    }
}
</style>
