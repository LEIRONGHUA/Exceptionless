<script lang="ts">
    import { P } from '$comp/typography';
    import * as AlertDialog from '$comp/ui/alert-dialog';
    import * as Form from '$comp/ui/form';
    import { Textarea } from '$comp/ui/textarea';
    import { defaults, superForm } from 'sveltekit-superforms';
    import { classvalidatorClient } from 'sveltekit-superforms/adapters';

    import { UpdateToken } from '../../models';

    interface Props {
        notes?: string;
        open: boolean;
        save: (notes?: string) => Promise<void>;
    }

    let { notes, open = $bindable(), save }: Props = $props();

    var defaultToken = new UpdateToken();
    defaultToken.notes = notes;
    defaultToken.is_disabled = false;

    const form = superForm(defaults(defaultToken, classvalidatorClient(UpdateToken)), {
        dataType: 'json',
        async onUpdate({ form }) {
            if (!form.valid) {
                return;
            }

            await save(form.data.notes?.trim() ?? undefined);
            open = false;
        },
        SPA: true,
        validators: classvalidatorClient(UpdateToken)
    });

    const { enhance, form: formData } = form;
</script>

<AlertDialog.Root bind:open>
    <AlertDialog.Content class="sm:max-w-[425px]">
        <form method="POST" use:enhance>
            <AlertDialog.Header>
                <AlertDialog.Title>API Key Notes</AlertDialog.Title>
            </AlertDialog.Header>

            <P class="pb-4">
                <Form.Field {form} name="notes">
                    <Form.Control>
                        {#snippet children({ props })}
                            <Form.Label>Notes</Form.Label>
                            <Textarea {...props} bind:value={$formData.notes} placeholder="Please enter notes" autocomplete="off" />
                        {/snippet}
                    </Form.Control>
                    <Form.Description />
                    <Form.FieldErrors />
                </Form.Field>
            </P>

            <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <AlertDialog.Action>Save Notes</AlertDialog.Action>
            </AlertDialog.Footer>
        </form>
    </AlertDialog.Content>
</AlertDialog.Root>
