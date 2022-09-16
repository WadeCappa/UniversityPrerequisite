import random

class Task(): 
    def __init__(self, id: int, subject: str, number: int, points: int, title: str):
        self.task_id = f"task{id}"
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

    def randInt(self) -> int:
        return random.randint(0, 2147483647)


    def cleanInsert(self, insert):
        return insert + "\n"


    def buildTasks(self)-> list[Task]:
        data = []
        with open ("./data/course.csv", 'r') as f:
            for line in f:
                if line[-1] == '\n': line = line[:-1]
                line = line.split(',')
                data.append(Task(self.randInt(), line[0], int(line[1]),int(line[2]),line[3]))

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
                s += f"CREATE ({t.task_id} :Executable :Task" + "{" + f"subject: \"{t.subject}\", number: {t.number}, title: \"{t.title}\", weight: {t.points}" + "})\n" 
            return self.cleanInsert(s)

        self.writeToFile(createTaskInerts)


    def insertOrg(self):
        def createOrgInsert():
            s = "CREATE (wsu :Organization :Repository {title: \"Washington State University\", slots_per_bucket: 18})\n"
            s += "CREATE (ob :Objective :Executable {title: \"B.S in Computer Science\"})-[:HAS]->(ob_path :Path)\n"
            return self.cleanInsert(s) 

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

                for index, p in enumerate(paths):
                    p_id = f"path_{index}_of_{parent.task_id}"
                    path += f"CREATE ({parent.task_id})-[:HAS]->({p_id} :Path)\n"
                    for child in p:
                        path += f"CREATE ({p_id})-[:CONTAINS]->({child.task_id})\n"

        self.writeToFile(lambda: self.cleanInsert(path))


    def buildObjective(self, exe: dict[str, Task]):
        paths = "CPTS-121 CPTS-122 MATH-171 MATH-172 MATH-216 CPTS-302 CPTS-317 CPTS-322 CPTS-350 CPTS-355 CPTS-360 CPTS-421 CPTS-423 CPTS-427"
        objective = ""

        for p in list(map(lambda s: exe[s], paths.split(' '))):
            objective += f"CREATE (ob_path)-[:CONTAINS]->({p.task_id})\n"

        self.writeToFile(lambda: self.cleanInsert(objective))


    def relateClasses(self, map: dict[str, Task]):
        s = ""
        
        for t in map.values():
            s+= f"CREATE (wsu)-[:OWNS]->({t.task_id})\n"

        return self.writeToFile(lambda: self.cleanInsert(s))


def main():
    i = Inserter("inserts.cql")

    tasks = i.buildTasks()
    stringToTask = i.buildExecutables(tasks)
    i.insertOrg()
    i.insertTasks(tasks)
    i.buildPrereqs('./data/prereq.csv', stringToTask)
    i.buildObjective(stringToTask)
    i.relateClasses(stringToTask)

if __name__ == "__main__":
    main()