import type { ComparisonCard } from "./types.js";

/**
 * Highlights interstate differences emphasized in the original study page.
 */
export const OHIO_VERSUS_MINNESOTA_CARDS: readonly ComparisonCard[] = [
  {
    id: "seat-belts",
    title: "Seat Belt Law",
    paragraphsHtml: [
      "<strong>Minnesota (primary).</strong> Police may stop solely for restraint violations — every seated occupant should be buckled. Typical fine listed around $25 in study materials.",
      "<strong>Ohio (secondary).</strong> Historically restrained by primary-offense statutes; citations often hinge on another stop.",
    ],
  },
  {
    id: "hands-free-phone",
    title: "Cell Phone / Hands-Free Law",
    paragraphsHtml: [
      "<strong>Minnesota.</strong> No handset contact while controlling a vehicle—including waiting in congestion. Phones must remain mounted/voice-assisted with minimal touches.",
      "<strong>Ohio.</strong> Texting bans are strict, but statutes around handheld voice calls historically differ — treat Minnesota as materially stricter.",
    ],
  },
  {
    id: "winter-driving",
    title: "Winter Driving",
    paragraphsHtml: [
      "<strong>Minnesota tests</strong> focus on traction loss, stranded protocol, obeying snowplows, and fully clearing rooftop snow.",
      "<strong>Ohio</strong> winters are comparatively mild — less manual emphasis overall.",
    ],
  },
  {
    id: "other-differences",
    title: "Other Biggest Differences",
    paragraphsHtml: [
      '<ul class="comparison-bullets"><li>Move-over expectations for flashing lights roadside.</li><li>School-bus divided-highway exemptions differ — always read posted signs.</li><li>Reduced-conflict intersections and J‑turn geometries appear more commonly on MN arterial highways.</li><li>MN reinforces default alley speeds (~10‑15 mph) and headlight-anytime-weird-weather statutes.</li></ul>',
    ],
  },
];
