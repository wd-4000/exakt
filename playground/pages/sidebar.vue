<template>
  <e-nav-sidebar
    collapsed-width="3.5rem"
    expanded-width="15rem"
    elev="3"
    
    :items="[{ icon: mdiHome, title: 'Home', to: '/' }, { icon: mdiAccountMultiple, title: 'Users', to: '/' },{ icon: mdiEthernet, title: 'Network', to: '/sidebar' },{ icon: mdiCalendar, title: 'Events', to: '/' }]"
  >
    <template #app>
      <e-nav-sidebar
        collapsed-width="3.5rem"
        expanded-width="12rem"
        :move-content="0"
        :nesting-level="1"
        :items="[{ icon: mdiDevices, title: 'Devices', to: '/' }, { icon: mdiServer, title: 'Infrastructure', to: '/' }, { icon: mdiWifi, title: 'WLAN', to: '/' }]"
        elev="2"
      >
        <template #app>
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
import { mdiAccountMultiple, mdiCalendar, mdiDevices, mdiEthernet, mdiHome, mdiServer, mdiWifi } from "@mdi/js";
</script>
