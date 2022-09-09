import random

class Task(): 
    def __init__(self, subject, number, points, title):
        self.subject = subject 
        self.number = number 
        self.points = points 
        self.title = title

class Inserter():
    def __init__(self, outputFile = "inserts.cql"):
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
        data = []
        with open ("./data/course.csv", 'r') as f:
            for line in f:
                if line[-1] == '\n': line = line[:-1]
                line = line.split(',')
                data.append(Task(line[0],int(line[1]),int(line[2]),line[3]))

        return data
        

    def buildExecutables(self, tasks: list(Task)):
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
            s = "CREATE (:Organization :Repository {})".format("{title: \"Washington State University\", slots_per_bucket: 18}")
            return s 

        self.writeToFile(createOrgInsert)


    def insertMission(self):
        def createMission():
            s = "CREATE (ob :Objective :Executable {} return ob)".format("{title: \"B.S in Computer Science\"}")
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
    i.insertOrg()
    i.insertTasks(tasks)
    i.insertMission()
    i.buildPrereqs('./prereq.csv', executables)
    i.buildObjective(executables)

if __name__ == "__main__":
    main()