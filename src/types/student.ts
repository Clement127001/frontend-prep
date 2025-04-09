export type StudentListSearchQueryType = {
  searchText: string;
  refetchStudentList: boolean;
  pageNumber: number;
};

export type StudentType = {
  studentId: string;
  firstname: string;
  lastname: string;
  courseType: CourseTypeEnum;
  dateOfJoin: string;
  imageUrl: string;
};

export type CreateStudentType = Omit<StudentType, "studentId">;

export enum CourseTypeEnum {
  UG = "UG",
  PG = "PG",
}
