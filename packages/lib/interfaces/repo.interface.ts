export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface IOrganization {
  id?: number;
  userId: number;
  name: string;
}

export interface IEmployee {
  id?: number;
  organizationId: number;
  name: string;
  joiningDate: string;
  basicSalary: number;
  salaryAllowances: ISalaryAddition[];
}

export interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  organizationId: number;
  organizationName: string;
}

export interface ISalary {
  id?: number;
  employeeId: number;
  month: string; // create
  year: string; // create
  additions: ISalaryAddition[]; // when creating the salary or payslip
  deductions: ISalaryAddition[]; // check atg responses payload
  basicSalary: number; // at that time filled after confirm from employee record
  salaryAllowances: number; // at that time filled after confirm from employee record
  status: "PENDING" | "PAID"; // butoon action process if pending
}

export interface ISalaryAddition {
  type: string;
  amount: number;
}

// got created when pay confirm PAID
export interface IPayment {
  id?: number;
  salaryId: number;
  ref: string; // random fill
}
