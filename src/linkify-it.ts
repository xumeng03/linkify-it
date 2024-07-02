import {Re} from "./re";
import {schemas} from "./schemas";

console.log("Linkify It")

export class LinkifyIt {
    re: Re = new Re()
    schemas = schemas
    __index__ = -1
    __last_index__ = -1
    __text_cache__ = ''
    __schema__ = ''
    __compiled__ = ''

    testSchemaAt = (text: string, schema: string, pos: number) => {
        schemas[schema].validate(text, pos)
        return 0
    }
    test = (text: string) => {
        this.__text_cache__ = text
        this.__index__ = -1

        if (!text.length) {
            return false
        }

        let re, m, ml, me, len, shift, next, tld_pos, at_pos
        if (this.re.schema_test.test(text)) {
            re = this.re.schema_search
            re.lastIndex = 0
            while ((m = re.exec(text)) !== null) {
                len = this.testSchemaAt(text, m[2], re.lastIndex)
                if (len) {
                    this.__schema__ = m[2]
                    this.__index__ = m.index + m[1].length
                    this.__last_index__ = m.index + m[0].length + len
                    break
                }
            }
        }
        return true
    }
    match = (text: string) => {
        const result = []
        let shift = 0
        let tail = text
        while (this.test(tail)) {

        }
        if (result.length) {
            return result;
        }
        return null
    }
}
