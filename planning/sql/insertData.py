import random

class Inserter():
    def __init__(self, outputFile = "inserts.sql"):
        # establish constants        
        self.out = outputFile
        self.WSU_ORG_ID = 322548944
        self.CS_OBJ_ID = 1954948891

        # clean input file for new inputs
        f = open(self.out, "w")
        f.write("")
        f.close()


    def writeToFile(self, func):
        f = open(self.out, "a")
        f.write(func())
        f.close()


    def cleanInsert(self, insert):
        return insert[:-2] + ";\n\n"


    def getId(self, executables, course):
        return executables[tuple(course.replace('\n', '').split('-'))]


    def buildTasks(self):
        tasks = [
            {"subject": "CPTS", "number": "489", "points": 3, "id": 1047545760, "title": "Web Development"},
            {"subject": "CPTS", "number": "488", "points": 3, "id": -1600300477, "title": "Professional Practice Coop/Internship"},
            {"subject": "CPTS", "number": "487", "points": 3, "id": -2105810137, "title": "Software Design and Architecture"},
            {"subject": "CPTS", "number": "486", "points": 3, "id": 1452891801, "title": "Gerontechnology II"},
            {"subject": "CPTS", "number": "485", "points": 3, "id": -1029641629, "title": "Gerontechnology I"},
            {"subject": "CPTS", "number": "484", "points": 3, "id": -1706171781, "title": "Software Requirements"},
            {"subject": "CPTS", "number": "483", "points": 3, "id": 1875497512, "title": "Topics in Computer Science"},
            {"subject": "CPTS", "number": "481", "points": 3, "id": -849797475, "title": "Python Software Construction"},
            {"subject": "CPTS", "number": "479", "points": 3, "id": -599921853, "title": "Mobile Application Development"},
            {"subject": "CPTS", "number": "478", "points": 3, "id": 999462191, "title": "Software Process and Management"},
            {"subject": "CPTS", "number": "476", "points": 3, "id": -1677324672, "title": "Software Construction and Maintenance"},
            {"subject": "CPTS", "number": "475", "points": 3, "id": -229931694, "title": "Data Science"},
            {"subject": "CPTS", "number": "471", "points": 3, "id": 86406498, "title": "Computational Genomics"},
            {"subject": "CPTS", "number": "466", "points": 3, "id": -879086865, "title": "Embedded Systems"},
            {"subject": "CPTS", "number": "464", "points": 3, "id": 154517142, "title": "Distributed Systems Concepts and Programming"},
            {"subject": "CPTS", "number": "460", "points": 3, "id": -1501261256, "title": "Operating Systems and Computer Architecture"},
            {"subject": "CPTS", "number": "455", "points": 3, "id": -2040983793, "title": "Introduction to Computer Networks"},
            {"subject": "CPTS", "number": "453", "points": 3, "id": 1812519933, "title": "Graph Theory"},
            {"subject": "CPTS", "number": "452", "points": 3, "id": 802058530, "title": "Compiler Design"},
            {"subject": "CPTS", "number": "451", "points": 3, "id": 194503665, "title": "Introduction to Database Systems"},
            {"subject": "CPTS", "number": "443", "points": 3, "id": -338552389, "title": "Human-Computer Interaction"},
            {"subject": "CPTS", "number": "442", "points": 3, "id": -77601321, "title": "Computer Graphics"},
            {"subject": "CPTS", "number": "440", "points": 3, "id": -695944252, "title": "Artificial Intelligence"},
            {"subject": "CPTS", "number": "439", "points": 3, "id": 1702388229, "title": "Critical Infrastructure Security: The Emerging Smart Grid"},
            {"subject": "CPTS", "number": "438", "points": 3, "id": 1181191227, "title": "Scientific Visualization"},
            {"subject": "CPTS", "number": "437", "points": 3, "id": -1835570254, "title": "Introduction to Machine Learning"},
            {"subject": "CPTS", "number": "434", "points": 3, "id": 124361584, "title": "Neural Network Design and Application"},
            {"subject": "CPTS", "number": "430", "points": 3, "id": 745140757, "title": "Numerical Analysis"},
            {"subject": "CPTS", "number": "428", "points": 3, "id": 1580253810, "title": "Advanced Cyber Security"},
            {"subject": "CPTS", "number": "427", "points": 3, "id": 2022985925, "title": "Applied Cyber Security"},
            {"subject": "CPTS", "number": "423", "points": 3, "id": -1200364121, "title": "Software Design Project II"},
            {"subject": "CPTS", "number": "422", "points": 3, "id": -412029649, "title": "Software Engineering Principles II"},
            {"subject": "CPTS", "number": "421", "points": 3, "id": -514239297, "title": "Software Design Project I"},
            {"subject": "CPTS", "number": "415", "points": 3, "id": -872920148, "title": "Big Data"},
            {"subject": "CPTS", "number": "411", "points": 3, "id": 833142074, "title": "Introduction to Parallel Computing"},
            {"subject": "CPTS", "number": "401", "points": 3, "id": -1995458858, "title": "Computers and Society"},
            {"subject": "CPTS", "number": "370", "points": 4, "id": -467845716, "title": "Systems Programming Java"},
            {"subject": "CPTS", "number": "360", "points": 4, "id": 1986521733, "title": "Systems Programming C/C++"},
            {"subject": "CPTS", "number": "355", "points": 3, "id": -1172977275, "title": "Programming Language Design"},
            {"subject": "CPTS", "number": "350", "points": 3, "id": -1735194277, "title": "Design and Analysis of Algorithms"},
            {"subject": "CPTS", "number": "327", "points": 3, "id": -442395539, "title": "Introduction to Cyber Security"},
            {"subject": "CPTS", "number": "323", "points": 3, "id": -1817650217, "title": "Software Design"},
            {"subject": "CPTS", "number": "322", "points": 3, "id": -1088110447, "title": "Software Engineering Principles I"},
            {"subject": "CPTS", "number": "321", "points": 3, "id": -377165238, "title": "Object-Oriented Software Principles"},
            {"subject": "CPTS", "number": "317", "points": 3, "id": -204807597, "title": "Automata and Formal Languages"},
            {"subject": "CPTS", "number": "315", "points": 3, "id": -671416127, "title": "Introduction to Data Mining"},
            {"subject": "CPTS", "number": "302", "points": 3, "id": -386839489, "title": "Professional Skills in Computing and Engineering"},
            {"subject": "CPTS", "number": "260", "points": 3, "id": 1763945752, "title": "Introduction to Computer Architecture"},
            {"subject": "CPTS", "number": "233", "points": 3, "id": -367991078, "title": "Advanced Data Structures Java"},
            {"subject": "CPTS", "number": "224", "points": 2, "id": -1883855239, "title": "Programming Tools"},
            {"subject": "CPTS", "number": "223", "points": 3, "id": -1633670756, "title": "Advanced Data Structures C/C++"},
            {"subject": "CPTS", "number": "215", "points": 3, "id": -516199639, "title": "Data Analytics Systems and Algorithms"},
            {"subject": "CPTS", "number": "132", "points": 4, "id": 148892123, "title": "Data Structures Java"},
            {"subject": "CPTS", "number": "131", "points": 4, "id": 663056350, "title": "Program Design and Development Java"},
            {"subject": "CPTS", "number": "122", "points": 4, "id": -1451327212, "title": "Data Structures C/C++"},
            {"subject": "CPTS", "number": "121", "points": 4, "id": -308817276, "title": "Program Design and Development C/C++"},
            {"subject": "CPTS", "number": "111", "points": 3, "id": 1472628808, "title": "Introduction to Computer Programming"},
            {"subject": "EE", "number": "261", "points": 3, "id": -1759988391, "title": "Electrical Circuits I"},
            {"subject": "EE", "number": "234", "points": 4, "id": 1928584324, "title": "Microprocessor Systems"},
            {"subject": "EE", "number": "221", "points": 2, "id": 576664054, "title": "Numerical Computing for Engineers"},
            {"subject": "MATH", "number": "315", "points": 3, "id": 10129607, "title": "Differential Equations"},
            {"subject": "MATH", "number": "300", "points": 3, "id": -327406373, "title": "Mathematical Computing"},
            {"subject": "MATH", "number": "230", "points": 3, "id": 1901199082, "title": "Honors Introductory Linear Algebra"},
            {"subject": "MATH", "number": "225", "points": 3, "id": 2030950282, "title": "Linear Algebra with Modern Applications"},
            {"subject": "MATH", "number": "220", "points": 2, "id": 1912739110, "title": "Introductory Linear Algebra"},
            {"subject": "MATH", "number": "216", "points": 3, "id": -1479065934, "title": "Discrete Structures"},
            {"subject": "MATH", "number": "202", "points": 3, "id": -1410182031, "title": "Calculus for Business and Economics"},
            {"subject": "MATH", "number": "201", "points": 3, "id": -1871629611, "title": "Mathematics for Business and Economics"},
            {"subject": "MATH", "number": "182", "points": 4, "id": -1230658196, "title": "Honors Calculus II"},
            {"subject": "MATH", "number": "172", "points": 4, "id": 1054476765, "title": "Calculus II"},
            {"subject": "MATH", "number": "171", "points": 4, "id": 785206599, "title": "Calculus I"},
            {"subject": "MATH", "number": "108", "points": 2, "id": -10838232, "title": "Trigonometry"},
            {"subject": "MATH", "number": "103", "points": 3, "id": -1920008809, "title": "Algebra Methods and Introduction to Functions"},
            {"subject": "MATH", "number": "101", "points": 3, "id": 1329135967, "title": "Intermediate Algebra"}
        ]
        return tasks
        

    def buildExecutables(self, tasks):
        exe = {}
        for task in tasks:
            exe[(task['subject'], task['number'])] = task["id"]
        return exe


    def insertExecutables(self, exe):
        def createExeInerts():
            s = "INSERT INTO executable (executable_id) VALUES\n"
            for _,v in exe.items():
                s += f"({v}),\n"
            return self.cleanInsert(s)
        self.writeToFile(createExeInerts)


    def insertTasks(self, tasks):
        def createTaskInerts():
            s = "INSERT INTO task (task_id, parent_org, subject, number, slot_weight) VALUES\n"
            for dict in tasks:
                s += f"({dict['id']}, {self.WSU_ORG_ID}, '{dict['subject']}', '{dict['number']}', {dict['points']}),\n"
            return self.cleanInsert(s)
        self.writeToFile(createTaskInerts)


    def insertOrg(self):
        def createOrgInsert():
            s = "INSERT INTO organization (organization_id, title, slots_per_bucket) VALUES \n"
            s += f"({self.WSU_ORG_ID}, 'Washington State University', 18);\n\n"
            return s 

        def createRepoInsert():
            s = f"INSERT INTO repository (repo_id) VALUES\n({self.WSU_ORG_ID});\n\n"
            return s

        self.writeToFile(createRepoInsert)
        self.writeToFile(createOrgInsert)


    def insertMission(self):
        def createMission():
            s = "INSERT INTO objective (objective_id, parent_org, title) VALUES \nB.S in Computer Science"
            s += f"({self.CS_OBJ_ID}, {self.WSU_ORG_ID}, 'B.S in Computer Science');\n\n"
            return s 

        def enterMissionIntoExecutable():
            s = "INSERT INTO executable (executable_id) VALUES \n"
            s += F"({self.CS_OBJ_ID});\n\n"
            return s 

        self.writeToFile(enterMissionIntoExecutable)
        self.writeToFile(createMission)


    def buildPrereqs(self, file, executables):
        getId = self.getId

        path = "INSERT INTO path (path_id, parent_id) VALUES\n"
        inPath = "INSERT INTO in_path (parent_path, child_executable_id) VALUES\n"

        with open (file, "r") as f:
            for line in f:
                data = line.split(',')
                parent = getId(executables, data[0])
                paths = data[1].split(' | ')
                paths = map(lambda x: map(lambda y: getId(executables, y), x.split(' ')), paths)

                for p in paths:
                    path_id = random.randint(-2147483648, 2147483647)
                    path += f"({path_id}, {parent}),\n"
                    for c_id in p:
                        inPath += f"({path_id}, {c_id}),\n"

        path = self.cleanInsert(path)
        inPath = self.cleanInsert(inPath)
        self.writeToFile(lambda: path)
        self.writeToFile(lambda: inPath)


    def buildObjective(self, exe):
        paths = "CPTS-121 CPTS-122 MATH-171 MATH-172 MATH-216 CPTS-302 CPTS-317 CPTS-322 CPTS-350 CPTS-355 CPTS-360 CPTS-421 CPTS-423 CPTS-427"
        
        path_id = random.randint(-2147483648, 2147483647)
        pathinsert = f"INSERT INTO path (path_id, parent_id) VALUES\n({path_id}, {self.CS_OBJ_ID});\n\n"
        inPathInsert = "INSERT INTO in_path (parent_path, child_executable_id) VALUES\n"

        for p in paths.split(' '):
            inPathInsert += f"({path_id}, {self.getId(exe, p)}),\n"

        inPathInsert = self.cleanInsert(inPathInsert)
        self.writeToFile(lambda: pathinsert)
        self.writeToFile(lambda: inPathInsert)


def main():
    i = Inserter("testingData.sql")

    tasks = i.buildTasks()
    executables = i.buildExecutables(tasks)
    i.insertExecutables(executables)
    i.insertOrg()
    i.insertTasks(tasks)
    i.insertMission()
    i.buildPrereqs('./prereq.csv', executables)
    i.buildObjective(executables)

if __name__ == "__main__":
    main()