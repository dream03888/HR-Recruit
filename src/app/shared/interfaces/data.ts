export interface Applicants {

        id: number;
      apply_date: string;
      position_applied: string;
      department: string;
      company: string;
      title: string;
      first_name: string;
      last_name : string;
      phone: string;
      national_id: string;
      interview_status: string;
      employee_code: string;
      expected_salary: number;
      education_level: string;
      birth_date: string;
      age: number;
      previous_company: string;
      language_skills: string;
      applied_before: boolean; 
      blacklist: boolean;
      distance_km: number;
      start_work_within_6_days: boolean;

      updated_at: string;
        selected?: boolean;
       interview_date : string,
      interview_time: string,
      location: string,
      created_at: string,
      note: string
      isDuplicate?: boolean;
}
