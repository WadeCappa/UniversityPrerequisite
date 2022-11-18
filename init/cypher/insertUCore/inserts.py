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
                

courses = """HISTORY,105,The Roots of Contemporary Issues,3,ROOT
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
ENGLISH,101,College Composition,3,WRTG
ENGLISH,105,College Composition for Multilingual Writers,3,WRTG
ENGLISH,201,Writing and Research,3,WRTG
ENGLISH,301,Writing and Rhetorical Conventions,3,WRTG
ENGLISH,365,Proposal Writing,3,WRTG
ENGLISH,402,Technical and Professional Writing,3,WRTG
ENGLISH,403,Technical and Professional Writing (ESL),3,WRTG
PHIL,200,Critical Thinking and Writing,3,WRTG
BIOLOGY,102,General Biology,4
BIOLOGY,106,Introductory Biology: Organismal Biology,4
AMDT,417,Multicultural Perspectives on the Body and Dress,3,DIVR
AMDT,422,Fat Studies,3,DIVR
WGSS,422,Fat Studies,3,DIVR
ANTH,101,Introduction to Anthropology,3,DIVR
ANTH,203,Global Cultural Diversity,3,DIVR
ANTH,220,Perspectives on Race,3,DIVR
ANTH,307,Contemporary Cultures and Peoples of Africa,3,DIVR
WGSS,316,Gender in Cross Cultural Perspective,3,DIVR
ANTH,316,Gender in Cross Cultural Perspective,3,DIVR
AIS,320,Native Peoples of North America,3,DIVR
ANTH,320,Native Peoples of North America,3,DIVR
AIS,327,Contemporary Native Peoples of the Americas,3,DIVR
ANTH,327,Contemporary Native Peoples of the Americas,3,DIVR
ANTH,350,Speech Thought and Culture,3,DIVR
ASIA,301,East Meets West,1,DIVR
BIOLOGY,307,Biology of Women,3,DIVR
CES,101,Race and Racism in the United States,3,DIVR
CES,291,Anti-Semitism,3,DIVR
CES,325,Traveling Cultures: Tourism in Global Perspective,3,DIVR
COMSOC,321,Intercultural Communication,3,DIVR
CRM_J,205,Realizing Justice in a Multicultural Society,3,DIVR
DTC,206,Digital Inclusion,3,DIVR
ECONS,428,Global Capitalism Today: Perspectives and Issues,3,DIVR
ENGLISH,362,Rhetorics of Racism,3,DIVR
FOR_LANG,110,Introduction to Global Film,3,DIVR
H_D,350,Family Diversity,3,DIVR
HISTORY,120,World History I,3,DIVR
HISTORY,130,History of Organized Crime in America,3,DIVR
HISTORY,150,Peoples of the United States,3,DIVR
HISTORY,308,North American Indian History, Pre-Contact to Present,3,DIVR
HISTORY,314,American Roots: Immigration Migration and Ethnic Identity,3,DIVR
HISTORY,321,US Popular Culture, 1800-1930,3,DIVR
HISTORY,322,US Popular Culture Since 1930,3,DIVR
MUS,362,History of Jazz,3,DIVR
MUS,267,Black American Music: Root to Fruit,3,DIVR
MUS,366,LGBTQ+ Perspectives in Music,3,DIVR
SOC,340,Social Inequality,3,DIVR
SOC,361,Criminology,3,DIVR
SOE,312,Natural Resources Society and the Environment,3,DIVR
SPANISH,320,Peninsular Spanish Culture,3,DIVR
SPANISH,321,Latin American Cultures,3,DIVR
SPMGT,101,Sport and Popular Culture: Trends and Issues,3,DIVR
WGSS,101,Introduction to Women's Gender and Sexuality Studies,3,DIVR
WGSS,120,Sex Race and Reproduction in Global Health Politics,3,DIVR
WGSS,220,Gender Culture and Science,3,DIVR"""

prereqs = {
    ("CPTS", 111): [[("MATH", 101)], [("MATH", 103)], [("MATH", 106)], [("MATH", 171)], [("MATH", 201)], [("MATH", 202)]],
    ("ECONS", 335): [[("MATH", 101)], [("MATH", 103)], [("MATH", 106)], [("MATH", 171)], [("MATH", 201)], [("MATH", 202)]],
    ("ENGR", 107): [[("MATH", 106)]],
    ("FIN", 223): [],
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
    ("MBIOS", 201): [[("BIOLOGY", 106)], [("BIOLOGY", 107)]],
    ("NEUROSCI", 201): [[("BIOLOGY", 106)], [("BIOLOGY", 107)]],
    ("ENGLISH", 101): [[("ENGLISH", 100)]],
    ("ENGLISH", 105): [[("ENGLISH", 104)]],
    ("ENGLISH", 365): [[("ENGLISH", 101)]],
    ("ENGLISH", 402): [[("ENGLISH", 101)], [("ENGLISH", 105)]],
    ("ENGLISH", 403): [[("ENGLISH", 101)], [("ENGLISH", 105)]],
    ("BIOLOGY", 307): [[("BIOLOGY", 102)], [("BIOLOGY", 106)]],
}

catalog = CourseCatalog(courses, prereqs)