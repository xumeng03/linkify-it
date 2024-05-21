import {Re} from "./re";

console.log("Linkify It")

const r = new Re()

const schemas = {
    'http:': {
        validate: function (str: string, position: number, self: LinkifyIt) {
            const tail = str.slice(position)
        }
    }
}

export class LinkifyIt {
    re: Re = new Re()
}
