import { useState } from "react";
import { Table, Pagination, Badge, Button, Checklist, ProgressList, type Column, type Tone } from "@tpl/ui";
import { Page, Demo, Row, Grid } from "../shell/Showcase";
import { USERS, type UserRow } from "../mocks/fixtures";

const STATUS_TONE: Record<UserRow["status"], Tone> = { Active: "success", Invited: "warning", Disabled: "neutral" };

const columns: Column<UserRow>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  {
    key: "status",
    header: "Status",
    align: "right",
    render: (r) => (
      <Badge tone={STATUS_TONE[r.status]} variant="soft">
        {r.status}
      </Badge>
    ),
  },
];

export function DataPage() {
  const [state, setState] = useState<"default" | "loading" | "empty">("default");
  const [page, setPage] = useState(3);
  return (
    <Page title="Data" description="Generic table driven by columns + rows, with loading and empty states; windowed pagination; checklist and labelled progress rows.">
      <Demo label="Table · states">
        <div className="flex flex-col gap-4">
          <Row>
            {(["default", "loading", "empty"] as const).map((s) => (
              <Button key={s} size="sm" variant={s === state ? "solid" : "outline"} onClick={() => setState(s)}>
                {s}
              </Button>
            ))}
          </Row>
          <Table columns={columns} rows={USERS} getRowKey={(r) => r.id} state={state} emptyLabel="No team members yet" />
        </div>
      </Demo>
      <Demo label="Pagination">
        <Pagination page={page} pageCount={12} onPageChange={setPage} />
      </Demo>
      <Demo label="Checklist · 1 and 2 columns">
        <Grid cols={2}>
          <Checklist items={["Token-first styling", "Keyboard accessible", "Light / dark / brand", "Zero backend coupling"]} />
          <Checklist
            columns={2}
            items={["Atoms", "Composites", "Sections", "Templates", "Charts", "Media"]}
          />
        </Grid>
      </Demo>
      <Demo label="ProgressList · labelled rows">
        <ProgressList
          items={[
            { label: "Foundations", status: "Complete", value: 100 },
            { label: "Components", status: "In progress", value: 72 },
            { label: "Docs", status: "Started", value: 35 },
            { label: "Launch", status: "Planned", value: 8 },
          ]}
        />
      </Demo>
    </Page>
  );
}
