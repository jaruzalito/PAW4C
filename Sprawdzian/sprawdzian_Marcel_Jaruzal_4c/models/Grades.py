from .Student import Student
from .Subject import Subject
class Grades:
    def __init__(self,student: Student,subject: Subject):
        self.grades = []
        self.student = student
        self.subject = subject

    def add_grade(self, grade: int):
        if grade>6 or grade<1:
            raise ValueError("Grade must be between 1 and 6")
        else:
            self.grades.append(grade)

    def get_grades(self):
        return self.grades
    def get_average(self)->float:
        average = sum(self.grades)/len(self.grades)
        return average


