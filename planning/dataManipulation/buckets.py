from collections import deque


class Course:
    def __init__(self, title, credits):
        self.title = title 
        self.credits = credits

    def __repr__(self) -> str:
        return f"{self.title} --> {self.credits}"

def buildCourseDict():
    d = dict()
    with open ("./data/course.csv", 'r') as f:
        for line in f:
            if line[-1] == '\n': line = line[:-1]
            line = line.split(',')
            course = Course(f"{line[0]}-{line[1]}", line[2])
            d[course.title] = course 

    return d

def buildDict():
    d = dict()

    with open("./data/prereqmodified.csv", "r") as f:
        for line in f:
            if line[-1] == '\n': line = line[:-1]
            line = line.split(',')
            base = line[0]
            
            options = line[1].split(' | ')
            for i, o in enumerate(options):
                options[i] = o.split(' ')

            d[base] = options
    return d


def getPaths(s, d, totalCredits, returnnumber): # double queue
    paths = []
    outerQueue = deque([([s], deque([s]), set())])
    while outerQueue:
        path, innerQueue, seen = outerQueue.popleft()
        while innerQueue:
            curNode = innerQueue.popleft()
            if curNode in d and d[curNode] != []:
                nextNode = d[curNode]
                for count, OR_node in enumerate(nextNode):
                    if count == len(nextNode) - 1:   
                        ic = innerQueue 
                        c = path
                        s = seen                 
                    else:       
                        ic = innerQueue.copy()
                        c = path.copy()
                        s = seen.copy()

                    for AND_node in OR_node:
                        if AND_node not in s:
                            c.append(AND_node)
                            ic.append(AND_node)
                            s.add(AND_node)

                    if count != len(nextNode) - 1:
                        outerQueue.append((c.copy(), ic.copy(), s.copy()))

        paths.append(path)
 
    return sorted(paths[:returnnumber], key = lambda list: len(list))
        

# courseDict = buildCourseDict()
# for key, val in courseDict.items():
#     print(key, val)

res = buildDict()
for key,val in res.items():
    print(key, val)

e = getPaths("BS_CS", res, 18, 25)
for path in e:
    print(path)
