interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartsWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartsWithDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartsWithDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface CourseParts extends CoursePartsWithDescription {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CourseParts;

export interface ContentProps {
  courseParts: CoursePart[];
}
