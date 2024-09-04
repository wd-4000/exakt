<template>
    <div class="hr"><slot/></div>
</template>
<style scoped>
.hr {
  display: flex;
  align-items: center;
  text-align: center;
}

.hr::before,
.hr::after {
  content: '';
  flex: 1;
  border-bottom: .125em solid var(--e-color-elev);
}

.hr:not(:empty)::before {
  margin-right: .75em;
}

.hr:not(:empty)::after {
  margin-left: .75em;
}
</style>