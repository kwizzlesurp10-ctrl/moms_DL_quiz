import type { StudyGuideSection } from "./types.js";

/** Curated summaries from the public Minnesota Driver’s Handbook study flow. */
export const STUDY_GUIDE_SECTIONS: readonly StudyGuideSection[] = [
  {
    id: "road-signs-markings",
    title: "Road Signs & Markings",
    bullets: [
      "Red signs = Stop or do not do something.",
      "Yellow / yellow-green = Warning (school zones, curves, pedestrians).",
      "Orange = Construction / work zone — slow down.",
      "Broken white line = You can change lanes or pass when safe.",
      "Solid yellow line = No passing (double solid = very dangerous).",
      "Red arrow = Do NOT turn in that direction until green allows it.",
    ],
  },
  {
    id: "right-of-way",
    title: "Right-of-Way Rules",
    bullets: [
      "At four-way stops or when no signs: yield to the driver on your right.",
      "Yield to pedestrians in crosswalks (even when unmarked).",
      "School bus with red lights + stop arm = STOP at least ~20 ft away.",
      "Emergency vehicles with lights/siren — pull right and stop.",
      "Move Over Law: slow down and move away from stopped emergency/tow/maintenance.",
      "Roundabouts — yield to traffic already in the circle.",
    ],
  },
  {
    id: "speed-passing",
    title: "Speed & Passing",
    bullets: [
      "Default limits (when not signed): roughly 30 mph in towns, ~55 mph on highways, alleys typically 10–15 mph.",
      "Drive only as fast as conditions allow (traffic, snow, glare).",
      "Pass on the left; signal and return when safely clear.",
      "Never pass near hills, curves, or within roughly 100 ft of intersections/rail crossings when unsafe.",
      "Excessive speeding can bring escalating penalties (consult current fine schedules).",
    ],
  },
  {
    id: "winter-night",
    title: "Winter & Night Driving (Minnesota-heavy)",
    bullets: [
      "Headlights on when visibility drops below roughly 500 feet or in precipitation.",
      "Use low beams in snow, fog, or when closely following.",
      "Clear ice/snow completely from lights, mirrors, and glass before moving.",
      "Increase following gap to roughly 4–5 seconds when roads are slippery.",
      "If stranded — stay in the vehicle, flashers on, ventilate if idling periodically.",
      "Never pass snowplows until visibility is crystal clear.",
    ],
  },
  {
    id: "distracted-seatbelts",
    title: "Distracted Driving & Seat Belts",
    bullets: [
      "Minnesota prohibits holding a phone while driving — even at signals in traffic queues.",
      "Seat belts are enforced as primary violations (officers may stop solely for misuse).",
      "Hands off social feeds, texts, and scroll loops while moving.",
      "Child restraints — follow law and labeling (rear‑facing by age/size, booster rules, etc.).",
    ],
  },
  {
    id: "alcohol-drugs-misc",
    title: "Alcohol, Drugs & Other Rules",
    bullets: [
      "Typical BAC limit for non‑commercial drivers remains 0.08% statewide (commercial lower).",
      "Medications causing drowsiness can be as risky as drinking.",
      "Right-on-red permitted after stop + yield unless a sign forbids.",
      "Don’t clog intersections — pull up only when the far side clears.",
      "Rail crossings with active signals/gates demand a full stop and patience.",
    ],
  },
];

export const SIPDE_SUMMARY_TEXT =
  "Use SIPDE continuously: Scan, Identify, Predict, Decide, Execute — it anchors hazard perception on every drive.";
