<script lang="ts">
    import type { StackStatus } from '$features/stacks/models';

    import { A, Muted } from '$comp/typography';
    import StackStatusBadge from '$features/stacks/components/stack-status-badge.svelte';
    import ChevronRight from '@lucide/svelte/icons/chevron-right';

    import type { StackSummaryModel, SummaryModel, SummaryTemplateKeys } from './index';

    interface Props {
        badgeStatus: StackStatus;
        showBadge: boolean;
        summary: SummaryModel<SummaryTemplateKeys>;
    }

    let { badgeStatus, showBadge, summary }: Props = $props();
    let source = $derived(summary as StackSummaryModel<'stack-simple-summary'>);
</script>

{#if showBadge}
    <StackStatusBadge status={badgeStatus} />
{/if}

<div class="line-clamp-2">
    <strong>
        <abbr title={source.data.TypeFullName}>{source.data.Type}</abbr>:
    </strong>

    <A class="inline">{source.title}</A>
</div>

{#if source.data.Path}
    <Muted class="hidden sm:block">
        <ChevronRight class="inline size-4" />
        <span class="line-clamp-1 inline">{source.data.Path}</span>
    </Muted>
{/if}
