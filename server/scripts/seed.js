import dotenv from 'dotenv';
import path from 'path';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { Organization } from '../models/Organization.model.js';
import { Department } from '../models/Department.model.js';
import { HumanResources } from '../models/HR.model.js';
import { Employee } from '../models/Employee.model.js';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seed = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not defined. Check your server/.env file.');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding.');

    const shouldReset = process.argv.includes('--reset');

    if (shouldReset) {
      await Promise.all([
        Organization.deleteMany({}),
        Department.deleteMany({}),
        HumanResources.deleteMany({}),
        Employee.deleteMany({})
      ]);
      console.log('Previous seeded data removed.');
    }

    const orgName = 'Northwind Labs';
    const orgDescription = 'Sample organization used for development and demo data.';
    const orgUrl = 'https://northwind-labs.example';
    const orgMail = 'hello@northwind-labs.example';

    const organization = await Organization.findOneAndUpdate(
      { name: orgName },
      {
        name: orgName,
        description: orgDescription,
        OrganizationURL: orgUrl,
        OrganizationMail: orgMail
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const departmentSeeds = [
      { name: 'Engineering', description: 'Software engineering and platform teams.' },
      { name: 'Human Resources', description: 'People operations and recruiting.' },
      { name: 'Finance', description: 'Budgeting and payroll operations.' }
    ];

    const createdDepartments = [];

    for (const dept of departmentSeeds) {
      const department = await Department.findOneAndUpdate(
        { name: dept.name },
        {
          name: dept.name,
          description: dept.description,
          organizationID: organization._id
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      createdDepartments.push(department);
    }

    const hashedPassword = await bcrypt.hash('Password@123', 10);

    const hrSeeds = [
      {
        firstname: 'Aisha',
        lastname: 'Patel',
        email: 'aisha.patel@northwind-labs.example',
        contactnumber: '+1-555-0101',
        department: createdDepartments[0]._id,
        role: 'HR-Admin'
      },
      {
        firstname: 'Daniel',
        lastname: 'Kim',
        email: 'daniel.kim@northwind-labs.example',
        contactnumber: '+1-555-0102',
        department: createdDepartments[1]._id,
        role: 'HR-Admin'
      }
    ];

    const createdHRs = [];
    for (const hr of hrSeeds) {
      const humanResource = await HumanResources.findOneAndUpdate(
        { email: hr.email },
        {
          firstname: hr.firstname,
          lastname: hr.lastname,
          email: hr.email,
          password: hashedPassword,
          contactnumber: hr.contactnumber,
          role: hr.role,
          department: hr.department,
          organizationID: organization._id,
          isverified: true
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      createdHRs.push(humanResource);
    }

    const employeeSeeds = [
      {
        firstname: 'Maya',
        lastname: 'Rodriguez',
        email: 'maya.rodriguez@northwind-labs.example',
        contactnumber: '+1-555-0201',
        department: createdDepartments[0]._id,
        role: 'Employee'
      },
      {
        firstname: 'Leo',
        lastname: 'Chen',
        email: 'leo.chen@northwind-labs.example',
        contactnumber: '+1-555-0202',
        department: createdDepartments[0]._id,
        role: 'Employee'
      },
      {
        firstname: 'Sara',
        lastname: 'Nguyen',
        email: 'sara.nguyen@northwind-labs.example',
        contactnumber: '+1-555-0203',
        department: createdDepartments[2]._id,
        role: 'Employee'
      }
    ];

    const createdEmployees = [];
    for (const employee of employeeSeeds) {
      const user = await Employee.findOneAndUpdate(
        { email: employee.email },
        {
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          password: hashedPassword,
          contactnumber: employee.contactnumber,
          role: employee.role,
          department: employee.department,
          organizationID: organization._id,
          isverified: true
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      createdEmployees.push(user);
    }

    await Promise.all([
      Department.updateOne(
        { _id: createdDepartments[0]._id },
        {
          $addToSet: {
            employees: { $each: createdEmployees.slice(0, 2).map((item) => item._id) },
            HumanResources: { $each: [createdHRs[0]._id] }
          }
        }
      ),
      Department.updateOne(
        { _id: createdDepartments[1]._id },
        {
          $addToSet: {
            HumanResources: { $each: [createdHRs[1]._id] }
          }
        }
      ),
      Department.updateOne(
        { _id: createdDepartments[2]._id },
        {
          $addToSet: {
            employees: { $each: [createdEmployees[2]._id] }
          }
        }
      ),
      Organization.updateOne(
        { _id: organization._id },
        {
          $addToSet: {
            employees: { $each: createdEmployees.map((item) => item._id) },
            HRs: { $each: createdHRs.map((item) => item._id) }
          }
        }
      )
    ]);

    console.log('Seed completed successfully.');
    console.log(JSON.stringify({
      organization: organization.name,
      departments: createdDepartments.map((item) => item.name),
      hrCount: createdHRs.length,
      employeeCount: createdEmployees.length
    }, null, 2));
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
