class TypeBuilder
{
    constructor(){}

    buildOrganization(record) {        
        return {
            "title": record.get("title"),
            "slots_per_bucket": record.get("slots_per_bucket").low,
            "ordID": record.get("ordID").low
        }
    }

    buildObjective(record) {        
        return {
            "id": record.get("id").low,
            "title": record.get("title"),
        }
    }

    buildTask(record) {
        return {
            "id": record.get("id").low,
            "subject": record.get("subject"),
            "number": record.get("number").low,
            "weight": record.get("weight").low,
            "title": record.get("title"),
            "description": record.get("description"),
            "parents": record.get("parents").map(r => r.low),
        }
    }

    buildLookupTable(tasks) {
        const res = {}
        tasks.forEach(t => res[t.id] = t)
        return res
    }
}

module.exports = TypeBuilder