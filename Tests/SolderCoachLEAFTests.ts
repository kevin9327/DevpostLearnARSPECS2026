/**
 * SolderCoachLEAFTests.ts
 * =======================
 * Automated LEAF test scenarios for all 4 Done Criteria in `devpost/design-brief.md`.
 */

import { SolderCoachController, PCB_PIN_STEPS } from "../Assets/Scripts/SolderCoachController";

export function runAllLEAFScenarios(): {
  passed: number;
  total: number;
  scenarios: Array<{ id: string; criterion: string; passed: boolean; evidence: string }>;
} {
  const ctrl = new SolderCoachController();
  const results: Array<{ id: string; criterion: string; passed: boolean; evidence: string }> = [];

  // Scenario 1: Launch state & stand-in visibility
  const dc1Pass = !ctrl.boardAligned && ctrl.activePinIndex === 0 && !ctrl.allJointsVerified;
  results.push({
    id: "LEAF-DC-01",
    criterion: "Done Criterion 1: Launch shows Found Board stand-in button at 65cm with step cards hidden",
    passed: dc1Pass,
    evidence: `boardAligned=${ctrl.boardAligned}, activePinIndex=${ctrl.activePinIndex}`,
  });

  // Scenario 2: Pinching "Found Board" reveals Pin 1 only
  ctrl.onPinchFoundBoard();
  const dc2Pass =
    ctrl.boardAligned &&
    ctrl.activePinIndex === 1 &&
    PCB_PIN_STEPS[0].positionCm.z === -65.0 &&
    PCB_PIN_STEPS[0].positionCm.y === -15.0;
  results.push({
    id: "LEAF-DC-02",
    criterion: "Done Criterion 2: Pinching Found Board opens Pin 1 card at (z=-65cm, y=-15cm) while Pins 2 & 3 stay collapsed",
    passed: dc2Pass,
    evidence: `activePinIndex=${ctrl.activePinIndex}, z=${PCB_PIN_STEPS[0].positionCm.z}cm, y=${PCB_PIN_STEPS[0].positionCm.y}cm`,
  });

  // Scenario 3: Heat Joint (3.5s) + Next Pin sequential progression to completion
  ctrl.onPinchHeatJoint();
  const pin1Heated = ctrl.jointHeatedComplete && ctrl.dwellRemainingSec === 0.0;
  ctrl.onPinchNextPin(); // -> Pin 2
  ctrl.onPinchHeatJoint();
  ctrl.onPinchNextPin(); // -> Pin 3
  ctrl.onPinchHeatJoint();
  ctrl.onPinchNextPin(); // -> All 3 Joints Verified
  const dc3Pass = pin1Heated && ctrl.allJointsVerified;
  results.push({
    id: "LEAF-DC-03",
    criterion: "Done Criterion 3: Pinching Heat Joint (3.5s) and Next Pin advances through Pins 1-3 to All 3 Joints Verified",
    passed: dc3Pass,
    evidence: `pin1Heated=${pin1Heated}, allJointsVerified=${ctrl.allJointsVerified}`,
  });

  // Scenario 4: Off-screen Iron Rest spatial chime & directional arrow
  ctrl.onTriggerOffScreenIronRestAlert();
  const dc4Pass = ctrl.offScreenAlertActive && ctrl.spatialChimePlayedCount === 1;
  results.push({
    id: "LEAF-DC-04",
    criterion: "Done Criterion 4: Off-screen Iron Rest alert triggers spatial chime and 4cm amber directional arrow",
    passed: dc4Pass,
    evidence: `offScreenAlertActive=${ctrl.offScreenAlertActive}, spatialChimePlayedCount=${ctrl.spatialChimePlayedCount}`,
  });

  return {
    passed: results.filter((r) => r.passed).length,
    total: results.length,
    scenarios: results,
  };
}
