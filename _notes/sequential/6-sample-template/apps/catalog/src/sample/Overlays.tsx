import { useState } from "react";
import { Modal, Drawer, Menu, Tooltip, Button, IconButton } from "@tpl/ui";
import { Page, Demo, Row } from "../shell/Showcase";

const DotsIcon = (
  <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
    <circle cx="3" cy="8" r="1.4" fill="currentColor" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" />
    <circle cx="13" cy="8" r="1.4" fill="currentColor" />
  </svg>
);

export function OverlaysPage() {
  const [modal, setModal] = useState(false);
  const [drawerSide, setDrawerSide] = useState<"left" | "right" | null>(null);
  return (
    <Page title="Overlays" description="Modal, drawer, menu, and tooltip — portalled and keyboard-dismissible.">
      <Demo label="Modal">
        <Button onClick={() => setModal(true)}>Open modal</Button>
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          title="Confirm action"
          footer={
            <>
              <Button variant="ghost" onClick={() => setModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModal(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-body-md text-fg-muted">This is a portalled dialog. Press Escape or click the backdrop to close.</p>
        </Modal>
      </Demo>
      <Demo label="Drawer">
        <Row>
          <Button variant="outline" onClick={() => setDrawerSide("left")}>
            Open left
          </Button>
          <Button variant="outline" onClick={() => setDrawerSide("right")}>
            Open right
          </Button>
        </Row>
        <Drawer open={drawerSide !== null} side={drawerSide ?? "right"} onClose={() => setDrawerSide(null)} title="Drawer">
          <p className="text-body-sm text-fg-muted">Edge-anchored panel. Closes on Escape or backdrop click.</p>
        </Drawer>
      </Demo>
      <Demo label="Menu + Tooltip">
        <Row>
          <Menu
            trigger={<IconButton label="Open menu" icon={DotsIcon} variant="outline" />}
            items={[
              { label: "Edit", onSelect: () => undefined },
              { label: "Duplicate", onSelect: () => undefined },
              { label: "Delete", onSelect: () => undefined, disabled: true },
            ]}
          />
          <Tooltip content="Helpful hint">
            <Button variant="soft">Hover me</Button>
          </Tooltip>
        </Row>
      </Demo>
    </Page>
  );
}
