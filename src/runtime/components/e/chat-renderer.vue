<template>
  <div class="d-flex flex-column">
    <e-dropdown
      :items="items"
      width="13rem"
      :visible="status.dropdown.visible"
      fixed
      :position="{ x: status.dropdown.x, y: status.dropdown.y }"
      @update:visible="status.dropdown.visible = $event"
    />

    <slot
      v-for="m in computedMessages"
      :key="m.id"
      v-bind="m"
      :name="(m.status === 'system') ? 'system' : 'default'"
      @click.right.prevent="openDropdown"
    />
  </div>
</template>
<script setup lang="ts">
import { mdiDelete, mdiFlag, mdiMinusCircle } from "@mdi/js";
import { reactive, computed } from "#imports";

const status = reactive({ dropdown: { visible: false, x: 0, y: 0 } });
const items = [{ icon: mdiDelete, name: "Delete" }, { icon: mdiMinusCircle, name: "Delete just for me" }, { icon: mdiFlag, name: "Dox" }];

const openDropdown = ({ clientX, clientY }: MouseEvent) => {
    status.dropdown.visible = true;
    status.dropdown.x = clientX;
    status.dropdown.y = clientY;

}
type MessageArray = {
    liveTyping?: boolean;
    pointer?: boolean;
    id: string;
    text: string;
    date?: Date;
    status: "sending" | "sent" | "read" | "received" | "system";
    [key: string]: any;
}[]
const props = defineProps<{
    messages: MessageArray
}>()

const computedMessages = computed(() => {
    const newMessages = <MessageArray>[];
    const msgs = props.messages;
    const entries = props.messages.entries();
    for (const [i, m] of entries ) {
        if ((msgs[i + 1] != undefined) && (msgs[i + 1].status === msgs[i].status)) {
            m.pointer = false;
            const nextDate = msgs[i + 1].date;
            const thisDate = msgs[i].date;
            if (nextDate && thisDate && nextDate.getMinutes() == thisDate.getMinutes() && nextDate.getHours() == thisDate.getHours() && msgs[i + 1].status == msgs[i].status) {
                m.hideStatus = true
            }

        } else {
           m.pointer = true
        }

        switch (m.status) {
            case "system":
                m.hideStatus = true;
                m.pointer = false;
                m.posx = "center";
                m.textAlign = "center";
                break;
            case "received":
                m.posx = "left";
                break;
            default:
                m.posx = "right";
                break;
        }

        newMessages.push(m);

    }

    return newMessages
})
</script>