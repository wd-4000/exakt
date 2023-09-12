<template>
    <div class="d-flex flex-column">

        <slot v-for="m in computedMessages" :key="m.id" v-bind="m" />
    </div>
</template>
<script setup lang="ts">
type MessageArray = {
        liveTyping?: boolean;
        pointer?: boolean;
        id: string;
        text: string;
        date?: Date;
        status: "sending" | "sent" | "read" | "received" |"system";
        [key: string]: any;
    }[]
import { computed, defineProps } from "#imports";
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

        if(m.status == "system"){
    
        }

        switch(m.status){
            case "system":
            newMessages[i].hideStatus = true;
            newMessages[i].pointer = false;
            newMessages[i].posx = "center";
            newMessages[i].textAlign= "center";
                break;
            case "received":
 
            newMessages[i].posx = "left";
                break;
            default:
            newMessages[i].posx = "right";
                break;
        }




       
    } return newMessages})
</script>