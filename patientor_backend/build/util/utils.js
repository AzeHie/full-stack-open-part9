"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// type guard, returns type predicate:
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (param) => {
    if (!param || !isString(param)) {
        throw new Error('Incorrect or missing data');
    }
    return param;
};
// using typescrit enum
const isGender = (param) => {
    return Object.values(types_1.Gender)
        .map((v) => v.toString())
        .includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const isDateOfBirth = (date) => {
    return Boolean(Date.parse(date));
};
const parseDateOfBirth = (date) => {
    if (!date || !isString(date) || !isDateOfBirth(date)) {
        throw new Error('Incorrect or missing date of birth: ' + date);
    }
    return date;
};
const toNewPatientEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object) {
        const newEntry = {
            name: parseString(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };
        return newEntry;
    }
    throw new Error('Incorrect data: some fields are missing or invalid!');
};
exports.default = toNewPatientEntry;
