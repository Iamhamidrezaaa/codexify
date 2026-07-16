import type { InteractionMeta } from "@/lab/types";
import { meta001 } from "./interactions/Interaction001/meta";
import { meta002 } from "./interactions/Interaction002/meta";
import { meta003 } from "./interactions/Interaction003/meta";
import { meta004 } from "./interactions/Interaction004/meta";
import { meta005 } from "./interactions/Interaction005/meta";
import { meta006 } from "./interactions/Interaction006/meta";
import { meta007 } from "./interactions/Interaction007/meta";
import { meta008 } from "./interactions/Interaction008/meta";
import { meta009 } from "./interactions/Interaction009/meta";
import { meta010 } from "./interactions/Interaction010/meta";

/** Ordered library registry — source of truth for the lab demo. */
export const interactionRegistry: InteractionMeta[] = [
  meta001,
  meta002,
  meta003,
  meta004,
  meta005,
  meta006,
  meta007,
  meta008,
  meta009,
  meta010,
];

export function getInteraction(id: string) {
  return interactionRegistry.find((item) => item.id === id);
}

export function getInteractionsByCategory(category: InteractionMeta["category"]) {
  return interactionRegistry.filter((item) => item.category === category);
}
