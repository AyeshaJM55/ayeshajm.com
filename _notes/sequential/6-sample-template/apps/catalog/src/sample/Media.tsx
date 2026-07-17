import { Image, Video, Corners } from "@tpl/ui";
import { Page, Demo, Grid } from "../shell/Showcase";

const IMG = "https://picsum.photos/seed/tpl-media/800/600";
const VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";

export function MediaPage() {
  return (
    <Page
      title="Media"
      description="Image and Video with loading / loaded / error states, object fit, scrim overlays, decorative corners, and an optional mute toggle. Both fall back to the animated Placeholder."
    >
      <Demo label="Image · states">
        <Grid cols={3}>
          <div className="flex flex-col gap-2">
            <Image src={IMG} alt="Loaded" ratio="video" />
            <span className="text-body-sm text-fg-muted">Loaded</span>
          </div>
          <div className="flex flex-col gap-2">
            <Image src="https://invalid.example/none.jpg" alt="Broken source" ratio="video" />
            <span className="text-body-sm text-fg-muted">Error → Placeholder</span>
          </div>
          <div className="flex flex-col gap-2">
            <Image ratio="video" />
            <span className="text-body-sm text-fg-muted">No source → Placeholder</span>
          </div>
        </Grid>
      </Demo>

      <Demo label="Image · overlays + corners">
        <Grid cols={3}>
          <Image src={IMG} alt="Vignette overlay" ratio="square" overlay="vignette" />
          <Image src={IMG} alt="Bottom scrim" ratio="square" overlay="bottom" />
          <Image src={IMG} alt="With corners" ratio="square" corners cornerTone="brand" />
        </Grid>
      </Demo>

      <Demo label="Image · fit">
        <Grid cols={3}>
          <Image src={IMG} alt="cover" ratio="square" fit="cover" />
          <Image src={IMG} alt="contain" ratio="square" fit="contain" />
          <Image src={IMG} alt="top" ratio="square" position="top" />
        </Grid>
      </Demo>

      <Demo label="Video · autoplay loop + mute toggle">
        <Grid cols={2}>
          <Video src={VIDEO} ratio="video" volumeToggle overlay="subtle" />
          <Video src={VIDEO} ratio="video" controls autoPlay={false} />
        </Grid>
      </Demo>

      <Demo label="Video · missing source falls back">
        <Grid cols={2}>
          <Video ratio="video" />
          <Video src={VIDEO} ratio="video" corners cornerTone="brand" />
        </Grid>
      </Demo>

      <Demo label="Corners · decorative brackets">
        <Grid cols={3}>
          <div className="relative aspect-video rounded-lg border border-border bg-surface">
            <Corners tone="brand" />
          </div>
          <div className="relative aspect-video rounded-lg border border-border bg-surface">
            <Corners tone="fg" size="lg" show={[true, false, false, true]} />
          </div>
          <div className="relative aspect-video rounded-lg border border-border bg-surface">
            <Corners tone="neutral" size="sm" inset="out" />
          </div>
        </Grid>
      </Demo>
    </Page>
  );
}
