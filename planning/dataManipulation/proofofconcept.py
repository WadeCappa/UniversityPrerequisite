from collections import deque


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


def getPaths(s, d): # double queue
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

    return paths 
        


res = buildDict()
for key,val in res.items():
    print(key, val)

e = getPaths("CPTS-451", res)
e = sorted(e, key = lambda list: len(list))
for path in e:
    print(path)

print(len(e))