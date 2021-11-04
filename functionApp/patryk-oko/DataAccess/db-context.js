const sql = require('mssql');
const parser = require('mssql-connection-string');

class PeopleDbContext {
    constructor(connectionString, log) {
        log("PeopleDbContext object has been created.");
        this.log = log;
        this.config = parser(connectionString);
        this.getPeople = this.getPeople.bind(this);
    }

    async getPeople() {
        this.log("getPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const request = new sql.Request(connection);
        const result = await request.query('select * from People');
        this.log("getPeople function - done")
        return result.recordset;
    }
    async addPeople(firstName, lastName, phoneNumber) {
        this.log("addPeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const insert = new sql.Request(connection);
        const result = await insert.query("insert into People values ('"+ firstName + "', '" + lastName + "', '" + phoneNumber +"')");
        this.log("addPeople function - done")
        return result.recordset;
    }
    async deletePeople(id) {
        this.log("deletePeople function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const del = new sql.Request(connection);
        const result = await del.query("delete from People where PersonID = '" + id +"'");
        this.log("deletePeople function - done")
        return result.recordset;
    }
    async getPerson(id) {
        this.log("getPerson function - run")
        const connection = await new sql.ConnectionPool(this.config).connect();
        const show = new sql.Request(connection);
        const result = await show.query("select * from People where PersonID = '" + id +"'");
        this.log("getPerson function - done")
        return result.recordset;
    }
}

module.exports = PeopleDbContext;