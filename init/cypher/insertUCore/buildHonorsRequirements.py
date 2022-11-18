class CourseCatalog:
    class Course:
        def __init__(self, subject, number, title, weight, category):
            self.subject = subject 
            self.number = number 
            self.title = title
            self.weight = weight
            self.category = category

        def getKey(self):
            return (self.subject, self.number)

    def __init__(self, courses, prereqs):
        self.courseMap = dict()
        self.prereqMap = dict()
        for line in courses.splitlines():
            print(line)
            newCourse = self.buildCourse(line)
            self.courseMap[newCourse.getKey()] = newCourse

    def buildCourse(self, line: str) -> Course:
        data = line.split(',')
        if (len(data) < 5):
            data.append(None)
        return self.Course(data[0], data[1], data[2], data[3], data[4])
                

courses = """
HISTORY,105,The Roots of Contemporary Issues,3,ROOT
History,305,Roots of Contemporary Issues (for transfer students),3,ROOT
CPTS,111,Introduction to Computer Programming,3,QUAN
ECONS,335,,Business Finance Economics,3,QUAN
ENGR,107,Introductory Mathematics for Engineering Applications,4,QUAN
FIN,223,Personal Finance,3,QUAN
MATH,105,Exploring Mathematics,3,QUAN
MATH,140,Calculus for Life Scientists,4,QUAN
MATH,171,Calculus I,4,QUAN
MATH,202,Calculus for Business and Economics,3,QUAN
MATH,252,Fundamentals of Elementary Mathematics II,3,QUAN
PHIL,201,Introduction to Formal Logic,3,QUAN
PSYCH,311,Statistics for Psychology,4,QUAN
STAT,212,Introduction to Statistical Methods,4,QUAN
MATH,101,Intermediate Algebra,3
MATH,103,Algebra Methods and Introduction to Functions,3
MATH,106,College Algebra,3
MATH,251,Fundamentals of Elementary Mathematics I,3
MATH,108,Trigonometry,2
MGTOP,215,Business Statistics,4
COM,102,Public Speaking in the Digital Age,3,COMM
COM,210,Multimedia Content Creation,3,COMM
COM,400,Communicating Science and Technology,3,COMM
DTC,202,Internet Revolutions,3,COMM
ENGLISH,106,Communicating in Academic Contexts,3,COMM
FRENCH,361,Advanced French for the Professions,3,COMM
FRENCH,306,Intermediate Reading and Translation,3
FRENCH,307,Intermediate Speaking and Listening,3
FRENCH,308,Intermediate Grammar and Writing,3
FRENCH,204,Fourth Semester,4
FRENCH,203,Third Semester,4
FRENCH,102,Second Semester,4
FRENCH,101,First Semester,4
GERMAN,307,Intermediate Speaking and Listening,3,COMM
GERMAN,308,Intermediate Grammar and Writing,3
GERMAN,361,German for the Professions,3,COMM
GERMAN,204,Fourth Semester,4
GERMAN,203,Third Semester,4
GERMAN,102,Second Semester,4
GERMAN,101,First Semester,4
H_D,205,Developing Effective Communication and Life Skills,3,COMM
MKTG,279,Professional Persuasive Communications,3,COMM
NEUROSCI,201,Introduction to Communication in the Molecular Life Sciences,3,COMM
MBIOS,201,Introduction to Communication in the Molecular Life Sciences,3,COMM
PHARMEDS,315,Biomedical Literature: Communicating Science,3,COMM
SOC,103,Social Psychology of Communication,3,COMM
"""

mathReq = "105, 140, 171, 202, or 251 and 252; or Phil 201; or Psych 311"
sceinceReq = "Satisfied by a four-credit science course with a lab."

prereqs = {

}

catalog = CourseCatalog(courses, prereqs)