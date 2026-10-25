---
status: approved
---

# Design brief: SolderCoach-SPECS

<!-- Filled in by plan-lens from the learner's interview. Use the learner's words. Mark any value they didn't choose as (default). -->

## The one spatial moment
While soldering a microcontroller header at my workbench with an iron in one hand and solder wire in the other, a tiny glowing cyan dot sits directly over the active PCB pin (`3.3V`, `GND`, or `SDA`) and expands into a `3.5-second` thermal dwell ring and step card only when I'm ready for that joint, with one big pinch button to advance so my eyes never leave the board.

## Why it belongs on glasses
- Uses: shares your view, draws in the world, leaves your body free
- Why it's better than the phone or laptop version: When holding a `350°C` soldering iron and solder wire, looking away at a laptop schematic or unlocking a phone breaks hand alignment and causes cold joints or bridged pins; glasses keep the pin name and dwell timer anchored right next to the board where you are already looking.

## Product or overlay
- Type: overlay: it responds to something real (the electronics workbench and microcontroller PCB)
- What the real version would sense: Fiducial/board recognition of the microcontroller PCB on the workbench surface
- Stand-in for the preview: A virtual workbench (`80 cm x 50 cm`) with a scale PCB model anchored in front of the user, plus an obvious `"Found Board"` SIK pinch button that simulates locking onto the real board and reveals Pin 1.

## Where things live
- Where the user is looking during the main task: Slightly downward (`15 cm` below eye level) at the workbench surface `65 cm` in front of them, well inside the SPECS `37° x 32°` field of view (`usable area ~26 cm x 42 cm` at `65 cm`).
- Virtual Workbench & PCB Stand-In: Anchored `65 cm` in front of the user, `22 cm` below eye level, size `30 cm x 20 cm`.
- Active Pin Callout Dot & Step Card: Sits `6 cm` directly above the active pin on the PCB (`65 cm` away, `15 cm` below eye level), card size `14 cm x 8 cm` (`(default)`), using bright cyan (`#38BDF8`) and warm amber (`#FBBF24`) text (`>= 24 pt` equivalent) for the additive display.
- `"Found Board"` Stand-In Button & `"Next Pin"` Pinch Target: Positioned `10 cm` to the right of the PCB at `65 cm` distance, `18 cm` below eye level, target size `9 cm x 6 cm` so arms stay low and relaxed.
- Off-Screen Fume/Iron Rest Warning Beacon: Docked `45 cm` to the left edge of the bench (`70 cm` away); when triggered while out of the `32°` horizontal view, a `4 cm` directional arrow (`#FBBF24`) and spatial chime point the user toward it.

## Hands and input
- Start / Lock Board: Pinch to press the big `"Found Board"` SIK button (`9 cm x 6 cm`) on the right side of the virtual bench.
- Trigger `3.5s` Thermal Dwell Timer: Pinch to press the `"Heat Joint (3.5s)"` SIK button next to the active pin card.
- Advance to Next Pin: Pinch to press the `"Next Pin"` SIK button (`9 cm x 6 cm`) to advance from `Pin 1: 3.3V VCC` → `Pin 2: GND` → `Pin 3: GPIO4 (I2C SDA)`.
- Targets are big and highlight when aimed at.
- Voice (if any) and the button that does the same job: Voice `"Next pin"` is paired with the physical `"Next Pin"` SIK pinch button so the preview never depends on microphone recognition.

## When things show
- `"Found Board"` Stand-In Button: shows at launch, hides once pinched to lock the board.
- Inactive Pin Dots (`Pins 2 & 3` when on `Pin 1`): stay collapsed as tiny `1.2 cm` dim cyan dots so they don't clutter the `37° x 32°` view.
- Active Pin Step Card & Dwell Ring: shows only for the current step (`Pin 1`, `Pin 2`, or `Pin 3`), hides immediately when advancing to the next pin.
- Completion Badge (`"All 3 Joints Verified"`): shows only after `Pin 3` completes its dwell timer and `"Next Pin"` is pinched.
- If something needs attention out of view: spatial chime + small `4 cm` amber directional arrow (`#FBBF24`) at the left edge of the view pointing toward the off-screen Soldering Iron Rest timer.

## Done criteria
Each one can be checked in Lens Studio's preview.
1. Launching the preview shows the virtual workbench at `65 cm` distance (`15-22 cm` below eye level) with the `"Found Board"` stand-in SIK button visible and all step cards hidden until pinched (`logic proven`).
2. Pinching `"Found Board"` hides the stand-in button and opens the `Pin 1 (3.3V VCC — 350°C)` callout card directly over Pin 1 while keeping Pins 2 and 3 collapsed as small dots (`logic proven`).
3. Pinching `"Heat Joint (3.5s)"` runs the additive amber/emerald countdown ring to `0.0s` (`Joint Ready!`), and pinching `"Next Pin"` advances sequentially through `Pin 2 (GND)` and `Pin 3 (I2C SDA)` to the `"All 3 Joints Verified"` completion state (`logic proven`).
4. Triggering the off-screen Iron Rest alert while looking at the PCB plays a spatial chime and displays the amber directional arrow pointing left toward the off-screen station (`logic proven`; real hand-tracking fatigue and waveguide glare labeled `feel unproven`).

## Out of scope
- Live SnapML camera vision recognizing real solder joints or reading real multimeter screens.
- Two-hand custom gestures or raw finger-joint distance tracking.
- Recording, identifying, or following any person in the room.

## Risks and open questions
- Real solder-iron plume glare against the additive waveguide and long-session thermal comfort can only be evaluated on physical SPECS hardware (`feel unproven`).

## Build notes for CLAD
- Build for SPECS so it runs and can be demonstrated in Lens Studio's preview. No SPECS device is available.
- Use Spectacles Interaction Kit (SIK) and UI Kit for all interactions, so they work with the mouse in Interactive Preview and with LEAF.
- Build any stand-in exactly as described above, and keep it obvious in the scene.
- Use real-world scale in centimeters. Keep content inside the user's view during the main task.
- The display is additive: black renders as transparent. Don't rely on black or very dark content to be seen; keep text light and readable from where the user stands.
- Get the basic flow working first, then add detail.
- Write LEAF scenarios for each done criterion, run them in preview, and report which pass. Say which criteria have no test.
- Don't record, identify, or follow people.

## After the build: judge it
This part is for you, after CLAD finishes.

1. **Does it work?** Ask your agent which LEAF tests passed and which done criteria have no test.
2. **Walk around it.** Open the preview in Interactive Preview. Use WASD to move, Q and E to go down and up, and right-drag (or hold Shift) to look around. Clicking acts as a pinch. Stand where a user would and look at the task.
3. **Ask the three questions.**
   - Does it use what I'm looking at?
   - Does it put something in my space, where it belongs?
   - Does it free my hands or let me keep my eyes up?
   - Would it be just as good on a phone? If so, what would make it need the glasses?
4. **Check comfort.**
   - Everything I need is in view while I do the task. Nothing sits at the edges, behind me, or stuck to my face.
   - Every control is within reach of someone standing there.
   - Text reads easily from where I stand. No dark UI disappearing.
   - Things show when needed and get out of the way.
5. **Label what you know.** Write "logic proven" next to anything the tests and preview show working, and "feel unproven" next to anything only real glasses could tell you (comfort over time, real hand tracking, real recognition).
6. **Fix with design notes, not code.** Tell your agent what to change in design terms, for example: "Move the step card 15 cm lower and next to the pan. Make the Next button twice as big. Re-run the tests." If a fix takes under a minute, like nudging a panel, do it yourself in the scene.
7. **Submit.** Record a video under 3 minutes of your Lens in the preview, public on YouTube. Make your repo public with your Lens Studio project and this `devpost/` folder. Details are on the hackathon site: https://learn-specs.devpost.com/resources
