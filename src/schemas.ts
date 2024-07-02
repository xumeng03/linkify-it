import {LinkifyIt} from "./linkify-it";

export interface Schema {
    [key: string]: {
        validate: Function
    };
}

export const schemas: Schema = {
    'http:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.http.test(tail)) {
                return tail.match(self.re.http)
            }
            return 0
        }
    },
    'https:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.http.test(tail)) {
                return tail.match(self.re.http)
            }
            return 0
        }
    },
    'ftp:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.http.test(tail)) {
                return tail.match(self.re.http)
            }
            return 0
        }
    },
    'mailto:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
            if (self.re.mailto.test(tail)) {
                return tail.match(self.re.mailto)
            }
            return 0
        }
    }
}
