<template>
  <div class="cont flex-center">
    <svg
      class="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="op-1"
        fill="none"
        stroke-width="9"
        cx="33"
        cy="33"
        r="25"
      />

      <circle
        class="path"
        fill="none"
        stroke-width="9"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="25"
      />
    </svg>
  </div>
</template>
<style scoped lang="scss">
svg {
  stroke: currentColor;
}





$offset: 120;
$duration: 1.5s;

.cont{
  position: relative;
  height: 100%;
  width:100%;
}
.spinner {
  animation: rotator $duration linear infinite;
  position: absolute;
  z-index: 2;
  top:0;
  height: 100%;
  width:100%;
  aspect-ratio: 1;
}

@keyframes rotator {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(270deg); }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation:
    dash $duration ease-in-out infinite, 

}



@keyframes dash {
 0% { stroke-dashoffset: $offset; }
 50% {
   stroke-dashoffset: calc($offset / 4);
   transform:rotate(5deg);
 }
 100% {
   stroke-dashoffset: $offset;
   transform:rotate(450deg);
 }
}
</style>
