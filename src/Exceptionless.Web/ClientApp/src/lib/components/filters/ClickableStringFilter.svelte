<script lang="ts">
    import IconFilter from '~icons/mdi/filter';
    import A from '$comp/typography/A.svelte';
    import { StringFilter } from './filters';

    export let term: string;
    export let value: string | null | undefined;

    const title = `Search ${term}:${value}`;

    let className: string | undefined | null = undefined;
    export { className as class };

    function onSearchClick(e: Event) {
        e.preventDefault();
        document.dispatchEvent(
            new CustomEvent('filter', {
                detail: new StringFilter(term, value ?? undefined)
            })
        );
    }
</script>

<A on:click={onSearchClick} {title} class={className}>
    <slot><IconFilter class="text-muted-foreground text-opacity-50 hover:text-primary" /></slot>
</A>
