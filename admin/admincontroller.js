/**
 * Permission Structure
 * Can Modify others account | can edit others content | can upload courses
 *
 * if all permission is granted the permission code is 111 else 1 for granted and 0 for ungranted rights.
 *
 */
const validator = require("../validations/validator");
const Utils = require("../utilities/Utils")
const adminModel = require("./adminmodel")
const mAdminModel = new adminModel();
const email = require("../emailhelper/emailhelper")
module.exports = new class AdminController {
    signup(req, response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);
        if (!result || result.payload.payload.permission[0] !== "1") {
            return response.status(401).json({status: 401, message: "Unauthorized"});
        }
        if (!validator.isValidPhone(req.body.phone)) response.status(400).json({message: "Invalid Phone"})
        else if (!validator.isValidEmail(req.body.email)) response.status(400).json({message: "Invalid email"})
        else if (!validator.isValidName(req.body.firstName)) response.status(400).json({message: "Invalid first name"})
        else if (!validator.isValidName(req.body.lastName)) response.status(400).json({message: "Invalid last name"})
        else if (!validator.isValidPermission(req.body.permission)) response.status(400).json({message: "Invalid permission"})
        else if (!validator.isValidPassword(req.body.password)) response.status(400).json({message: "The password must contains uppercase, lowercase, number and special characters"})
        else {
            Utils.hashPassword(req.body.password, (v) => {
                mAdminModel.registerUser(Utils.getRandomInt(10000000000, 99999999999), req.body.firstName, req.body.lastName, req.body.phone, req.body.email, req.body.password, req.body.permission, v.salt, v.hash, v.iterations, callback => {
                    if (callback.status === 201) {
                        var emailToSend = '<div id="m_-9005154617825058743:pd"><div class="adM">\n' + '            </div><div style="word-spacing:1px;border-color:rgb(49,49,49);color:rgb(49,49,49)" dir="auto"><font style="font-size:1.125rem;border-color:rgb(49,49,49)">Hello!<br><br><b style="font-size:1.125rem;border-color:rgb(49,49,49)"></b>Welcome onboard at <span class="il">Pustakey</span>&nbsp;</font></div>\n' + '            <div style="word-spacing:1px;border-color:rgb(49,49,49);color:rgb(49,49,49)" dir="auto"><font size="4" style="border-color:rgb(49,49,49)"><br></font></div>\n' + '            <div style="word-spacing:1px;border-color:rgb(49,49,49);color:rgb(49,49,49)" dir="auto"><font style="font-size:1.125rem;border-color:rgb(49,49,49)">Best regards</font></div>\n' + '            <div style="word-spacing:1px;border-color:rgb(49,49,49);color:rgb(49,49,49)" dir="auto"><font style="font-size:1.125rem;border-color:rgb(49,49,49)">Your friends at <span class="il">Pustakey</span> :)</font></div>\n' + '            <div></div>\n' + '            <div></div>\n' + '         </div>'
                        email.sendEmail("no-reply@pustakey.com", "Pustakey Updates", req.body.email, "Welcome Onboard", emailToSend);
                    }
                    response.status(callback.status).json(callback);
                });
            });
        }
    }

    login(req, response) {
        mAdminModel.getUserById(req.body.id, req.body.password, (callback) => {
            if (callback && callback.length > 0) {
                if (Utils.isPasswordCorrect(callback[0].hash, callback[0].salt, callback[0].iterations, req.body.password)) {
                    response.status(200).json(Utils.generateToken({
                        id: callback[0].id, permission: callback[0].permissions
                    }));
                    return;
                }
            }
            response.status(401).json({status: 401, message: "Wrong id or password"});
        });
    }

    update(req, response) {
        const authHeader = req.headers.authorization
        const result = Utils.verifyToken(authHeader);
        if (!result || result.payload.payload.permission[0] !== "1") {
            return response.status(401).json({status: 401, message: "Unauthorized"});
        }
        if (!validator.isValidPassword(req.body.password)) response.status(400).json({message: "The password must contains uppercase, lowercase, number and special characters"})
        Utils.hashPassword(req.body.password, (v) => {
            mAdminModel.updatePassword(req.body.id, v.salt, v.hash, v.iterations, callback => {
                response.status(callback.status).json(callback)
            })
        })
    }

    profileDetails(req, response) {
        response.send(JSON.stringify(count));
    }
}