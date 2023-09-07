<template>
  <div class="bubble bottom left live-typing">
    <div class="content">Sorry, Dave. I'm afraid I can't do that.</div>
    
  </div>
</template>
<style scoped lang="scss">
$bottom-triangle-height: 0.3rem;

.bubble {
  --current-color: turquoise;
  --text-color: 0,0,0;

  position: relative;
  font-family: sans-serif;
  width: fit-content;
  padding: var(--e-core-padding-x);
  background: var(--current-color);
  border-radius: var(--e-rounded-border-radius);
  text-align: center;
  color: rgb(var(--text-color));
  margin-top: 1rem;

  &:before {
    content: "";
    width: 0px;
    height: 0px;
    position: absolute;
    animation: anim2 2s ease-in-out infinite;
  }

  &.right {
    &:before {
      left: unset;
      right: calc($bottom-triangle-height * 2);
      border-right: calc($bottom-triangle-height * 2) solid var(--current-color);
      border-left: $bottom-triangle-height solid transparent;
    }
    animation: enter-right 0.5s ease-in-out;
  }

  &.left {
    &:before {
      left: calc($bottom-triangle-height * 2);
      border-left: calc($bottom-triangle-height * 2) solid var(--current-color);
      border-right: $bottom-triangle-height solid transparent;
    }
    animation: enter-left 0.5s ease-in-out;
  }

  &.live-typing {
    .content {
      animation: live-typing 5s linear infinite;
      background-clip: text;
      background: linear-gradient(
        to right,
        rgba(var(--text-color), 1) 20%,
        rgba(var(--text-color), 0.5) 40%,
        rgba(var(--text-color), 0.5) 60%,
        rgba(var(--text-color), 1) 80%
      );
      -webkit-background-clip: text;

      background-size: 200% auto;
      color: transparent;
    }
  }
}

.bottom {
  margin-bottom: $bottom-triangle-height * 9;

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
