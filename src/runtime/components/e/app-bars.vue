<template>

    <div class="title-bar">
        <e-progress-linear :model-value="props.loading" />
        <div class="pf-wrap">
            <slot name="left"></slot>
        </div>
        <slot name="center"></slot>

        <div class="pf-wrap">
            <slot name="right"></slot>
        </div>
    </div>

    <div class="bar-container">
        <e-container class="bar-e-container" :forceFullWidth="true">
            <div class="rounded bar">
                <e-progress-linear :model-value="props.loading" class="md-and-up-only" />

                <div class="md-and-up-only flex-stretch">
                    <slot name="center"></slot>
                </div>
                <slot name="nav-items"></slot>
                <div class="md-and-up-only flex-stretch">
                    <slot name="right" class="fullwidth"></slot>
                </div>
            </div>
        </e-container>
    </div>

</template>
<script setup lang="ts">

const props = withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  { loading:false }
);

const { $store, $platform } = useNuxtApp();

</script>

<style lang="scss" scoped>
.title-bar {
    display: none;
    position: relative;
}

.bar {
    display: flex;
    justify-content: flex-start;
    justify-items: flex-start;
    background-color: var(--e-color-elev-2);
    width: 100%;
    overflow: clip;
    position: relative;
}

.bar-container {
    width: 100%;
    top: 1rem;

    height: 4rem;
    padding-bottom: 1rem;

    display: flex;
    justify-content: center;
    position: sticky;
    align-self: flex-start;
    z-index: 4;
}

@media screen and (max-width: (var(--e-md-screen-breakpoint))) {
    .title-bar {
        display: unset;
        top: 0px;
        left: 0px;
        height: 4rem;
        width: 100%;
        z-index: 4;
        background-color: var(--e-color-elev-2);
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-content: stretch;
        justify-items: space-between;
        align-items: stretch;

        .pf-wrap {
            display: flex;
            align-items: stretch;
            width: 5rem;
        }
    }

    .md-and-up-only {
        display: none;
    }

    .bar-container {
        bottom: 0px;
        left: 0px;
        top: unset;
        position: fixed;
        padding: 0px;
        z-index: 3;
    }

    .bar-e-container {
        padding: 0px;
        margin: 0px;
    }

    .bar {
        border-radius: 0px;
        width: 100%;
        height: 100%;

        padding-bottom: calc(env(safe-area-insee-bottom));
    }
}
</style>