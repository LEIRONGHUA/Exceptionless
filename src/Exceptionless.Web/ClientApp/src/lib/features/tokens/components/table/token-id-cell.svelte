<script lang="ts">
    import { ViewToken } from '$features/tokens/models';

    interface Props {
        token: ViewToken;
    }

    let { token }: Props = $props();
</script>

<span class={token.is_disabled ? 'line-through' : ''}>
    {token.id}
</span>
