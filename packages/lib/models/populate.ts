import { db } from "./db";

export const populate = async () => {
  const userId = await db.Users.add({
    name: "Elmehdi",
    email: "elmehdi@example.com",
    password: "Admin@123",
  });
  const organizationId = await db.Organizations.add({
    userId,
    name: "Financial institution",
  });
  await db.Employees.bulkAdd([
    {
      organizationId,
      name: "Tariq Abbas",
      basicSalary: 20000,
      salaryAllowances: [
        {
          type: "Health Allowance",
          amount: 1000,
        },
        {
          type: "Transport Allowance",
          amount: 500,
        },
        {
          type: "Food Allowance",
          amount: 2000,
        },
      ],
      joiningDate: "2024-05-01T23:00:00.000Z",
    },
    {
      organizationId,
      name: "Ghayda Younis",
      basicSalary: 25000,
      salaryAllowances: [
        {
          type: "Health Allowance",
          amount: 1000,
        },
        {
          type: "Transport Allowance",
          amount: 500,
        },
        {
          type: "Food Allowance",
          amount: 2000,
        },
      ],
      joiningDate: "2024-02-02T23:00:00.000Z",
    },
    {
      organizationId,
      name: "Zareb Basher",
      basicSalary: 30000,
      salaryAllowances: [
        {
          type: "Health Allowance",
          amount: 1000,
        },
        {
          type: "Food Allowance",
          amount: 2000,
        },
        {
          type: "Housing Allowance",
          amount: 4000,
        },
      ],
      joiningDate: "2023-11-03T23:00:00.000Z",
    },
    {
      organizationId,
      name: "Hassan Malak",
      basicSalary: 35000,
      salaryAllowances: [
        {
          type: "Health Allowance",
          amount: 1000,
        },
        {
          type: "Transport Allowance",
          amount: 500,
        },
        {
          type: "Food Allowance",
          amount: 2000,
        },
        {
          type: "Clothing Allowance",
          amount: 2000,
        },
        {
          type: "Travel Allowance",
          amount: 5000,
        },
      ],
      joiningDate: "2023-10-04T23:00:00.000Z",
    },
  ]);
};
