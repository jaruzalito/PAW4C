class Teacher:
    def __init__(self, _id: int,name: str,surname: str):
        self._id = _id
        self.name = name
        self.surname = surname

    def __str__(self):
        return f"{self.name} {self.surname}"
