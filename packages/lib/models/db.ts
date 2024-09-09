import Dexie, { Table } from "dexie";
import { populate } from "./populate";
import {
  IEmployee,
  IOrganization,
  IPayment,
  ISalary,
  IUser,
} from "../interfaces/repo.interface";
import { removeUser } from "../helpers/storage";

export class PayrollPortalDB extends Dexie {
  Users!: Table<IUser, number>;
  Organizations!: Table<IOrganization, number>;
  Employees!: Table<IEmployee, number>;
  Salaries!: Table<ISalary, number>;
  Payments!: Table<IPayment, number>;

  constructor() {
    super("PayrollPortalDB");
    this.version(1).stores({
      Users: "++id, email, password",
      Organizations: "++id, userId",
      Employees: "++id, organizationId",
      Salaries: "++id, employeeId",
      Payments: "++id, salaryId, organizationId",
    });
  }

  addEmployee(employee: IEmployee) {
    return this.transaction("rw", this.Employees, () => {
      this.Employees.add(employee);
    });
  }

  updateEmployee(employee: IEmployee) {
    return this.transaction("rw", this.Employees, () => {
      this.Employees.update(employee, { ...employee });
    });
  }

  deleteEmployee(employeeId: number) {
    return this.transaction("rw", this.Salaries, this.Employees, () => {
      this.Salaries.where({ employeeId }).delete();
      this.Employees.delete(employeeId);
    });
  }

  addSalary(salary: ISalary) {
    return this.transaction("rw", this.Salaries, () => {
      this.Salaries.add(salary);
    });
  }

  updateSalary(salary: ISalary) {
    return this.transaction("rw", this.Salaries, () => {
      this.Salaries.update(salary, { ...salary });
    });
  }

  deleteSalary(salaryId: number) {
    return this.transaction("rw", this.Salaries, () => {
      this.Salaries.delete(salaryId);
    });
  }

  addPayment(payment: IPayment) {
    return this.transaction("rw", this.Payments, () => {
      this.Payments.add(payment);
    });
  }
}

export const db = new PayrollPortalDB();

db.on("populate", populate);

export const resetDatabase = async () => {
  await db.Users.clear();
  await db.Organizations.clear();
  await db.Employees.clear();
  await db.Salaries.clear();
  await db.Payments.clear();
  await populate();
  removeUser();
  location.reload();
};
