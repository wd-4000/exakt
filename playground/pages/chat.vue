<template>
  <div>
    <e-chat-renderer :messages="state.messages">
      <template #system="{ text }">
        <div class="sys-message text-secondary">
          {{ text }}
        </div>
      </template> <template #default="{ text, date, id, status, ...bubbleProps }">
        <e-chat-bubble
          v-bind="bubbleProps"
          :key="id"
        >
          {{ text }}
          <template #status>
            <div v-if="date">
              {{ date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
            </div>
            <div
              v-if="status !== 'received'"
              class="ml-1 icon-wrapper"
            >
              <Transition name="slide-up">
                <div
                  v-if="status === `sending`"
                  class="icon-holder"
                >
                  <e-icon
                    :size="17"
                    :icon="msgStatus[0].icon"
                  />
                </div>
                <div
                  v-else-if="status === `sent`"
                  class="icon-holder"
                >
                  <e-icon
                    :size="17"
                    :icon="msgStatus[1].icon"
                  />
                </div>
                <div
                  v-else-if="status === `read`"
                  class="icon-holder"
                >
                  <e-icon
                    :size="17"
                    :icon="msgStatus[2].icon"
                  />
                </div>
              </Transition>
            </div>
          </template>
        </e-chat-bubble>
      </template>
    </e-chat-renderer>
    <form @submit.prevent.capture="submitMessage">
      <div class="d-flex flex-stretch input-box rounded">
        <e-input-text
          v-model="state.msgToSend"
          label="Chat message"
          class="pl-2"
          :solid="true"
          :rounded="false"
        /><e-icon-button
          :icon="'home'"
          size="19"
          background="transparent"
        /><e-icon-button
          type="submit"
          :icon="'home'"
          size="19"
          background="transparent"
        />
      </div>
    </form>
    <div />
  </div>
</template>
<script setup lang="ts">
import { reactive, useNuxtApp } from "#imports";
const { $exakt } = useNuxtApp()
const msgStatus = [{ icon: 'home', text: "sending" }, { icon: 'home', text: "sent" }, { icon: 'home', text: "read" },]
const state = reactive({ msgstatus: 0, interval: null, messages: [{ posy: "bottom", liveTyping: false, pointer: true, id: "1", text: "Hey I was wondering if you got your bogos binted?", status: "received", date: new Date() }, { liveTyping: false, pointer: true, id: "1", text: "Michael filed a suit against you.", status: "system", date: new Date(), }], msgToSend: "" })
const submitMessage = () => {
  console.log("Submit")
  state.messages.push({ liveTyping: false, pointer: true, id: $exakt.makeid(5), text: state.msgToSend, status: "sent", date: new Date(), })
  state.msgToSend = ""
}
</script>
<style scoped lang="scss">
.icon-holder {
  position: absolute;
}

.icon-wrapper {
  width: 20px;
  height: 20px;
  overflow: hidden;
  position: relative;
}

.input-box {
  background-color: var(--e-color-elev);
  overflow: hidden;
}

.sys-message {
  text-align: center;
  font-size: 0.8rem;
  color: var(--e-color-dark);
  margin: 0.5rem 0 1rem 0;
}
</style>