export class CreateVacancyDto {
  content: string;
  title: string;
  conditions: string;
  requirements: string;
  duties: string;
  type_work: "Удаленный" | "В компании" | null;
  experience: string;
  chart_work: string;
  income_min: number;
  income_max: number;
}