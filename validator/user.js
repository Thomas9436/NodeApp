const { Validator } = require('jsonschema');

module.exports = {
    verifyUser: (user) => {
        if (!user) {
            throw new Error('Cannot create a new user without data');
        }

        let validator = new Validator();

        let userSchema = {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    minLength: 3
                },
                email: {
                    type: 'string',
                    format: 'email'
                },
                password: {
                    type: 'string',
                    minLength: 3
                }
            },
            required: ['username', 'email', 'password'],
            additionalProperties: false
        };

        let result = validator.validate(user, userSchema);

        if (result.errors.length) {
            const errorMessages = result.errors
                .map((error) => {
                    return error.message;
                })
                .join(' ');
            throw new Error(errorMessages);
        }
    }
};
