import {LinkifyIt} from "./linkify-it";

export class Match {
    linkify: LinkifyIt
    start: number
    end: number
    text: string
    schema: string
    index: number
    lastIndex: number
    raw: string
    url: string

    constructor(linkify: LinkifyIt, shift: number) {
        this.linkify = linkify
        this.start = linkify.__index__
        this.end = linkify.__last_index__
        this.text = linkify.__text_cache__.slice(this.start, this.end)
        this.schema = linkify.__schema__.toLowerCase();
        this.index = this.start + shift;
        this.lastIndex = this.end + shift;
        this.raw = this.text
        this.url = this.text
    }
}

export function createMatch(linkify: LinkifyIt, shift: number){
    const match = new Match(linkify, shift)

    linkify.__compiled__[match.schema].normalize(match, self)

    return match
}
