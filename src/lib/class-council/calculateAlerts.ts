import { COUNCIL_CRITERIA } from "./constants";
import type { StudentAlertInput, StudentAlerts } from "@/types/class-council";

export function countLowGrades(input: StudentAlertInput, term: number): number {
  return input.results.reduce(
    (total, result) => total + (result.term === term && typeof result.grade === "number" && result.grade < COUNCIL_CRITERIA.lowGradeThreshold ? 1 : 0),
    0,
  );
}

export function calculateStudentAlerts(input: StudentAlertInput, currentTerm: number): StudentAlerts {
  const currentLowGradeCount = countLowGrades(input, currentTerm);
  const previousTerms = [...new Set(input.results.filter((result) => result.term < currentTerm).map((result) => result.term))].sort((a, b) => b - a);
  const previousLowGradeCount = previousTerms.length ? countLowGrades(input, previousTerms[0]) : null;
  const academicAlert = currentLowGradeCount >= COUNCIL_CRITERIA.lowGradeSubjectAlertCount;
  const lowAttendance = typeof input.attendanceRate === "number" && input.attendanceRate < COUNCIL_CRITERIA.lowAttendanceThreshold;
  const evolution = previousLowGradeCount === null
    ? "unavailable"
    : currentLowGradeCount > previousLowGradeCount
      ? "worsened"
      : currentLowGradeCount < previousLowGradeCount
        ? "improved"
        : "stable";
  const reasons: string[] = [];
  const lowGradeReason = (count: number) => `${count} ${count === 1 ? "disciplina" : "disciplinas"} com nota abaixo de 6,0`;
  if (academicAlert) reasons.push(lowGradeReason(currentLowGradeCount));
  if (lowAttendance) reasons.push(`Frequência anual de ${input.attendanceRate!.toLocaleString("pt-BR")}% (abaixo de ${COUNCIL_CRITERIA.lowAttendanceThreshold}%)`);
  if (evolution === "worsened") {
    const previousComparison = `${previousLowGradeCount === 1 ? "era" : "eram"} ${lowGradeReason(previousLowGradeCount!)} no bimestre anterior disponível`;
    reasons.push(academicAlert ? `Piora: ${previousComparison}` : `Piora: ${lowGradeReason(currentLowGradeCount)}; ${previousComparison}`);
  }
  return { currentLowGradeCount, previousLowGradeCount, academicAlert, lowAttendance, evolution, reasons };
}

export function compareStudentPriority(
  a: { name: string; alerts: StudentAlerts },
  b: { name: string; alerts: StudentAlerts },
): number {
  const bothA = Number(a.alerts.academicAlert && a.alerts.lowAttendance);
  const bothB = Number(b.alerts.academicAlert && b.alerts.lowAttendance);
  if (bothA !== bothB) return bothB - bothA;
  const typesA = Number(a.alerts.academicAlert) + Number(a.alerts.lowAttendance) + Number(a.alerts.evolution === "worsened");
  const typesB = Number(b.alerts.academicAlert) + Number(b.alerts.lowAttendance) + Number(b.alerts.evolution === "worsened");
  if (typesA !== typesB) return typesB - typesA;
  if (a.alerts.currentLowGradeCount !== b.alerts.currentLowGradeCount) return b.alerts.currentLowGradeCount - a.alerts.currentLowGradeCount;
  return a.name.localeCompare(b.name, "pt-BR");
}

export function compareStudentReportOrder(
  a: { name: string; reportPosition: number | null },
  b: { name: string; reportPosition: number | null },
): number {
  if (a.reportPosition !== null && b.reportPosition !== null && a.reportPosition !== b.reportPosition) return a.reportPosition - b.reportPosition;
  if (a.reportPosition !== null) return -1;
  if (b.reportPosition !== null) return 1;
  return a.name.localeCompare(b.name, "pt-BR");
}
