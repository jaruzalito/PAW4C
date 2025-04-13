from .Teacher import Teacher as Teacher
class Subject:
    def __init__(self, _id: int,name: str,teacher: Teacher):
        self._id = _id
        self.name = name
        self.teacher = teacher

    def __str__(self):
        return f"{self.name} {self.teacher}"
