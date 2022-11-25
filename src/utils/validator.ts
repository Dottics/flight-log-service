import { Validator } from 'jsonschema'

const v = new Validator()

const regexSchema = {
    id: '/RegexSchema',
    type: 'string',
    pattern: /[a-g0-9]{8}-[a-g0-9]{4}-[a-g0-9]{4}-[a-g0-9]{4}-[a-g0-9]{12}/
}
const dateSchema = {
    id: '/DateSchema',
    type: 'string',
    pattern: /^20[2-9][0-9]-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}.[0-9]{3}Z$/
}

v.addSchema(regexSchema, '/RegexSchema')
v.addSchema(dateSchema, '/DateSchema')

export { v }