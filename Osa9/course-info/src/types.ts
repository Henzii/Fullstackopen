export interface CoursePartBase {
    name: string,
    exerciseCount: number,
    type: string
}

interface CourseNormalPart extends CourseWithDesc {
    type: 'normal',
}

interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject',
    groupProjectCount: number,
}

interface CourseSubmissionPart extends CourseWithDesc {
    type: 'submission',
    exerciseSubmissionLink: string,
}
interface CourseSpecialPart extends CourseWithDesc {
    type: 'special',
    requirements: string[]
}
interface CourseWithDesc extends CoursePartBase {
    description: string,
    type: string
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart