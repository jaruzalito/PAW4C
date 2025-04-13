from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
import year_grade
import datetime
import json
from typing import List, Dict, Any
from collections import defaultdict

teachers: list[Teacher] = []
subjects: list[Subject]=[]
students: list[Student] = []
grades: list[Grades] = []

with open("teachers.txt","r") as file:
    for line in file:
        pieces = line.strip().split()
        if len(pieces)==3:
            _id, first_name, last_name = pieces
            new = Teacher(int(_id), first_name, last_name)
            teachers.append(new)

with open("subjects.txt","r") as file:
    for line in file:
        pieces = line.strip().split()
        if len(pieces)>=3:
            _id, name, teacher_id = pieces[0],pieces[1],pieces[2]
            teacher = None
            for t in teachers:
                if int(teacher_id) == t._id:
                    teacher = t
                    break
            if teacher:
                new_subject = Subject(_id,name,teacher)
                subjects.append(new_subject)

with open("students.txt","r") as file:
    for line in file:
        pieces = line.strip().split()
        if(len(pieces)>=4):
            _id, first_name, last_name, birthday= pieces[0],pieces[1],pieces[2], pieces[3]
            birthdate = datetime.datetime.strptime(birthday,'%Y-%m-%d').date()
            new = Student(int(_id),first_name, last_name,birthdate)
            students.append(new)

with open("grades.txt", "r") as file:
    for line in file:
        line = line.strip()
        parts = line.split()
        if len(parts) < 3:
            continue

        student_id = parts[0]
        subject_id = parts[1]
        grades_str = parts[2]

        student = None
        for s in students:
            if str(s._id) == student_id:
                student = s
                break

        subject = None
        for sb in subjects:
            if str(sb._id) == subject_id:
                subject = sb
                break
        if student is not None and subject is not None:
            objGrade = Grades(student, subject)

            # Dodajemy oceny
            for g in grades_str.split(','):
                try:
                    grade = int(g.strip())
                    if 1 <= grade <= 6:
                        objGrade.add_grade(grade)
                except (ValueError, AttributeError):
                    continue
            if objGrade.grades:
                grades.append(objGrade)

print("=" * 50)
print()

for st in students:
    print(st)
    for subject in subjects:
        print(f"\t{subject.name}")
        for grade in grades:
            if(st._id == grade.student._id and subject._id == grade.subject._id):
                grades_string = str(grade.get_grades())[1:-1]
                print(f"\t\tOceny: ",grades_string)
                avg = float(grade.get_average())
                print(f"\t\tŚrednia: {round(avg,2)}")
                print(f"\t\tOcena Koncowa: {year_grade.year_grade(avg)}")
    print("")
subjects_data = []

for subject in subjects:
    subject_dict = {
        subject.name: {
            "Nauczyciel": f"{subject.teacher.name} {subject.teacher.surname}",
            "Oceny": [],
            "Srednia": 0.0
        }
    }

    all_grades = []
    for grade in grades:
        if grade.subject._id == subject._id:
            all_grades.extend(grade.get_grades())

    if all_grades:
        avg = sum(all_grades) / len(all_grades)
        subject_dict[subject.name]["Oceny"] = all_grades
        subject_dict[subject.name]["Srednia"] = round(avg, 2)

    subjects_data.append(subject_dict)

json_data = {
    "__copyright__": "Zespół Szkół Komunikacji",
    "__author__": "Marcel Jaruzal 4C",
    "data": subjects_data
}

with open('subjects.json', 'w') as f:
    json.dump(subjects_data, f, indent=4, ensure_ascii=False)

students_data: List[Dict[str, Any]] = []
for student in students:
    student_entry = {f"{student.first_name} {student.last_name} ({student.age})": {}}

    for subject in subjects:
        for grade in grades:
            if grade.student._id == student._id and grade.subject._id == subject._id:
                grades_list = grade.get_grades()
                avg = round(grade.get_average(), 2)

                student_entry[f"{student.first_name} {student.last_name} ({student.age})"][subject.name] = {
                    "Oceny": ", ".join(map(str, grades_list)),
                    "Srednia": avg,
                    "Ocena roczna": year_grade.year_grade(avg)
                }

    students_data.append(student_entry)

students_json = {
    "__copyright__": "Zespół Szkół Komunikacji",
    "__author__": "Marcel Jaruzal 4c",
    "data": students_data
}

with open('students.json', 'w') as f:
    json.dump(students_json, f, indent=4, ensure_ascii=False)