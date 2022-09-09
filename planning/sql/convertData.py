if __name__ == "__main__":
    import random
    data = []
    with open ("./course.csv", 'r') as f:
        for line in f:
            if line[-1] == '\n': line = line[:-1]
            line = line.split(',')
            s = "{" + f"\"subject\": \"{line[0]}\", \"number\": \"{line[1]}\", \"points\": {line[2]}, \"id\": {random.randint(-2147483648, 2147483647)}, \"title\": \"{line[3]}\"" + "},\n"
            data.append(s)

    f = open("convertedData.csv", "w")
    for d in data:
        f.write(d)
    f.close()