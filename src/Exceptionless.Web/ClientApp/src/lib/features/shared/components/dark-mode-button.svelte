<script lang="ts">
    import { Button } from '$comp/ui/button';
    import * as ContextMenu from '$comp/ui/context-menu';
    import Moon from '@lucide/svelte/icons/moon';
    import Sun from '@lucide/svelte/icons/sun';
    import { setMode, toggleMode, userPrefersMode } from 'mode-watcher';

    function onUserThemePreferenceChange(mode?: string) {
        setMode(mode as 'dark' | 'light' | 'system');
    }
</script>

<ContextMenu.Root>
    <ContextMenu.Trigger>
        <Button onclick={toggleMode} size="icon" title="Toggle dark mode" variant="outline">
            <Sun class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span class="sr-only">Toggle theme</span>
        </Button>
    </ContextMenu.Trigger>
    <ContextMenu.Content>
        <ContextMenu.RadioGroup onValueChange={onUserThemePreferenceChange} value={userPrefersMode.current}>
            <ContextMenu.RadioItem value="light">Light</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="dark">Dark</ContextMenu.RadioItem>
            <ContextMenu.RadioItem value="system">System</ContextMenu.RadioItem>
        </ContextMenu.RadioGroup>
    </ContextMenu.Content>
</ContextMenu.Root>
