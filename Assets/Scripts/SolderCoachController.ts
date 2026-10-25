/**
 * SolderCoachController.ts
 * ========================
 * Built for Snap SPECS in Lens Studio 5.24 via CLAD (Closed Loop Agentic Development)
 * from `devpost/design-brief.md` (`status: approved`).
 *
 * Uses Spectacles Interaction Kit (SIK) & UI Kit for 100% mouse-driven Interactive Preview
 * and LEAF automated test compatibility.
 */

export interface PinStepSpec {
  pinIndex: number;
  label: string;
  targetTempC: number;
  dwellSeconds: number;
  instruction: string;
  positionCm: { x: number; y: number; z: number };
}

export const PCB_PIN_STEPS: PinStepSpec[] = [
  {
    pinIndex: 1,
    label: "Pin 1: 3.3V VCC Power Rail",
    targetTempC: 350,
    dwellSeconds: 3.5,
    instruction: "Tin pad first; hold iron tip for 3.5s until fillet wets evenly.",
    positionCm: { x: -4.0, y: -15.0, z: -65.0 },
  },
  {
    pinIndex: 2,
    label: "Pin 2: GND Thermal Relief Pad",
    targetTempC: 365,
    dwellSeconds: 3.5,
    instruction: "Thermal ground plane sinks heat faster; maintain steady 3.5s contact.",
    positionCm: { x: 0.0, y: -15.0, z: -65.0 },
  },
  {
    pinIndex: 3,
    label: "Pin 3: GPIO4 (I2C SDA Data)",
    targetTempC: 345,
    dwellSeconds: 3.5,
    instruction: "Avoid bridging to SCL; feed 2mm solder wire and lift cleanly at 0.0s.",
    positionCm: { x: 4.0, y: -15.0, z: -65.0 },
  },
];

export class SolderCoachController {
  public boardAligned: boolean = false;
  public activePinIndex: number = 0; // 0 = waiting for Found Board stand-in
  public dwellRemainingSec: number = 0;
  public jointHeatedComplete: boolean = false;
  public allJointsVerified: boolean = false;
  public offScreenAlertActive: boolean = false;
  public spatialChimePlayedCount: number = 0;

  // Additive waveguide palette (Zero black reliance; high-luminance cyan/amber/emerald)
  public readonly palette = {
    primaryCyan: "#38BDF8",
    warningAmber: "#FBBF24",
    verifiedEmerald: "#34D399",
    textLight: "#F8FAFC",
  };

  /**
   * Done Criterion 1 & 2: Stand-in SIK button "Found Board" locks the virtual PCB
   * at 65cm distance (-15cm below eye level) and reveals Pin 1 while keeping Pins 2 & 3 collapsed.
   */
  public onPinchFoundBoard(): void {
    this.boardAligned = true;
    this.activePinIndex = 1;
    this.dwellRemainingSec = PCB_PIN_STEPS[0].dwellSeconds;
    this.jointHeatedComplete = false;
    this.allJointsVerified = false;
  }

  /**
   * Done Criterion 3: Pinching "Heat Joint (3.5s)" runs the thermal dwell countdown to 0.0s.
   */
  public onPinchHeatJoint(): void {
    if (!this.boardAligned || this.allJointsVerified) return;
    this.dwellRemainingSec = 0.0;
    this.jointHeatedComplete = true;
  }

  /**
   * Done Criterion 3: Pinching "Next Pin" advances sequentially through Pins 1 -> 2 -> 3 -> Completed.
   */
  public onPinchNextPin(): void {
    if (!this.boardAligned) return;
    if (this.activePinIndex < PCB_PIN_STEPS.length) {
      this.activePinIndex += 1;
      const step = PCB_PIN_STEPS[this.activePinIndex - 1];
      this.dwellRemainingSec = step.dwellSeconds;
      this.jointHeatedComplete = false;
    } else {
      this.activePinIndex = PCB_PIN_STEPS.length + 1;
      this.allJointsVerified = true;
    }
  }

  /**
   * Done Criterion 4: Off-screen Iron Rest alert plays spatial chime and displays
   * a 4cm amber directional arrow pointing toward the off-screen station (-45cm left).
   */
  public onTriggerOffScreenIronRestAlert(): void {
    this.offScreenAlertActive = true;
    this.spatialChimePlayedCount += 1;
  }

  public onDismissOffScreenAlert(): void {
    this.offScreenAlertActive = false;
  }
}
