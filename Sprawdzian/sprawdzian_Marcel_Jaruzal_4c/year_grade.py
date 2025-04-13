import models.Grades

def year_grade(average: float):
    if(average<=6 and average>=5.5):
        return 6
    if(average<5.5 and average>=4.7):
        return 5
    if(average<4.7 and average>=3.7):
        return 4
    if (average < 3.7 and average >= 2.7):
        return 3
    if (average < 2.7 and average >= 1.85):
        return 2
    else:
        return 1
