export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
}

export interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  organizationId: number;
  organizationName: string;
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
  endOfService?: boolean;
}

export interface ISalary {
  id?: number;
  employeeId: number;
  month: string;
  additions: ISalaryAddition[];
  deductions: ISalaryAddition[];
  basicSalary: number;
  salaryAllowances: ISalaryAddition[];
  paid: boolean;
}

export interface ISalaryAddition {
  type: string;
  amount: number;
}

export interface IEmployeeSalaries extends IEmployee {
  salaries: ISalary[];
}

export interface ISalaryEmployee extends ISalary {
  employee: IEmployee;
  endOfService?: boolean;
}

export interface IPayment {
  id?: number;
  salaryId: number;
  organizationId: number;
  total: number;
  ref: string;
}
