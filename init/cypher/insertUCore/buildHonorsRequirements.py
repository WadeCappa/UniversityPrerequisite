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


groups = {
    "HONORS_SOCIAL_SCIENCE": 1,
    "HONORS_LANGUAGE": 1,
    "HONORS_WAYS_OF_KNOWING": 1,
    "HONORS_SCIENCE": 1,
    "HONORS_THESIS": 1
}                

courses = """MATH,105,Exploring Mathematics,3
MATH,140,Calculus for Life Scientists,4
MATH,171,Calculus I,4
MATH,202,Calculus for Business and Economics,3
MATH,252,Fundamentals of Elementary Mathematics II,3
MATH,101,Intermediate Algebra,3
MATH,103,Algebra Methods and Introduction to Functions,3
MATH,106,College Algebra,3
MATH,251,Fundamentals of Elementary Mathematics I,3
MATH,108,Trigonometry,2
PHIL,201,Introduction to Formal Logic,3
PSYCH,311,Statistics for Psychology,4
ANTH,260,Introduction to Biological Anthropology (L),4,HONORS_SCIENCE
BIOLOGY ,102,General Biology (L),4,HONORS_SCIENCE
BIOLOGY,106,Introductory Biology: Organismal Biology (L),4,HONORS_SCIENCE
BIOLOGY,107,Introductory Biology: Cell Biology and Genetics (L),4,HONORS_SCIENCE
BIOLOGY,120,Introductory Botany (L),4,HONORS_SCIENCE
BIOLOGY,298,Honors Biology for Non-Science Majors (L),4,HONORS_SCIENCE
HORT,150,Science and Art of Growing Plants (L),4,HONORS_SCIENCE
MBIOS,101,Introductory Microbiology (L),4,HONORS_SCIENCE
SCIENCE,102,Integrated Science: Dynamic Systems of the Natural World (L),4,HONORS_SCIENCE
SOE,110,The Environment Human Life and Sustainability (L),4,HONORS_SCIENCE
PHYSICS,101,General Physics,4,HONORS_SCIENCE
PHYSICS,102,General Physics,4,HONORS_SCIENCE
PHYSICS,201,Physics for Scientists and Engineers I,4,HONORS_SCIENCE
PHYSICS,202,Physics for Scientists and Engineers II,4,HONORS_SCIENCE
FRENCH,361,Advanced French for the Professions,3
FRENCH,306,Intermediate Reading and Translation,3
FRENCH,307,Intermediate Speaking and Listening,3
FRENCH,308,Intermediate Grammar and Writing,3
FRENCH,204,Fourth Semester,4,HONORS_LANGUAGE
FRENCH,203,Third Semester,4
FRENCH,102,Second Semester,4
FRENCH,101,First Semester,4
GERMAN,307,Intermediate Speaking and Listening,3
GERMAN,308,Intermediate Grammar and Writing,3
GERMAN,361,German for the Professions,3
GERMAN,204,Fourth Semester,4,HONORS_LANGUAGE
GERMAN,203,Third Semester,4
GERMAN,102,Second Semester,4
GERMAN,101,First Semester,4
ENGLISH,298,Writing and Research Honors,3	
Honors,270,Principles and Research Methods in Social Science,3,HONORS_SOCIAL_SCIENCE
Honors,280,Contextual Understanding in the Arts and Humanities,3
Honors,290,Science as a Way of Knowing,3,HONORS_WAYS_OF_KNOWING
MATH,182,Honors Calculus II,4,HONORS_WAYS_OF_KNOWING
MATH,283,Honors Calculus III,2,HONORS_WAYS_OF_KNOWING
PHYSICS,205,Physics for Scientists and Engineers I - Honors,5,HONORS_WAYS_OF_KNOWING
PHYSICS,206,Physics for Scientists and Engineers II - Honors,5,HONORS_WAYS_OF_KNOWING
CHEM,116,Chemical Principles Honors II,4,HONORS_WAYS_OF_KNOWING
Honors,370,Case Study: Global Issues in Social Science,3
Honors,380,Case Study: Global Issues in the Arts and Humanities,3
Honors,390,Case Study: Global Issues in the Sciences,3
ECONS,198,Economics Honors,3,HONORS_SOCIAL_SCIENCE
MATH,315,Differential Equations,3
MATH,220,Introductory Linear Algebra,2
HONORS,450,Honors Thesis,1,HONORS_THESIS"""

mathReq = "105, 140, 171, 202, or 251 and 252; or Phil 201; or Psych 311"
sceinceReq = "Satisfied by a four-credit science course with a lab."

prereqs = {
    ("MATH", 105): [[("MATH", 101)], [("MATH", 103)], [("MATH", 251)], [("STAT", 212)]],
    ("MATH", 140): [[("MATH", 106), ("MATH", 108)]],
    ("MATH", 171): [[("MATH", 106), ("MATH", 108)]],
    ("MATH", 202): [[("MATH", 201)], [("MATH", 106)]],
    ("MATH", 252): [[("MATH", 251)]],
    ("PHIL", 201): [[("MATH", 101)], [("MATH", 103)]],
    ("PSYCH", 311): [[("ENGR", 107)], [("MATH", 103)], [("MGTOP", 215)], [("STAT", 212)]],
    ("STAT", 212): [[("MATH", 101)], [("MATH", 103)], [("MATH", 106)], [("MATH", 171)], [("MATH", 201)], [("MATH", 202)], [("MATH", 105)], [("MATH", 251)], [("MATH", 108)], [("MATH", 140)]],
    ("FRENCH", 361): [[("FRENCH", 306)], [("FRENCH", 307)], [("FRENCH", 308)]],
    ("FRENCH", 306): [[("FRENCH", 204)]],
    ("FRENCH", 307): [[("FRENCH", 204)]],
    ("FRENCH", 308): [[("FRENCH", 204)]],
    ("FRENCH", 204): [[("FRENCH", 203)]],
    ("FRENCH", 203): [[("FRENCH", 102)]],
    ("FRENCH", 102): [[("FRENCH", 101)]],
    ("GERMAN", 361): [[("GERMAN", 307)], [("GERMAN", 308)]],
    ("GERMAN", 307): [[("GERMAN", 204)]],
    ("GERMAN", 308): [[("GERMAN", 204)]],
    ("GERMAN", 204): [[("GERMAN", 203)]],
    ("GERMAN", 203): [[("GERMAN", 102)]],
    ("GERMAN", 102): [[("GERMAN", 101)]],
    ("PHYSICS",101): [[("MATH", 171)], [("MATH", 202)], [("MATH", 140)], [("MATH", 108)]],
    ("PHYSICS",102): [[("PHYSICS",101)]],
    ("PHYSICS",201): [[("MATH", 171)]],
    ("PHYSICS",202): [[("PHYSICS",201)]],
    ("MATH",182): [[("MATH",171)]],
    ("MATH",283): [[("MATH",182)]],
    ("PHYSICS", 205): [[("MATH",171)], [("MATH",182)], [("MATH", 273)], [("MATH", 315)]],
    ("MATH", 220): [[("MATH",171)]],
    ("MATH", 315): [[("MATH", 273), ("MATH", 220)], [("MATH",283), ("MATH", 220)]],
    ("PHYSICS", 206): [[("PHYSICS",205)], [("PHYSICS",201)]],
}

catalog = CourseCatalog(courses, prereqs)