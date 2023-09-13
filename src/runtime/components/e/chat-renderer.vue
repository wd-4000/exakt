<template>
    <div class="d-flex flex-column">
        <e-dropdown :items="items" width="13rem" :visible="status.dropdown.visible" fixed
            :position="{ x: status.dropdown.x, y: status.dropdown.y }" @update:visible="status.dropdown.visible=$event"></e-dropdown>

        <slot v-for="m in computedMessages" :key="m.id" v-bind="m" :name="m.status === 'system' ? 'system' : 'default'"
            @click.right.prevent="openDropdown"   @touchstart=""/>
    </div>
</template>
<script setup lang="ts">
import { mdiDelete, mdiFlag, mdiMinusCircle } from "@mdi/js";
import { reactive, computed, defineProps } from "#imports";
const status = reactive({ dropdown: { visible: false, x: 0, y: 0 } })
const items = [{ icon: mdiDelete, name: "Delete" }, { icon: mdiMinusCircle, name: "Delete just for me" }, { icon: mdiFlag, name: "Dox" }]

const openDropdown = ({ clientX, clientY }) => {
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
    const newMessages = <MessageArray>[]
    const messages = props.messages;
    for (const [i, m] of messages.entries()) {
        newMessages.push({ ...m })
        if (messages[i + 1] && messages[i + 1].status == messages[i].status) {
            newMessages[i].pointer = false
            if (messages[i + 1].date && messages[i].date && messages[i + 1].date.getMinutes() == messages[i].date.getMinutes() && messages[i + 1].date.getHours() == messages[i].date.getHours() && messages[i + 1].status == messages[i].status) {
                newMessages[i].hideStatus = true
            }

        } else {
            messages[i].pointer = true
        }

        if (m.status == "system") {

        }

        switch (m.status) {
            case "system":
                newMessages[i].hideStatus = true;
                newMessages[i].pointer = false;
                newMessages[i].posx = "center";
                newMessages[i].textAlign = "center";
                break;
            case "received":

                newMessages[i].posx = "left";
                break;
            default:
                newMessages[i].posx = "right";
                break;
        }





    } return newMessages
})
</script>