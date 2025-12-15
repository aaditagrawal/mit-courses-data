
export interface CreditStructure {
  l: number;
  t: number;
  p: number;
  c: number;
  [key: string]: number; // Allow flexible indexing if needed
}

export interface Course {
  sem: number | null;
  code: string;
  title: string;
  credits: CreditStructure;
  tags: string[];
  syllabus: string[];
  references: string[];
  flags: string[];
  [key: string]: any;
}

export interface Department {
  name: string;
  courses: Course[];
}
