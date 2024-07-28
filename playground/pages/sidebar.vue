<template>
  <e-nav-sidebar
    collapsed-width="3.5rem"
    expanded-width="15rem"
    elev="3"
    :move-content="0.5"
    :items="[
      { icon: 'home', title: 'Home', to: '/' },
      { icon: 'home', title: 'Users', to: '/' },
      { icon: 'home', title: 'Network', to: '/sidebar' },
      { icon: 'home', title: 'Events', to: '/' },
    ]"
  >
    <template #collapsed>
      <img
        src="/sample-logo.svg"
        style="width: 3.5rem"
      >
    </template>
    <template #extension>
      <div
        style="height: 3.5rem"
        class="d-flex flex-align-center"
      >
        <img
          src="/sample-logo.svg"
          style="width: 3.5rem"
          class="mr-4"
        > My
        Crappy App
      </div>
    </template>
    <template #app>
      <e-nav-sidebar
        collapsed-width="3.5rem"
        expanded-width="12rem"
        :move-content="0"
        :nesting-level="1"
        :items="[
          { icon: 'home', title: 'Devices', to: '/' },
          { icon: 'home', title: 'Infrastructure', to: '/' },
          { icon: 'home', title: 'WLAN', to: '/' },
        ]"
        elev="2"
      >
        <template #app>
          <e-nav-titlebar />
          <div class="bg-red">
            Sidebar example Sidebar example Sidebar example Sidebar example
            Sidebar example Sidebar example Sidebar example Sidebar example
            Sidebar example Sidebar example Sidebar example
          </div>
        </template>
      </e-nav-sidebar>
    </template>
  </e-nav-sidebar>
</template>
<script setup lang="ts">

</script>
