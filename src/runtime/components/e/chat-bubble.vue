<template>
    <div class="bubble bottom left">
       Sorry, Dave. I'm afraid I can't do that.
    </div>
</template>
<style scoped lang="scss">
$bottom-triangle-height: 0.30rem;

.bubble {
    --current-color: turquoise;

    position: relative;
    font-family: sans-serif;
    width: fit-content;
    padding: var(--e-core-padding-x);
    background: var(--current-color);
    border-radius: var(--e-rounded-border-radius);
    text-align: center;
    color: #000;
    margin-top: 1rem;

    &:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
    animation: anim2 2s ease-in-out infinite;

    }

    &.right {
        &:before {
            left: unset;
            right: calc($bottom-triangle-height*2);
            border-right: calc($bottom-triangle-height*2) solid var(--current-color);
            border-left: $bottom-triangle-height solid transparent;
        }
    }

    &.left {
        &:before {
            left: calc($bottom-triangle-height*2);
            border-left: calc($bottom-triangle-height*2) solid var(--current-color);
            border-right: $bottom-triangle-height solid transparent;
        }
    }

    animation: anim1 2s  ease-in-out infinite;
}

.bottom {
    margin-bottom: $bottom-triangle-height*9;

    &:before {
        border-top: $bottom-triangle-height solid var(--current-color);
        border-bottom: calc($bottom-triangle-height*2) solid transparent;
        left: calc($bottom-triangle-height*2);
        bottom: calc(-2.5*$bottom-triangle-height);
    }
}


.top {
    margin-top: $bottom-triangle-height*4;

    &:before {
        top: calc(-2.5*$bottom-triangle-height);
        border-bottom: $bottom-triangle-height solid var(--current-color);
        border-top: calc($bottom-triangle-height*2) solid transparent;
    }

    @keyframes anim1 {
        from {
            scale: 0.9;
   
        }
15%{
    scale: 1.05;
}
        20% {
            scale: 1;
        

        }
        100%{
            scale:1;
        }
    
    }
    
    @keyframes anim2 {
        0% {
            scale: 1.5;
   
        }
        15%{
    scale: 1.05;
}
        20% {
            scale: 1;
        

        }
        100%{
            scale:1;
        }
    }
}
</style>