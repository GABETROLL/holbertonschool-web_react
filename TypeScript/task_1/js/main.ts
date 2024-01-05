export interface Teacher {
  readonly firstName: string;
  readonly lastName: string;
  fullTimeEmployee: boolean;
  location: string;
  yearsOfExperience?: number;
  [propName: string]: any;
}

export interface Directors extends Teacher {
  numberOfReports: number;
}

export interface printTeacherFunction {
  (firstName: string, lastName: string): string;
}
export const printTeacher: printTeacherFunction = function (firstName: string, lastName: string): string {
  return `${firstName[0]}. ${lastName}`;
};

export interface StudentClassInterface {
  displayName(): string;
  workOnHomework(): string;
}
export interface StudentConstructor {
  new(firstName: string, lastName: string): StudentClassInterface;
}
export const StudentClass: StudentConstructor = class StudentClass implements StudentClassInterface {
  firstName: string;
  lastName: string;

  constructor(firstName: string, lastName: string) {
    this.firstName = firstName;
    this.lastName = lastName
  }

  workOnHomework(): string {
    return 'Currently working';
  }

  displayName(): string {
    return this.firstName;
  }
}

// TESTS

const teacher: Teacher = {
  firstName: 'A',
  lastName: 'B',
  location: 'Puerto Rico',
  fullTimeEmployee: false,
  contract: false,
};

console.log(teacher);
/*
Should print:
{
  firstName: 'A',
  lastName: 'B',
  location: 'Puerto Rico',
  fullTimeEmployee: false,
  contract: false,
}
*/

const director: Directors = {
  firstName: 'C',
  lastName: 'D',
  location: 'Puerto Rico',
  fullTimeEmployee: true,
  contract: '<contract info>',
  numberOfReports: 17,
};

console.log(director);
/*
Should print:
{
  firstName: 'C',
  lastName: 'D',
  location: 'Puerto Rico',
  fullTimeEmployee: true,
  contract: '<contract info>',
  numberOfReports: 17,
}
*/

console.log(printTeacher('Elsa', 'Frank'));
// Should print: `E. Frank`.
