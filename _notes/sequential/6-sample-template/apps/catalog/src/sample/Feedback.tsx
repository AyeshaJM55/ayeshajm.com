import { useState } from "react";
import { Alert, EmptyState, Toast, Placeholder, Button } from "@tpl/ui";
import { Page, Demo, Grid } from "../shell/Showcase";

const InboxIcon = (
  <svg viewBox="0 0 32 32" className="size-10" aria-hidden="true">
    <path d="M5 8h22l-3 12H8L5 8Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round" />
    <path d="M11 20a5 5 0 0 0 10 0" stroke="currentColor" strokeWidth="1.4" fill="none" />
  </svg>
);

export function FeedbackPage() {
  const [showAlert, setShowAlert] = useState(true);
  return (
    <Page title="Feedback" description="Alerts, empty states, toasts, and the animated SMIL placeholder.">
      <Demo label="Alert · tones">
        <div className="flex flex-col gap-3">
          <Alert tone="info" title="Heads up">This is an informational message.</Alert>
          <Alert tone="success" title="Saved">Your changes were stored.</Alert>
          <Alert tone="warning" title="Careful">This action affects billing.</Alert>
          <Alert tone="danger" title="Error">Something went wrong.</Alert>
          {showAlert && (
            <Alert tone="info" title="Dismissible" onClose={() => setShowAlert(false)}>
              Click the × to dismiss me.
            </Alert>
          )}
        </div>
      </Demo>
      <Demo label="Empty state">
        <EmptyState icon={InboxIcon} title="No messages yet" description="When you receive messages they will show up here." action={<Button size="sm">Compose</Button>} />
      </Demo>
      <Demo label="Toast">
        <div className="flex flex-col gap-3">
          <Toast title="Copied to clipboard" />
          <Toast tone="success" title="Deployment complete" description="v0.1.0 is live." onClose={() => undefined} />
          <Toast tone="danger" title="Upload failed" description="Check your connection." onClose={() => undefined} />
        </div>
      </Demo>
      <Demo label="Placeholder (SMIL)">
        <Grid cols={3}>
          <div className="h-32">
            <Placeholder />
          </div>
          <div className="h-32">
            <Placeholder label="Image" />
          </div>
          <div className="h-32">
            <Placeholder label="Video" />
          </div>
        </Grid>
      </Demo>
    </Page>
  );
}
