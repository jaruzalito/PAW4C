from datetime import date


class Student:
    def __init__(self, _id: int, first_name: str, last_name: str,birth_date: date):
        self._id = _id
        self.first_name = first_name
        self.last_name = last_name
        self.birth_date = birth_date

    @property
    def age(self) -> int:
        today = date.today()
        age = today.year - self.birth_date.year
        if(today.month, today.day) <(self.birth_date.month, self.birth_date.day):
            age -=1
        return age

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.age})"

