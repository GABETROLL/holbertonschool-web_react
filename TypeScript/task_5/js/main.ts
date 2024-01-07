export interface MajorCredits {
  _majorCreditBrand: void;
  credits: number;
}

export interface MinorCredits {
  _minorCreditBrand: void;
  credits: number;
}

export function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
  return { credits: subject1.credits + subject2.credits } as MajorCredits;
}

export function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
  return { credits: subject1.credits + subject2.credits } as MinorCredits;
}

/*
const majorCredits: MajorCredits = { credits: 7 } as MajorCredits;
const minorCredits: MinorCredits = { credits: 8 } as MinorCredits;

console.log(majorCredits, minorCredits);

console.log(sumMajorCredits(majorCredits, majorCredits));
console.log(sumMinorCredits(minorCredits, minorCredits));

// Argument of type 'MinorCredits' is not assignable to parameter of type 'MajorCredits'.
// Property '_majorCreditBrand' is missing in type 'MinorCredits' but required in type 'MajorCredits'.
console.log(sumMajorCredits(majorCredits, minorCredits));

// Argument of type 'MajorCredits' is not assignable to parameter of type 'MinorCredits'.
// Property '_minorCreditBrand' is missing in type 'MajorCredits' but required in type 'MinorCredits'.
console.log(sumMinorCredits(majorCredits, minorCredits));
*/
