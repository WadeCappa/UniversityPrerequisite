from collections import deque

def buildDict():
    d = dict()

    with open("./testdata/td.csv", "r") as f:
        for line in f:
            if line[-1] == '\n': line = line[:-1]
            line = line.split(',')
            base = line[0]
            
            options = line[1].split(' | ')
            for i, o in enumerate(options):
                options[i] = o.split(' ')

            d[base] = options
    return d


def buildPath(s, d):
    paths = [[]]
    # attempt at toplogoical sort with recusive options
    def dbfs(start, path, seen):
        bfs = deque([start])
        while bfs:
            c = bfs.popleft()
            if c not in d:
                if c not in seen:
                    path.append(c)
                    seen.add(c)
            else:
                for o in d[c]:
                    for nc in o:
                        bfs.append(nc)

                    if c not in seen:
                        path.append(c)
                        seen.add(c)

    dbfs(s, paths[0], set())
    return paths


def bp2(s, d):
    paths = {0: []}
    def dfs(node, index):
        if node not in paths[index]:
            paths[index].append(node)

        print(paths)

        if node in d:
            newIndex = index
            for node_or in d[node]:

                np = []
                for i in paths[index]:
                    if i != node:
                        np.append(i)
                    else:
                        np.append(i)
                        break

                paths[newIndex] = np
                index = newIndex

                for node_and in node_or:
                    dfs(node_and, index)

                newIndex = max(paths.keys()) + 1


    dfs(s, 0)
    return paths


# the solution above doesn't work. You have to create an 
# independent function call for each optional branch, and
# allow them to be resolved 1 by 1. Otherwise, you have to
# continue linearly. 



def bp3(s, d):
    paths = [[s]]
    pathstack = deque([(0, 0, set())])
    while pathstack:

        # print("---------------------")
        # print(paths)
        # print("---------------------")
        # for i, e in enumerate(pathstack):
        #     print(f"{i} --> {e}")

        pathindex, lastadded, seen = pathstack.popleft()
        newnode = paths[pathindex][lastadded]
        print(newnode, pathindex)
        if newnode in d:
            prev = paths[pathindex].copy()
            for onum, optionalpath in enumerate(d[newnode]):
                if onum == 0: newindex = pathindex 
                else: 
                    paths.append(prev.copy())
                    newindex = len(paths) - 1
                for childnode in optionalpath:
                    paths[newindex].append(childnode)
                    pathstack.append((newindex, len(paths[newindex]) - 1, seen.copy()))
    return paths

def bp4(s, d): # double queue
    paths = []
    outerQueue = deque([([s], deque([s]), set())])
    while outerQueue:
        path, innerQueue, seen = outerQueue.popleft()
        while innerQueue:
            curNode = innerQueue.popleft()
            if curNode in d:
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


# the solution above is very close to solving the problem. It seems to miss adding some
# nodes to the bfs and therefore fails to fully explore its paths. Fixing this should not
# be difficult, you just have to figure out why it doesn't add every node to the bfs

res = buildDict()
for key,val in res.items():
    print(key,val)

p = bp4("A", res)
print(p)