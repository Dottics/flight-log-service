import { Validator } from 'jsonschema'

const v = new Validator()

const regexSchema = {
    id: '/RegexSchema',
    type: 'string',
    pattern: /[a-g0-9]{8}-[a-g0-9]{4}-[a-g0-9]{4}-[a-g0-9]{4}-[a-g0-9]{12}/
}

v.addSchema(regexSchema, '/RegexSchema')

export { v }