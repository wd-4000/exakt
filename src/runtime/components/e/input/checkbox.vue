<template>
    <label class="d-flex flex-align-center mt-3">
        <input type="checkbox" name="checkbox"></input>
        <slot />
    </label>
</template>
<style lang="scss" scoped>
input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: var(--e-color-i-inactive);

    margin: 0;
    outline: var(--e-color-i-outline) solid 0.1rem;

    font-family: 'Material Symbols Outlined';
    color: transparent;

    width: 1.15em;
    margin-right: 0.4rem;
    height: 1.15em;
    border-radius: 0.15em;

    display: flex;

    transition: background-color 0.15s, transform 0.15s;


    &:hover {
        background-color: var(--e-color-elev-2);
    }

    &::before {
        content: "check";
        background-color: var(--e-color-primary);
        border-radius: 0.15em;
        width: 100%;
        text-align: center;
        transform: scale(0);
        transition: transform 0.15s ease-in-out, color 0.15s;
    }

    &:checked::before {
        transform: scale(1);
        color: var(--e-color-i-inactive);

    }
}



input[type="checkbox"]:active {
    transform: scale(0.9);

    &::before {
        color: transparent;
        transform: scale(0.65);
    }
}









// input[type="checkbox"]:focus {
//     outline: max(2px, 0.15em) solid currentColor;
//     outline-offset: max(2px, 0.15em);
// }

input[type="checkbox"]:disabled {
    --form-control-color: var(--form-control-disabled);

    color: var(--form-control-disabled);
    cursor: not-allowed;
}
</style>