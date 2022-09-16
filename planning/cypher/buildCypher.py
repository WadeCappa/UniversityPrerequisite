import random

class Task(): 
    def __init__(self, id: int, subject: str, number: int, points: int, title: str):
        self.id = id,
        self.subject = subject 
        self.number = number 
        self.points = points 
        self.title = title

class Inserter():
    def __init__(self, outputFile = "inserts.cql"):
        # establish constants        
        self.out = outputFile

        # clean input file for new inputs
        f = open(self.out, "w")
        f.write("")
        f.close()


    def writeToFile(self, func):
        f = open(self.out, "a")
        f.write(func())
        f.close()


    def cleanInsert(self, insert):
        return insert + "\n"


    def buildTasks(self)-> list[Task]:
        data = []
        with open ("./data/course.csv", 'r') as f:
            for line in f:
                if line[-1] == '\n': line = line[:-1]
                line = line.split(',')
                data.append(Task(random.randint(-2147483648, 2147483647), line[0],int(line[1]),int(line[2]),line[3]))

        return data
        

    def buildExecutables(self, tasks: list[Task]) -> dict[str, Task]:
        exe = dict()
        for task in tasks:
            exe[f"{task.subject}-{task.number}"] = task
        return exe

    def insertTasks(self, tasks: list[Task]):
        def createTaskInerts():
            s = ""
            for t in tasks:
                s += "CREATE (:Executable :Task" + "{" + f"subject: \"{t.subject}\", number: {t.number}, title: \"{t.title}\", weight: {t.points}" + "})\n" 
            return self.cleanInsert(s)

        self.writeToFile(createTaskInerts)


    def insertOrg(self):
        def createOrgInsert():
            s = "CREATE (:Organization :Repository {title: \"Washington State University\", slots_per_bucket: 18})\n"
            return s 

        self.writeToFile(createOrgInsert)


    def buildPrereqs(self, file, executables: dict[str, Task]):
        path = ""

        with open (file, "r") as f:
            for line in f:
                line = line.replace('\n', '')
                data = line.split(',')
                parent = executables[data[0]]
                paths = data[1].split(' | ')
                paths = list(map(lambda x: list(map(lambda y: executables[y], x.split(' '))), paths))

                for p in paths:
                    path += f"MERGE (:Task :Executable " + "{" + f"subject: \"{parent.subject}\", number: {parent.number}" + "}" + ")-[:HAS]->(p :Path)\n"
                    for child in p:
                        path += f"(p)-[:CONTAINS]->(:Task " + "{" + f"subject: \"{child.subject}\", number: {child.number}" + "}" + ")\n"

        self.writeToFile(lambda: self.cleanInsert(path))


    def buildObjective(self, exe: dict[str, Task]):
        paths = "CPTS-121 CPTS-122 MATH-171 MATH-172 MATH-216 CPTS-302 CPTS-317 CPTS-322 CPTS-350 CPTS-355 CPTS-360 CPTS-421 CPTS-423 CPTS-427"
        objective = "MERGE (ob :Objective :Executable {})-[:HAS]->(p :Path)\n".format("{title: \"B.S in Computer Science\"}") 

        for p in list(map(lambda s: exe[s], paths.split(' '))):
            objective += f"(p)-[:CONTAINS]->(:Task " + "{" + f"subject: \"{p.subject}\", number: {p.number}" + "}" + ")\n"

        self.writeToFile(lambda: objective)


def main():
    i = Inserter("inserts.cql")

    tasks = i.buildTasks()
    stringToTask = i.buildExecutables(tasks)
    i.insertOrg()
    i.insertTasks(tasks)
    i.buildPrereqs('./data/prereq.csv', stringToTask)
    i.buildObjective(stringToTask)

if __name__ == "__main__":
    main()