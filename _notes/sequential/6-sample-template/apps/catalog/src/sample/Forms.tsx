import { useState } from "react";
import { TextField, Textarea, Select, Checkbox, Switch, SearchField } from "@tpl/ui";
import { Page, Demo, Grid } from "../shell/Showcase";

const MailIcon = (
  <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
    <path d="M3 5l5 3.5L13 5" stroke="currentColor" strokeWidth="1.3" fill="none" />
  </svg>
);

export function FormsPage() {
  const [on, setOn] = useState(true);
  const [query, setQuery] = useState("");
  return (
    <Page title="Forms" description="Inputs with label, hint, error, disabled, and invalid states.">
      <Demo label="Text inputs">
        <Grid cols={2}>
          <TextField label="Name" placeholder="Ada Lovelace" />
          <TextField label="Email" placeholder="you@example.test" leadingIcon={MailIcon} hint="We never share it." />
          <TextField label="Required" required placeholder="Required field" />
          <TextField label="Invalid" defaultValue="nope" error="That value is not allowed." />
          <TextField label="Disabled" placeholder="Disabled" disabled />
          <TextField label="Small" size="sm" placeholder="Small" />
        </Grid>
      </Demo>
      <Demo label="Textarea + Select">
        <Grid cols={2}>
          <Textarea label="Message" placeholder="Write something…" hint="Markdown supported." />
          <Select
            label="Role"
            options={[
              { value: "owner", label: "Owner" },
              { value: "admin", label: "Admin" },
              { value: "viewer", label: "Viewer" },
            ]}
          />
        </Grid>
      </Demo>
      <Demo label="Choice + toggle">
        <div className="flex flex-col gap-4">
          <Checkbox label="Email me product updates" defaultChecked />
          <Checkbox label="Disabled option" disabled />
          <Switch checked={on} onCheckedChange={setOn} label="Enable notifications" />
          <Switch checked={false} onCheckedChange={() => undefined} label="Disabled toggle" disabled />
        </div>
      </Demo>
      <Demo label="Search">
        <SearchField label="Search" placeholder="Search components…" value={query} onChange={(e) => setQuery(e.target.value)} onClear={() => setQuery("")} />
      </Demo>
    </Page>
  );
}
