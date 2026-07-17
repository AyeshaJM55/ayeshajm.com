import {
  Button,
  IconButton,
  Badge,
  Tag,
  Avatar,
  Spinner,
  ProgressBar,
  Skeleton,
  Divider,
  Link,
  Label,
  Kbd,
  Eyebrow,
  Heading,
  Text,
  Rule,
  type Tone,
} from "@tpl/ui";
import { Page, Demo, Row } from "../shell/Showcase";

const PlusIcon = (
  <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
    <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const BUTTON_VARIANTS = ["solid", "gradient", "soft", "outline", "ghost", "link", "danger"] as const;
const BADGE_TONES: Tone[] = ["brand", "neutral", "success", "warning", "danger", "info"];

export function AtomsPage() {
  return (
    <Page title="Atoms" description="The smallest primitives. Buttons lead — every variant, size, and state is shown.">
      <Demo label="Button · variants">
        <Row>
          {BUTTON_VARIANTS.map((v) => (
            <Button key={v} variant={v}>
              {v}
            </Button>
          ))}
        </Row>
      </Demo>
      <Demo label="Button · primary CTA — animated hover (gradient slide + label flip)">
        <Row>
          <Button variant="gradient" size="lg">
            Buy SRT
          </Button>
          <Button variant="gradient">Get started</Button>
          <Button variant="gradient" size="sm">
            Learn more
          </Button>
        </Row>
        <p className="mt-3 text-body-sm text-fg-muted">Hover a button: the gold gradient slides and the label lightens — the SRC header / hero effect.</p>
      </Demo>
      <Demo label="Button · sizes">
        <Row>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </Row>
      </Demo>
      <Demo label="Button · states">
        <Row>
          <Button>Default</Button>
          <Button disabled>Disabled</Button>
          <Button loading>Loading</Button>
          <Button leadingIcon={PlusIcon}>With icon</Button>
          <Button variant="outline" block>
            Full width
          </Button>
        </Row>
      </Demo>
      <Demo label="IconButton">
        <Row>
          <IconButton label="Add" icon={PlusIcon} variant="solid" />
          <IconButton label="Add" icon={PlusIcon} variant="soft" />
          <IconButton label="Add" icon={PlusIcon} variant="ghost" />
          <IconButton label="Add" icon={PlusIcon} variant="outline" />
          <IconButton label="Add" icon={PlusIcon} disabled />
        </Row>
      </Demo>
      <Demo label="Badge · tone × variant">
        <div className="flex flex-col gap-3">
          {(["solid", "soft", "outline"] as const).map((variant) => (
            <Row key={variant}>
              {BADGE_TONES.map((tone) => (
                <Badge key={tone} tone={tone} variant={variant}>
                  {tone}
                </Badge>
              ))}
            </Row>
          ))}
        </div>
      </Demo>
      <Demo label="Tag · default + removable">
        <Row>
          <Tag>Plain</Tag>
          <Tag onRemove={() => undefined}>Removable</Tag>
          <Tag onRemove={() => undefined}>Filter: active</Tag>
        </Row>
      </Demo>
      <Demo label="Avatar · image, initials, status">
        <Row>
          <Avatar name="Ada Lovelace" src="https://i.pravatar.cc/80?img=5" />
          <Avatar name="Grace Hopper" />
          <Avatar name="Alan Turing" status="online" />
          <Avatar name="Katherine Johnson" status="busy" size="lg" />
          <Avatar name="Small One" size="sm" />
        </Row>
      </Demo>
      <Demo label="Indicators">
        <div className="flex flex-col gap-5">
          <Row>
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </Row>
          <ProgressBar value={62} />
          <ProgressBar indeterminate />
          <Skeleton className="h-4 w-48" />
        </div>
      </Demo>
      <Demo label="Typography atoms">
        <div className="flex flex-col gap-4">
          <Eyebrow>Section label</Eyebrow>
          <Rule />
          <Heading level={2} size="display-1">
            Heading atom
          </Heading>
          <Text tone="muted">Body text atom with a muted tone for supporting copy.</Text>
          <Row>
            <Link href="#/atoms">Inline link</Link>
            <Label>Field label</Label>
            <span className="text-body-sm text-fg-muted">
              Press <Kbd>⌘</Kbd> <Kbd>K</Kbd>
            </span>
          </Row>
          <Divider label="or" />
        </div>
      </Demo>
    </Page>
  );
}
