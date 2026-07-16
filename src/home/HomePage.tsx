import { HomeChrome } from "@/home/HomeChrome";
import { AirHero } from "@/home/views/AirHero";
import { EdgeClose } from "@/home/views/EdgeClose";
import { MidIgnition } from "@/home/views/MidIgnition";
import { Nocturne } from "@/home/views/Nocturne";
import { ShearIndex } from "@/home/views/ShearIndex";
import { StoreyManifest } from "@/home/views/StoreyManifest";

export function HomePage() {
  return (
    <>
      <HomeChrome />
      <main id="main-content">
        <AirHero />
        <MidIgnition />
        <Nocturne />
        <ShearIndex />
        <StoreyManifest />
        <EdgeClose />
      </main>
    </>
  );
}
