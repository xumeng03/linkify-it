import unicode from "./unicode";

export class Re {
    // 匹配任意 Unicode 字符
    Any = unicode.Any
    // 匹配控制字符
    Control = unicode.Control
    // 匹配格式控制字符
    Format = unicode.Format
    // 匹配标点字符
    Punctuation = unicode.Punctuation
    // 匹配符号字符
    Symbol = unicode.Symbol
    // 匹配空白字符
    Whitespace = unicode.Whitespace
    // 匹配空白字符+标点字符+控制字符
    WPC = new RegExp([this.Whitespace.source, this.Punctuation.source, this.Control.source].join('|'))
    // 匹配空白字符+控制字符
    WC = new RegExp([this.Whitespace.source, this.Control.source].join('|'))
    // 匹配>、<、\字符
    TextSeparator = /[><｜]/
    // 匹配不属于空白字符+标点字符+控制字符
    PseudoLetter = new RegExp('(?:(?!' + this.TextSeparator.source + '|' + this.WPC.source + ')' + this.Any.source + ')')
    // ip4
    Ip4 = /(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
    // 匹配@符号前有任意非空白、控制字符至少一次
    Auth = /(?:(?:(?!' + this.WC.source + '|[@/\\[\\]()]).)+@)?/
    Port = /'(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?'/
    XN = /xn--[a-z0-9\\-]{1,59}/
    Domain = new RegExp('(?:' +
        this.XN.source +
        '|' +
        '(?:' + this.PseudoLetter.source + ')' +
        '|' +
        '(?:' + this.PseudoLetter.source + '(?:-|' + this.PseudoLetter.source + '){0,61}' + this.PseudoLetter.source + ')' +
        ')')

    constructor() {
        console.log(this.Domain);
    }
}
