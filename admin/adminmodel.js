const database = require("../database/database");

class Adminmodel {
    registerUser(id, firstName, lastName, phone, email, password, permissions, salt, hash, iterations, callback) {
        database.query("Insert into admin(id,firstname,lastname,phonenumber,email,permissions,salt,iterations,hash) values(" + id + ",'" + firstName + "','" + lastName + "','" + phone + "','" + email + "','" + permissions + "','" + salt + "','" + iterations + "','" + hash + "')", (error, results) => {
            if (error) {
                if (error.code === "23505") {
                    if (error.constraint === "admin_email") {
                        callback({status: 400, message: "Email already exists"});
                    } else {
                        callback({status: 400, message: "Mobile already exists"});
                    }
                } else callback({status: 500, message: "Something went wrong"});
            } else callback({status: 201, message: "Account created successfully"});
        });
    }

    updatePassword(id , salt , hash , iterations , callback) {
        var columnName = ""
        if (id.includes("@")) {
            columnName = "email";
        } else {
            columnName = "phonenumber";
        }
        database.query(`update admin set salt = '${salt}' , hash = '${hash}' , iterations = '${iterations}' where ${columnName} ='${id}'` , (error , results) => {
            if(error) {
                callback({status: 500 , message: "Something went wrong"});
            } else {
                callback({status: 200 , message: "Password changed successfully"});
            }
        });
    }
    

    getUserById(id, password, callback) {
        if (!id || !password || !callback) {
            callback(null);
            return;
        }
        var columnName = ""
        if (id.includes("@")) {
            columnName = "email";
        } else {
            columnName = "phonenumber";
        }
        database.query("select * from admin where " + columnName + " ='" + id+"'", (error, results) => {
            callback(results.rows);
        });
    }
}

module.exports = Adminmodel