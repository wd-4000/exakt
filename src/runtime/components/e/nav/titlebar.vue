

<template>
  <header class="d-flex flex-align-center">
    <h1><slot/></h1>
  </header>
</template>
<style lang="scss" scoped>
header{
    position: sticky;
    top:0;
    left:0;
    height:3.5rem;
    font-size: 0.75rem;
}

@media screen and (max-width: exakt.$e-md-screen-breakpoint) {
  header {
    position: fixed;
    font-size: 0.5rem;
    border-radius: 0;
    width: 100%;
    background: var(--e-color-elev);
  }
}
</style>