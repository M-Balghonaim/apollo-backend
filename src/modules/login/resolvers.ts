import * as bcrypt from "bcryptjs";

import {ResolverMap} from "../../types/graphql-utils";
import {User} from "../../entity/User";
import {invalidLogin, confirmEmailError} from "./errorMessages";
import {createMiddleware} from "../../utils/createMiddleWare";
import auth from "../../middlewares/auth";

const errorResponse = [
    {
        path: "email",
        message: invalidLogin,
    }
];

export const resolvers: ResolverMap = {
    Query: {
        bye2: () => "bye"
    },
    Mutation: {

        login: createMiddleware(auth, async (_, {email, password}: any, {session}) => {
                const user = await User.findOne({where: {email}});

                if (!user) {
                    return errorResponse;
                }


                const valid = await bcrypt.compare(password, user.password);

                if (!valid) {
                    return errorResponse;
                }

                if (!user.confirmed) {
                    return [
                        {
                            path: "email",
                            message: confirmEmailError
                        }
                    ];
                }

                // login sucessful
                session.userId = user.id;

                return null;
            }
        )
    }
};