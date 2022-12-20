(async() => {
    const neo4j = require('neo4j-driver');

    const uri = 'neo4j+s://d34744db.databases.neo4j.io';
    const user = 'neo4j';
    const password = '9IA4dkNBDOrSQT8IWTofyvP5Sbg936d0HUhT73HECNo';
    
    // To learn more about the driver: https://neo4j.com/docs/javascript-manual/current/client-applications/#js-driver-driver-object
    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

    try {
        await insertData();
    } catch (error) {
        console.error(`Something went wrong: ${error}`);
    } finally {
        // Don't forget to close the driver connection when you're finished with it.
        await driver.close();
    }

    async function createFriendship (driver, person1Name, person2Name) {

        // To learn more about sessions: https://neo4j.com/docs/javascript-manual/current/session-api/
        const session = driver.session({ database: 'neo4j' });

        try {
            // To learn more about the Cypher syntax, see: https://neo4j.com/docs/cypher-manual/current/
            // The Reference Card is also a good resource for keywords: https://neo4j.com/docs/cypher-refcard/current/
            const writeQuery = `MERGE (p1:Person { name: $person1Name })
                                MERGE (p2:Person { name: $person2Name })
                                MERGE (p1)-[:KNOWS]->(p2)
                                RETURN p1, p2`;

            // Write transactions allow the driver to handle retries and transient errors.
            const writeResult = await session.executeWrite(tx =>
                tx.run(writeQuery, { person1Name, person2Name })
            );

            // Check the write results.
            writeResult.records.forEach(record => {
                const person1Node = record.get('p1');
                const person2Node = record.get('p2');
                console.info(`Created friendship between: ${person1Node.properties.name}, ${person2Node.properties.name}`);
            });

        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Close down the session if you're not using it anymore.
            await session.close();
        }
    }

    async function insertData() {
        // To learn more about sessions: https://neo4j.com/docs/javascript-manual/current/session-api/
        const session = driver.session({ database: 'neo4j' });

        try {
            // To learn more about the Cypher syntax, see: https://neo4j.com/docs/cypher-manual/current/
            // The Reference Card is also a good resource for keywords: https://neo4j.com/docs/cypher-refcard/current/
            const writeQuery = `CREATE (wsu :Organization :Repository {title: "Washington State University", slots_per_bucket: 18})
            CREATE (ob :Objective :Executable {title: "B.S in Computer Science"})
            CREATE (wsu)-[:OWNS]->(ob)
            
            CREATE (task21141918 :Executable :Task{subject: "CPTS", number: 489, title: "Web Development", weight: 3})
            CREATE (task1534769360 :Executable :Task{subject: "CPTS", number: 488, title: "Professional Practice Coop/Internship", weight: 3})
            CREATE (task1602026007 :Executable :Task{subject: "CPTS", number: 487, title: "Software Design and Architecture", weight: 3})
            CREATE (task1589547484 :Executable :Task{subject: "CPTS", number: 486, title: "Gerontechnology II", weight: 3})
            CREATE (task312510540 :Executable :Task{subject: "CPTS", number: 485, title: "Gerontechnology I", weight: 3})
            CREATE (task318946337 :Executable :Task{subject: "CPTS", number: 484, title: "Software Requirements", weight: 3})
            CREATE (task768079587 :Executable :Task{subject: "CPTS", number: 483, title: "Topics in Computer Science", weight: 3})
            CREATE (task841098352 :Executable :Task{subject: "CPTS", number: 481, title: "Python Software Construction", weight: 3})
            CREATE (task90044450 :Executable :Task{subject: "CPTS", number: 479, title: "Mobile Application Development", weight: 3})
            CREATE (task67910039 :Executable :Task{subject: "CPTS", number: 478, title: "Software Process and Management", weight: 3})
            CREATE (task446955441 :Executable :Task{subject: "CPTS", number: 476, title: "Software Construction and Maintenance", weight: 3})
            CREATE (task1264155671 :Executable :Task{subject: "CPTS", number: 475, title: "Data Science", weight: 3})
            CREATE (task400002894 :Executable :Task{subject: "CPTS", number: 471, title: "Computational Genomics", weight: 3})
            CREATE (task519637717 :Executable :Task{subject: "CPTS", number: 466, title: "Embedded Systems", weight: 3})
            CREATE (task447181196 :Executable :Task{subject: "CPTS", number: 464, title: "Distributed Systems Concepts and Programming", weight: 3})
            CREATE (task826180638 :Executable :Task{subject: "CPTS", number: 460, title: "Operating Systems and Computer Architecture", weight: 3})
            CREATE (task83575784 :Executable :Task{subject: "CPTS", number: 455, title: "Introduction to Computer Networks", weight: 3})
            CREATE (task687590106 :Executable :Task{subject: "CPTS", number: 453, title: "Graph Theory", weight: 3})
            CREATE (task975414467 :Executable :Task{subject: "CPTS", number: 452, title: "Compiler Design", weight: 3})
            CREATE (task141686997 :Executable :Task{subject: "CPTS", number: 451, title: "Introduction to Database Systems", weight: 3})
            CREATE (task1201574886 :Executable :Task{subject: "CPTS", number: 443, title: "Human-Computer Interaction", weight: 3})
            CREATE (task837466710 :Executable :Task{subject: "CPTS", number: 442, title: "Computer Graphics", weight: 3})
            CREATE (task2139694175 :Executable :Task{subject: "CPTS", number: 440, title: "Artificial Intelligence", weight: 3})
            CREATE (task362886576 :Executable :Task{subject: "CPTS", number: 439, title: "Critical Infrastructure Security: The Emerging Smart Grid", weight: 3})
            CREATE (task1524179113 :Executable :Task{subject: "CPTS", number: 438, title: "Scientific Visualization", weight: 3})
            CREATE (task1850647215 :Executable :Task{subject: "CPTS", number: 437, title: "Introduction to Machine Learning", weight: 3})
            CREATE (task970070283 :Executable :Task{subject: "CPTS", number: 434, title: "Neural Network Design and Application", weight: 3})
            CREATE (task1151979025 :Executable :Task{subject: "CPTS", number: 430, title: "Numerical Analysis", weight: 3})
            CREATE (task1993619698 :Executable :Task{subject: "CPTS", number: 428, title: "Advanced Cyber Security", weight: 3})
            CREATE (task452680912 :Executable :Task{subject: "CPTS", number: 427, title: "Applied Cyber Security", weight: 3})
            CREATE (task2033339477 :Executable :Task{subject: "CPTS", number: 423, title: "Software Design Project II", weight: 3})
            CREATE (task1167061733 :Executable :Task{subject: "CPTS", number: 422, title: "Software Engineering Principles II", weight: 3})
            CREATE (task67839254 :Executable :Task{subject: "CPTS", number: 421, title: "Software Design Project I", weight: 3})
            CREATE (task2097767216 :Executable :Task{subject: "CPTS", number: 415, title: "Big Data", weight: 3})
            CREATE (task2002618944 :Executable :Task{subject: "CPTS", number: 411, title: "Introduction to Parallel Computing", weight: 3})
            CREATE (task73222966 :Executable :Task{subject: "CPTS", number: 401, title: "Computers and Society", weight: 3})
            CREATE (task717693789 :Executable :Task{subject: "CPTS", number: 370, title: "Systems Programming Java", weight: 4})
            CREATE (task687897940 :Executable :Task{subject: "CPTS", number: 360, title: "Systems Programming C/C++", weight: 4})
            CREATE (task192999510 :Executable :Task{subject: "CPTS", number: 355, title: "Programming Language Design", weight: 3})
            CREATE (task1747887661 :Executable :Task{subject: "CPTS", number: 350, title: "Design and Analysis of Algorithms", weight: 3})
            CREATE (task1513289322 :Executable :Task{subject: "CPTS", number: 327, title: "Introduction to Cyber Security", weight: 3})
            CREATE (task1426418960 :Executable :Task{subject: "CPTS", number: 323, title: "Software Design", weight: 3})
            CREATE (task362038061 :Executable :Task{subject: "CPTS", number: 322, title: "Software Engineering Principles I", weight: 3})
            CREATE (task1985966625 :Executable :Task{subject: "CPTS", number: 321, title: "Object-Oriented Software Principles", weight: 3})
            CREATE (task650207953 :Executable :Task{subject: "CPTS", number: 317, title: "Automata and Formal Languages", weight: 3})
            CREATE (task1069822547 :Executable :Task{subject: "CPTS", number: 315, title: "Introduction to Data Mining", weight: 3})
            CREATE (task655743876 :Executable :Task{subject: "CPTS", number: 302, title: "Professional Skills in Computing and Engineering", weight: 3})
            CREATE (task1419956395 :Executable :Task{subject: "CPTS", number: 260, title: "Introduction to Computer Architecture", weight: 3})
            CREATE (task1031398569 :Executable :Task{subject: "CPTS", number: 233, title: "Advanced Data Structures Java", weight: 3})
            CREATE (task1857689679 :Executable :Task{subject: "CPTS", number: 224, title: "Programming Tools", weight: 2})
            CREATE (task296512488 :Executable :Task{subject: "CPTS", number: 223, title: "Advanced Data Structures C/C++", weight: 3})
            CREATE (task475838166 :Executable :Task{subject: "CPTS", number: 215, title: "Data Analytics Systems and Algorithms", weight: 3})
            CREATE (task651844972 :Executable :Task{subject: "CPTS", number: 132, title: "Data Structures Java", weight: 4})
            CREATE (task901391995 :Executable :Task{subject: "CPTS", number: 131, title: "Program Design and Development Java", weight: 4})
            CREATE (task1170347369 :Executable :Task{subject: "CPTS", number: 122, title: "Data Structures C/C++", weight: 4})
            CREATE (task1278081307 :Executable :Task{subject: "CPTS", number: 121, title: "Program Design and Development C/C++", weight: 4})
            CREATE (task877134466 :Executable :Task{subject: "CPTS", number: 111, title: "Introduction to Computer Programming", weight: 3})
            CREATE (task60423355 :Executable :Task{subject: "EE", number: 261, title: "Electrical Circuits I", weight: 3})
            CREATE (task61421050 :Executable :Task{subject: "EE", number: 234, title: "Microprocessor Systems", weight: 4})
            CREATE (task1243397564 :Executable :Task{subject: "EE", number: 221, title: "Numerical Computing for Engineers", weight: 2})
            CREATE (task1419293036 :Executable :Task{subject: "MATH", number: 315, title: "Differential Equations", weight: 3})
            CREATE (task328182488 :Executable :Task{subject: "MATH", number: 300, title: "Mathematical Computing", weight: 3})
            CREATE (task667100428 :Executable :Task{subject: "MATH", number: 230, title: "Honors Introductory Linear Algebra", weight: 3})
            CREATE (task1288284459 :Executable :Task{subject: "MATH", number: 225, title: "Linear Algebra with Modern Applications", weight: 3})
            CREATE (task1150472936 :Executable :Task{subject: "MATH", number: 220, title: "Introductory Linear Algebra", weight: 2})
            CREATE (task180239576 :Executable :Task{subject: "MATH", number: 216, title: "Discrete Structures", weight: 3})
            CREATE (task173761992 :Executable :Task{subject: "MATH", number: 202, title: "Calculus for Business and Economics", weight: 3})
            CREATE (task619265638 :Executable :Task{subject: "MATH", number: 201, title: "Mathematics for Business and Economics", weight: 3})
            CREATE (task696412351 :Executable :Task{subject: "MATH", number: 182, title: "Honors Calculus II", weight: 4})
            CREATE (task1076926357 :Executable :Task{subject: "MATH", number: 172, title: "Calculus II", weight: 4})
            CREATE (task1853291030 :Executable :Task{subject: "MATH", number: 171, title: "Calculus I", weight: 4})
            CREATE (task2060323562 :Executable :Task{subject: "MATH", number: 108, title: "Trigonometry", weight: 2})
            CREATE (task1315006029 :Executable :Task{subject: "MATH", number: 103, title: "Algebra Methods and Introduction to Functions", weight: 3})
            CREATE (task1319986966 :Executable :Task{subject: "MATH", number: 101, title: "Intermediate Algebra", weight: 3})
            
            CREATE (task21141918)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task1602026007)-[:REQUIRES {pathID: 0}]->(task1985966625)
            CREATE (task1602026007)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task1589547484)-[:REQUIRES {pathID: 0}]->(task312510540)
            CREATE (task1589547484)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task1589547484)-[:REQUIRES {pathID: 1}]->(task312510540)
            CREATE (task1589547484)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task1589547484)-[:REQUIRES {pathID: 2}]->(task312510540)
            CREATE (task1589547484)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task312510540)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task312510540)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task312510540)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task318946337)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task841098352)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task841098352)-[:REQUIRES {pathID: 0}]->(task1857689679)
            CREATE (task841098352)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task841098352)-[:REQUIRES {pathID: 1}]->(task687897940)
            CREATE (task90044450)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task90044450)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task67910039)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task446955441)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task1264155671)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task1264155671)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task1264155671)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task400002894)-[:REQUIRES {pathID: 0}]->(task1747887661)
            CREATE (task400002894)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task400002894)-[:REQUIRES {pathID: 1}]->(task1747887661)
            CREATE (task400002894)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task519637717)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (task447181196)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task447181196)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task447181196)-[:REQUIRES {pathID: 2}]->(task61421050)
            CREATE (task826180638)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (task83575784)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (task83575784)-[:REQUIRES {pathID: 1}]->(task717693789)
            CREATE (task83575784)-[:REQUIRES {pathID: 2}]->(task61421050)
            CREATE (task687590106)-[:REQUIRES {pathID: 0}]->(task1150472936)
            CREATE (task687590106)-[:REQUIRES {pathID: 1}]->(task1288284459)
            CREATE (task687590106)-[:REQUIRES {pathID: 2}]->(task667100428)
            CREATE (task975414467)-[:REQUIRES {pathID: 0}]->(task192999510)
            CREATE (task975414467)-[:REQUIRES {pathID: 0}]->(task650207953)
            CREATE (task141686997)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task141686997)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task141686997)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task1201574886)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1201574886)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task837466710)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task837466710)-[:REQUIRES {pathID: 0}]->(task1150472936)
            CREATE (task837466710)-[:REQUIRES {pathID: 0}]->(task1857689679)
            CREATE (task837466710)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task837466710)-[:REQUIRES {pathID: 1}]->(task1150472936)
            CREATE (task837466710)-[:REQUIRES {pathID: 1}]->(task687897940)
            CREATE (task2139694175)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task2139694175)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1524179113)-[:REQUIRES {pathID: 0}]->(task1076926357)
            CREATE (task1524179113)-[:REQUIRES {pathID: 0}]->(task1857689679)
            CREATE (task1524179113)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1524179113)-[:REQUIRES {pathID: 1}]->(task1076926357)
            CREATE (task1524179113)-[:REQUIRES {pathID: 1}]->(task1857689679)
            CREATE (task1524179113)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1524179113)-[:REQUIRES {pathID: 2}]->(task696412351)
            CREATE (task1524179113)-[:REQUIRES {pathID: 2}]->(task1857689679)
            CREATE (task1524179113)-[:REQUIRES {pathID: 2}]->(task296512488)
            CREATE (task1524179113)-[:REQUIRES {pathID: 3}]->(task696412351)
            CREATE (task1524179113)-[:REQUIRES {pathID: 3}]->(task1857689679)
            CREATE (task1524179113)-[:REQUIRES {pathID: 3}]->(task1031398569)
            CREATE (task970070283)-[:REQUIRES {pathID: 0}]->(task1243397564)
            CREATE (task970070283)-[:REQUIRES {pathID: 0}]->(task1278081307)
            CREATE (task970070283)-[:REQUIRES {pathID: 1}]->(task1243397564)
            CREATE (task970070283)-[:REQUIRES {pathID: 1}]->(task901391995)
            CREATE (task1151979025)-[:REQUIRES {pathID: 0}]->(task1419293036)
            CREATE (task1151979025)-[:REQUIRES {pathID: 0}]->(task1278081307)
            CREATE (task1151979025)-[:REQUIRES {pathID: 1}]->(task1419293036)
            CREATE (task1151979025)-[:REQUIRES {pathID: 1}]->(task901391995)
            CREATE (task1151979025)-[:REQUIRES {pathID: 2}]->(task1419293036)
            CREATE (task1151979025)-[:REQUIRES {pathID: 2}]->(task328182488)
            CREATE (task1993619698)-[:REQUIRES {pathID: 0}]->(task1513289322)
            CREATE (task452680912)-[:REQUIRES {pathID: 0}]->(task1513289322)
            CREATE (task2033339477)-[:REQUIRES {pathID: 0}]->(task67839254)
            CREATE (task67839254)-[:REQUIRES {pathID: 0}]->(task1985966625)
            CREATE (task67839254)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task67839254)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (task67839254)-[:REQUIRES {pathID: 1}]->(task1985966625)
            CREATE (task67839254)-[:REQUIRES {pathID: 1}]->(task362038061)
            CREATE (task67839254)-[:REQUIRES {pathID: 1}]->(task717693789)
            CREATE (task2097767216)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task2097767216)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task2097767216)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task2002618944)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task2002618944)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task2002618944)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task73222966)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task73222966)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task73222966)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task717693789)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task717693789)-[:REQUIRES {pathID: 0}]->(task1419956395)
            CREATE (task717693789)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task717693789)-[:REQUIRES {pathID: 1}]->(task61421050)
            CREATE (task687897940)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task687897940)-[:REQUIRES {pathID: 0}]->(task1419956395)
            CREATE (task687897940)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task687897940)-[:REQUIRES {pathID: 1}]->(task61421050)
            CREATE (task192999510)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task192999510)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1747887661)-[:REQUIRES {pathID: 0}]->(task650207953)
            CREATE (task1747887661)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task1747887661)-[:REQUIRES {pathID: 1}]->(task650207953)
            CREATE (task1747887661)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task1747887661)-[:REQUIRES {pathID: 2}]->(task650207953)
            CREATE (task1747887661)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task1513289322)-[:REQUIRES {pathID: 0}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (task1513289322)-[:REQUIRES {pathID: 0}]->(task1419956395)
            CREATE (task1513289322)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1513289322)-[:REQUIRES {pathID: 1}]->(task687897940)
            CREATE (task1513289322)-[:REQUIRES {pathID: 1}]->(task1419956395)
            CREATE (task1513289322)-[:REQUIRES {pathID: 1}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1513289322)-[:REQUIRES {pathID: 2}]->(task687897940)
            CREATE (task1513289322)-[:REQUIRES {pathID: 2}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 2}]->(task61421050)
            CREATE (task1513289322)-[:REQUIRES {pathID: 2}]->(task296512488)
            CREATE (task1513289322)-[:REQUIRES {pathID: 3}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 3}]->(task687897940)
            CREATE (task1513289322)-[:REQUIRES {pathID: 3}]->(task61421050)
            CREATE (task1513289322)-[:REQUIRES {pathID: 3}]->(task1031398569)
            CREATE (task1513289322)-[:REQUIRES {pathID: 4}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 4}]->(task1419956395)
            CREATE (task1513289322)-[:REQUIRES {pathID: 4}]->(task296512488)
            CREATE (task1513289322)-[:REQUIRES {pathID: 4}]->(task717693789)
            CREATE (task1513289322)-[:REQUIRES {pathID: 5}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 5}]->(task1419956395)
            CREATE (task1513289322)-[:REQUIRES {pathID: 5}]->(task1031398569)
            CREATE (task1513289322)-[:REQUIRES {pathID: 5}]->(task717693789)
            CREATE (task1513289322)-[:REQUIRES {pathID: 6}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 6}]->(task61421050)
            CREATE (task1513289322)-[:REQUIRES {pathID: 6}]->(task296512488)
            CREATE (task1513289322)-[:REQUIRES {pathID: 6}]->(task717693789)
            CREATE (task1513289322)-[:REQUIRES {pathID: 7}]->(task180239576)
            CREATE (task1513289322)-[:REQUIRES {pathID: 7}]->(task61421050)
            CREATE (task1513289322)-[:REQUIRES {pathID: 7}]->(task1031398569)
            CREATE (task1513289322)-[:REQUIRES {pathID: 7}]->(task717693789)
            CREATE (task1426418960)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1426418960)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (task1426418960)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1426418960)-[:REQUIRES {pathID: 1}]->(task362038061)
            CREATE (task362038061)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task362038061)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task362038061)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task1985966625)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1985966625)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task650207953)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (task650207953)-[:REQUIRES {pathID: 0}]->(task180239576)
            CREATE (task650207953)-[:REQUIRES {pathID: 1}]->(task651844972)
            CREATE (task650207953)-[:REQUIRES {pathID: 1}]->(task180239576)
            CREATE (task1069822547)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task1069822547)-[:REQUIRES {pathID: 1}]->(task296512488)
            CREATE (task1069822547)-[:REQUIRES {pathID: 2}]->(task1031398569)
            CREATE (task1419956395)-[:REQUIRES {pathID: 0}]->(task296512488)
            CREATE (task1419956395)-[:REQUIRES {pathID: 1}]->(task1031398569)
            CREATE (task1031398569)-[:REQUIRES {pathID: 0}]->(task180239576)
            CREATE (task1031398569)-[:REQUIRES {pathID: 0}]->(task651844972)
            CREATE (task1857689679)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (task1857689679)-[:REQUIRES {pathID: 1}]->(task651844972)
            CREATE (task296512488)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (task296512488)-[:REQUIRES {pathID: 0}]->(task475838166)
            CREATE (task475838166)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (task475838166)-[:REQUIRES {pathID: 1}]->(task651844972)
            CREATE (task651844972)-[:REQUIRES {pathID: 0}]->(task901391995)
            CREATE (task901391995)-[:REQUIRES {pathID: 0}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 0}]->(task2060323562)
            CREATE (task901391995)-[:REQUIRES {pathID: 1}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 1}]->(task1853291030)
            CREATE (task901391995)-[:REQUIRES {pathID: 2}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 2}]->(task1076926357)
            CREATE (task901391995)-[:REQUIRES {pathID: 3}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 3}]->(task696412351)
            CREATE (task901391995)-[:REQUIRES {pathID: 4}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 4}]->(task619265638)
            CREATE (task901391995)-[:REQUIRES {pathID: 5}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 5}]->(task173761992)
            CREATE (task901391995)-[:REQUIRES {pathID: 6}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 6}]->(task180239576)
            CREATE (task901391995)-[:REQUIRES {pathID: 7}]->(task877134466)
            CREATE (task901391995)-[:REQUIRES {pathID: 7}]->(task1150472936)
            CREATE (task1170347369)-[:REQUIRES {pathID: 0}]->(task1278081307)
            CREATE (task1278081307)-[:REQUIRES {pathID: 0}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 0}]->(task2060323562)
            CREATE (task1278081307)-[:REQUIRES {pathID: 1}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 1}]->(task1853291030)
            CREATE (task1278081307)-[:REQUIRES {pathID: 2}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 2}]->(task1076926357)
            CREATE (task1278081307)-[:REQUIRES {pathID: 3}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 3}]->(task696412351)
            CREATE (task1278081307)-[:REQUIRES {pathID: 4}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 4}]->(task619265638)
            CREATE (task1278081307)-[:REQUIRES {pathID: 5}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 5}]->(task173761992)
            CREATE (task1278081307)-[:REQUIRES {pathID: 6}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 6}]->(task180239576)
            CREATE (task1278081307)-[:REQUIRES {pathID: 7}]->(task877134466)
            CREATE (task1278081307)-[:REQUIRES {pathID: 7}]->(task1150472936)
            CREATE (task877134466)-[:REQUIRES {pathID: 0}]->(task1319986966)
            CREATE (task877134466)-[:REQUIRES {pathID: 0}]->(task1315006029)
            CREATE (task655743876)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (task655743876)-[:REQUIRES {pathID: 1}]->(task651844972)
            CREATE (task655743876)-[:REQUIRES {pathID: 2}]->(task1278081307)
            CREATE (task655743876)-[:REQUIRES {pathID: 2}]->(task60423355)
            CREATE (task655743876)-[:REQUIRES {pathID: 3}]->(task901391995)
            CREATE (task655743876)-[:REQUIRES {pathID: 3}]->(task60423355)
            
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task1278081307)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task1170347369)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task1853291030)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task1076926357)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task180239576)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task655743876)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task650207953)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task362038061)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task1747887661)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task192999510)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task687897940)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task67839254)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task2033339477)
            CREATE (ob)-[:REQUIRES {pathID: 0}]->(task452680912)
            
            CREATE (wsu)-[:OWNS]->(task21141918)
            CREATE (wsu)-[:OWNS]->(task1534769360)
            CREATE (wsu)-[:OWNS]->(task1602026007)
            CREATE (wsu)-[:OWNS]->(task1589547484)
            CREATE (wsu)-[:OWNS]->(task312510540)
            CREATE (wsu)-[:OWNS]->(task318946337)
            CREATE (wsu)-[:OWNS]->(task768079587)
            CREATE (wsu)-[:OWNS]->(task841098352)
            CREATE (wsu)-[:OWNS]->(task90044450)
            CREATE (wsu)-[:OWNS]->(task67910039)
            CREATE (wsu)-[:OWNS]->(task446955441)
            CREATE (wsu)-[:OWNS]->(task1264155671)
            CREATE (wsu)-[:OWNS]->(task400002894)
            CREATE (wsu)-[:OWNS]->(task519637717)
            CREATE (wsu)-[:OWNS]->(task447181196)
            CREATE (wsu)-[:OWNS]->(task826180638)
            CREATE (wsu)-[:OWNS]->(task83575784)
            CREATE (wsu)-[:OWNS]->(task687590106)
            CREATE (wsu)-[:OWNS]->(task975414467)
            CREATE (wsu)-[:OWNS]->(task141686997)
            CREATE (wsu)-[:OWNS]->(task1201574886)
            CREATE (wsu)-[:OWNS]->(task837466710)
            CREATE (wsu)-[:OWNS]->(task2139694175)
            CREATE (wsu)-[:OWNS]->(task362886576)
            CREATE (wsu)-[:OWNS]->(task1524179113)
            CREATE (wsu)-[:OWNS]->(task1850647215)
            CREATE (wsu)-[:OWNS]->(task970070283)
            CREATE (wsu)-[:OWNS]->(task1151979025)
            CREATE (wsu)-[:OWNS]->(task1993619698)
            CREATE (wsu)-[:OWNS]->(task452680912)
            CREATE (wsu)-[:OWNS]->(task2033339477)
            CREATE (wsu)-[:OWNS]->(task1167061733)
            CREATE (wsu)-[:OWNS]->(task67839254)
            CREATE (wsu)-[:OWNS]->(task2097767216)
            CREATE (wsu)-[:OWNS]->(task2002618944)
            CREATE (wsu)-[:OWNS]->(task73222966)
            CREATE (wsu)-[:OWNS]->(task717693789)
            CREATE (wsu)-[:OWNS]->(task687897940)
            CREATE (wsu)-[:OWNS]->(task192999510)
            CREATE (wsu)-[:OWNS]->(task1747887661)
            CREATE (wsu)-[:OWNS]->(task1513289322)
            CREATE (wsu)-[:OWNS]->(task1426418960)
            CREATE (wsu)-[:OWNS]->(task362038061)
            CREATE (wsu)-[:OWNS]->(task1985966625)
            CREATE (wsu)-[:OWNS]->(task650207953)
            CREATE (wsu)-[:OWNS]->(task1069822547)
            CREATE (wsu)-[:OWNS]->(task655743876)
            CREATE (wsu)-[:OWNS]->(task1419956395)
            CREATE (wsu)-[:OWNS]->(task1031398569)
            CREATE (wsu)-[:OWNS]->(task1857689679)
            CREATE (wsu)-[:OWNS]->(task296512488)
            CREATE (wsu)-[:OWNS]->(task475838166)
            CREATE (wsu)-[:OWNS]->(task651844972)
            CREATE (wsu)-[:OWNS]->(task901391995)
            CREATE (wsu)-[:OWNS]->(task1170347369)
            CREATE (wsu)-[:OWNS]->(task1278081307)
            CREATE (wsu)-[:OWNS]->(task877134466)
            CREATE (wsu)-[:OWNS]->(task60423355)
            CREATE (wsu)-[:OWNS]->(task61421050)
            CREATE (wsu)-[:OWNS]->(task1243397564)
            CREATE (wsu)-[:OWNS]->(task1419293036)
            CREATE (wsu)-[:OWNS]->(task328182488)
            CREATE (wsu)-[:OWNS]->(task667100428)
            CREATE (wsu)-[:OWNS]->(task1288284459)
            CREATE (wsu)-[:OWNS]->(task1150472936)
            CREATE (wsu)-[:OWNS]->(task180239576)
            CREATE (wsu)-[:OWNS]->(task173761992)
            CREATE (wsu)-[:OWNS]->(task619265638)
            CREATE (wsu)-[:OWNS]->(task696412351)
            CREATE (wsu)-[:OWNS]->(task1076926357)
            CREATE (wsu)-[:OWNS]->(task1853291030)
            CREATE (wsu)-[:OWNS]->(task2060323562)
            CREATE (wsu)-[:OWNS]->(task1315006029)
            CREATE (wsu)-[:OWNS]->(task1319986966)

`;

            // Write transactions allow the driver to handle retries and transient errors.
            const writeResult = await session.executeWrite(tx =>
                tx.run(writeQuery)
            );


        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            // Close down the session if you're not using it anymore.
            console.log(writeResult)
            await session.close();
        }
    }

    async function findPerson(driver, personName) {

        const session = driver.session({ database: 'neo4j' });

        try {
            const readQuery = `MATCH (p:Person)
                            WHERE p.name = $personName
                            RETURN p.name AS name`;
            
            const readResult = await session.executeRead(tx =>
                tx.run(readQuery, { personName })
            );

            readResult.records.forEach(record => {
                console.log(`Found person: ${record.get('name')}`)
            });
        } catch (error) {
            console.error(`Something went wrong: ${error}`);
        } finally {
            await session.close();
        }
    }
})();
