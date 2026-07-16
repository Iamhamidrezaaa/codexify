import { HomeChrome } from "@/home/HomeChrome";
import { HomeField } from "@/home/HomeField";
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
      <main id="main-content" className="relative overflow-x-clip bg-[#C9C2B6]">
        <HomeField />
        <div className="relative z-[1]">
          <AirHero />
          <MidIgnition />
          <Nocturne />
          <ShearIndex />
          <StoreyManifest />
          <EdgeClose />
        </div>
      </main>
    </>
  );
}
