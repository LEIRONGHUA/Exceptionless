<script lang="ts">
    import XIcon from '$comp/icons/XIcon.svelte';
    import { A } from '$comp/typography';
    import { getAboutQuery } from '$features/status/api.svelte';
    import Facebook from '@lucide/svelte/icons/facebook';
    import GitHub from '@lucide/svelte/icons/github';
    import Web from '@lucide/svelte/icons/globe';

    const currentYear = new Date().getFullYear();

    const aboutQuery = getAboutQuery();
    const version = $derived(aboutQuery.data?.informational_version?.split('+')[0]);
</script>

<div class="text-muted-foreground mx-4 my-6 text-sm md:flex md:items-center md:justify-between">
    <ul class="mb-6 flex flex-wrap items-center md:mb-0">
        <li>
            &copy; {currentYear}
            <A class="mr-4 md:mr-6" href="https://exceptionless.com" target="_blank" variant="navigation">Exceptionless</A>
        </li>
        <li>
            <A class="mr-4 md:mr-6" href="https://exceptionless.com/news/" variant="navigation" target="_blank">News</A>
        </li>
        <li>
            <A class="mr-4 md:mr-6" href="https://exceptionless.com/terms/" variant="navigation" target="_blank">Terms of Use</A>
        </li>
        <li>
            <A class="mr-4 md:mr-6" href="https://exceptionless.com/privacy/" variant="navigation" target="_blank">Privacy Policy</A>
        </li>
        <li>
            <A class="mr-4 md:mr-6" href="https://exceptionless.com" variant="navigation" target="_blank">Contact</A>
        </li>
        <li>
            <A href="https://github.com/exceptionless/Exceptionless/releases" variant="navigation" target="_blank"
                >{#if aboutQuery.isSuccess}
                    {version}
                {:else}
                    Releases
                {/if}</A
            >
        </li>
    </ul>
    <div class="flex space-x-6 sm:justify-center">
        <A aria-label="Exceptionless Facebook Website" href="https://www.facebook.com/exceptionless/" target="_blank" variant="navigation">
            <Facebook class="size-5" />
        </A>
        <A aria-label="Exceptionless X Website" href="https://x.com/Exceptionless" target="_blank" variant="navigation">
            <XIcon class="size-5" />
        </A>
        <A aria-label="Exceptionless GitHub Repository" href="https://github.com/exceptionless" target="_blank" variant="navigation">
            <GitHub class="size-5" />
        </A>
        <A aria-label="Exceptionless Website" href="https://exceptionless.com/" target="_blank" variant="navigation">
            <Web class="size-5" />
        </A>
    </div>
</div>
