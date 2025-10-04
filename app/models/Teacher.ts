export interface Teacher {
  id: string;
  name: string;
  degree?: string;
  university?: string;
  quote?: string;
  image?: string;
}

export interface MaterialByClass {
  className: string;
  materials: string[];
}

export interface TeacherCategory {
  id: string;
  title: string;
  pagination: string;
  description: string;
  classes: string[];
  materialsByClass: MaterialByClass[];
  teachingFocus: string;
  teachers: Teacher[];
}
