<template>
  <div class="flex-stretch nav-btn">
    <e-link
      :to="to"
      class="flex-stretch fullwidth"
    >
      <e-btn
        :active="active"
        class="button fullwidth"
        :inactive="inactive"
        :solid="false"
        background="transparent"
        :class="{ responsive }"
      >
        <div class="content">
          <div
            v-if="icon"
            class="icon-wrapper flex-center"
            :class="{ 'mr-2': label, 'mx-4': !label }"
          >
            <e-icon
              
              class="icon"
              :size="size"
            >{{ icon }}</e-icon>
            <transition name="fade">
              <div
                v-if="alert"
                class="icon-alert"
              />
            </transition>
          </div>
          <p v-if="label">
            {{ label }}
          </p>
        </div>
        <slot />
      </e-btn>
    </e-link>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    to?: string;
    label?: string;
    icon?: string;
    size?: string;
    responsive?: boolean;
    alert?: boolean;
  }>(),
  { to: "", label: "", icon: "", responsive: true, size: "20" }
);

const route = useRoute();

const aspect = computed(() => {
  if (props.icon) {
    return "3/2";
  }

  return "unset";
});

const active = computed(() => {
  return route && route.path === props.to;
});
const inactive = computed(() => {
  return !active.value && Boolean(props.icon);
});
</script>

<style scoped lang="scss">

.nav-btn{
  flex-grow: 1;
}
.button:first-child {
  aspect-ratio: unset;

  .content {
    display: flex;

    flex-direction: row;

    justify-content: center;
    align-content: center;
    justify-items: center;
    align-items: center;

    .icon {
      font-size: 1.5rem;
    }
  }
}

.icon-wrapper {
  position: relative;
  box-sizing: border-box;
  aspect-ratio: 1;

  .icon-alert {
    // Add a blue dot to the bottom right of the icon
    content: "";
    position: absolute;
    width: 0.5rem;
    z-index: 2;
    height: 0.5rem;
    border-radius: 100%;
    bottom: 0.1rem;
    right: 0px;
    background-color: var(--t-color-primary);
    outline: 0.1rem solid var(--t-elev-2);
  }
}

@media screen and (max-width: $e-md-screen-breakpoint) {
  .button.responsive {
    aspect-ratio: v-bind(aspect);

    p {
      margin: 0px;
      white-space: nowrap;
    }

    .content {
      flex-direction: column;

      .icon-wrapper {
        margin-right: 0rem;
      }
    }
  }
}
</style>
