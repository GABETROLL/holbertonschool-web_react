interface DirectorInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workDirectorTasks(): string;
}

interface TeacherInterface {
  workFromHome(): string;
  getCoffeeBreak(): string;
  workTeacherTasks(): string;
}

export class Director implements DirectorInterface {
  workFromHome(): string {
    return 'Working from home';
  }

  getCoffeeBreak(): string {
    return 'Getting a coffee break';
  }

  workDirectorTasks(): string {
    return 'Getting to director tasks';
  }
}

export class Teacher implements TeacherInterface {
  workFromHome(): string {
    return 'Cannot work from home';
  }

  getCoffeeBreak(): string {
    return 'Cannot have a break';
  }

  workTeacherTasks(): string {
    return 'Getting to work';
  }
}

export function createEmployee(salary: number | string): DirectorInterface | TeacherInterface {
  let parsedSalary: number;

  if (typeof salary === 'string') {
    parsedSalary = parseInt(salary);
  } else {
    parsedSalary = salary;
  }

  if (parsedSalary < 500) {
    return new Teacher();
  }

  return new Director();
}

export function isDirector(employee: DirectorInterface | TeacherInterface): employee is DirectorInterface {
  return 'workDirectorTasks' in employee;
}

export function executeWork(employee: DirectorInterface | TeacherInterface): string {
  if (isDirector(employee)) {
    return employee.workDirectorTasks();
  } else {
    return employee.workTeacherTasks();
  }
}

export type Subjects = 'Math' | 'History';

export function teachClass(todayClass: Subjects): string {
  if (todayClass === 'Math') {
    return 'Teaching Math'
  } else if (todayClass === 'History') {
    return 'Teaching History'
  }
}

const ab = createEmployee(200);
const cd = createEmployee(1000);
const ef = createEmployee('500');
const teacher = createEmployee('-20');

// Teacher
console.log(ab);
// Director
console.log(cd);
// Director
console.log(ef);
// Teacher
console.log(teacher);

// Getting to work
console.log(executeWork(ab));
// Getting to director tasks
console.log(executeWork(cd));
// Getting to director tasks
console.log(executeWork(ef));
// Getting to work
console.log(executeWork(teacher));

// Teaching Math
console.log(teachClass('Math'));
// Teaching History
console.log(teachClass('History'));
/*
TS error:
teachClass('Science');
*/
