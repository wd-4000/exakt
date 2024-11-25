<template>
  <div class="bg-fg px-6 rounded my-6">
    <h1 class="text-center mb-0 pb-3">
      Exakt UI
    </h1>   
    <h3>Colors</h3>
    <div class="pa-5 rounded fullwidth mb-6 bg-source">Source</div>
    <div class="bg-fg pa-5 rounded">fg

      <div class="fullwidth bg-elev">Elev</div>
    <div class="fullwidth bg-elev-2">Elev-2</div>
    <div class="fullwidth bg-elev-3">Elev-3</div>
    </div>
 

    <h3>Buttons</h3>
    <ENavBtn>Bruh</ENavBtn>
    <EBtn
      :loading="state.button1loading"
      @click="state.button1loading = !state.button1loading"
    >
      Solid button
    </EBtn>
    <e-btn
      :solid="false"
      :block="true"
      background="transparent"
      justify="space-between"
    >
      <div>Space</div><div>Between</div>
    </e-btn>
    <div style="position: relative;">
      <e-progress-linear :model-value="true" />
    </div>
    <EChip
      v-model="chip"
      icon="water_drop"
    >
      Chip
    </EChip>

    <h3>Alert</h3>
    <EAlert type="error">
      This is an error alert
    </EAlert>

    <h3>Dialogs</h3>
    <EDialog
      v-model="state.dialog1"
      title="Dialog title"
    >
      <p>Dialog content</p>
      <template #buttons>
        <EBtn @click="state.dialog1 = false">
          Close
        </EBtn>
      </template>
    </EDialog>
    <EBtn @click="state.dialog1 = true">
      Open dialog
    </EBtn>

    <h3>Dropdown</h3>
    <EDropdown
      width="10rem"
      :items="presets"
      @update:model-value="state.dropdown = $event"
    >
      <EBtn
        :solid="true"
        background="primary"
        icon="person"
      >
        <e-icon
          v-if="presets[state.dropdown].icon"
          :size="20"
       
          class="mr-2"
        >
          add
        </e-icon>
        Menu
      </EBtn>
    </EDropdown>
    <h2 class="text-center mb-0 pb-3">
      Form inputs
    </h2>
    <hr>
    <h3>Radio</h3>
    <e-input-radio
      v-model="state.dropdown"
      :items="presets"
      use-key="name"
    />
    <div
  
      class="px-6 pt-2 pb-6 rounded bg-fg"
    > 
      <h3 class="mb-6">
        Input
      </h3>

      <e-input-text
        label="Regular input"
        :solid="true"
        class="mb-4"
      />
      <e-input-text
        label="Regular input w/icon"
        :solid="true"
        icon="person"
        class="mb-4"
      />


      <e-input-text
        type="date" 
        class="mb-4"
      />


      <e-input-text
        type="textarea"
        label="Text area"
        :solid="true"
      />
    </div>
  </div>
</template>
    
<script setup>
import { reactive, ref } from "#imports";
const state = reactive({ msgToSend: "", button1loading: false, dialog1: false, dropdown: 0 })
const chip = ref(false);
const presets = [
  {
    name: "Blank",
    icon: 'home',
    segments: [{ text: "" }],
  },
  {
    name: "Yes/No/Maybe",
    icon: 'home',
    segments: [{ text: "Yes" }, { text: "No" }, { text: "Maybe" }],
  },
  {
    name: "6-side Dice",
    icon: 'home',
    segments: [
      { text: "1" },
      { text: "2" },
      { text: "3" },
      { text: "4" },
      { text: "5" },
      { text: "6" },
    ],
  },
  {
    name: "D20",
    icon: 'home',
    segments: [
      { text: "1" },
      { text: "2" },
      { text: "3" },
      { text: "4" },
      { text: "5" },
      { text: "6" },
      { text: "7" },
      { text: "8" },
      { text: "9" },
      { text: "10" },
      { text: "11" },
      { text: "12" },
      { text: "13" },
      { text: "14" },
      { text: "15" },
      { text: "16" },
      { text: "17" },
      { text: "18" },
      { text: "19" },
      { text: "20" },
    ],
  },
  {
    name: "8-ball",
    icon: 'home',
    segments: [
      { text: "Uncertain" },
      { text: "Definitely No" },
      { text: "Definitely Yes" },
      { text: "Perhaps" },
      { text: "Most likely" },
      { text: "Most likely no" },
    ],
  },
  {
    name: "Food",
    icon: 'home',
    segments: [
      { text: "Pizza" },
      { text: "Sushi" },
      { text: "Pasta" },
      { text: "Tacos" },
      { text: "Salad" },
    ],
  },
  {
    name: "Import",
    icon: 'home',
  },
];


</script>


