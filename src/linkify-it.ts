import {Re} from "./re";
import {text} from "node:stream/consumers";

console.log("Linkify It")

const r = new Re()

const schemas = {
    'http:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.http.test(tail)) {
                return tail.match(self.re.http)
            }
            return 0
        }
    },
    'https:': 'http:',
    'ftp:': 'http:',
    'mailto:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.http.test(tail)) {
                return tail.match(self.re.mailto)
            }
            return 0
        }
    }
}

export class LinkifyIt {
    re: Re = new Re()
    __index__ = -1
    __last_index__ = -1
    __text_cache__ = ''
    __schema__ = ''
    __compiled__ = ''

    test = (text: string) => {
        this.__text_cache__ = text
        this.__index__ = -1

        if (!text.length) { return false }

        let m, ml, me, len, shift, next, re, tld_pos, at_pos


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
