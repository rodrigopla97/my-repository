export interface JobRole {
  title: string;
  date: string;
  tasks: string[];
}

export interface JobExperience {
  company: string;
  roles: JobRole[];
}