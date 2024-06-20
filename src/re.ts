import unicode from "./unicode";

export class Re {
    /**
     * 匹配任意 Unicode 字符
     */
    Any = unicode.Any
    /**
     * 匹配控制字符
     */
    Control = unicode.Control
    /**
     * 匹配格式控制字符
     */
    Format = unicode.Format
    /**
     * 匹配标点字符
     */
    Punctuation = unicode.Punctuation
    /**
     * 匹配符号字符
     */
    Symbol = unicode.Symbol
    /**
     * 匹配空白字符
     */
    Whitespace = unicode.Whitespace
    /**
     * 匹配空白字符+标点字符+控制字符
     */
    WPC = new RegExp([this.Whitespace.source, this.Punctuation.source, this.Control.source].join('|'))
    /**
     * 匹配空白字符+控制字符
     */
    WC = new RegExp([this.Whitespace.source, this.Control.source].join('|'))
    // 匹配>、<、\字符
    TextSeparator = new RegExp('[><\uff5c]')
    /**
     * 匹配不属于空白字符+标点字符+控制字符+分隔字符
     */
    PseudoLetter = new RegExp('(?:(?!' + this.TextSeparator.source + '|' + this.WPC.source + ')' + this.Any.source + ')')
    // ip4
    Ip4 = /(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/
    /**
     * 匹配@符号前有任意非空白、控制字符至少一次（匹配网站用户名密码）
     * http://user@example.com
     * http://user:pass@example.com
     */
    Auth = new RegExp('(?:(?:(?!' + this.WC.source + '|[@\/\[\]\(\)]).)+@)?')
    Port = /'(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?'/
    /**
     * 匹配国际化域名
     * http://www.xn--brgerentscheid-krankenhuser-xkc78d.de
     * http://xn--4gbrim.xn--ymcbaaajlc6dj7bxne2c.xn--wgbh1c
     */
    XN = /xn--[a-z0-9\\-]{1,59}/
    /**
     * 匹配域名
     * example.com
     * xn--4gbrim.xn--ymcbaaajlc6dj7bxne2c.xn--wgbh1c
     */
    Domain = new RegExp('(?:' +
        // 包含xn--前缀的国际化域名
        this.XN.source +
        '|' +
        // 一般的域名字符（字母、数字、连字符）
        '(?:' + this.PseudoLetter.source + ')' +
        '|' +
        // 匹配子域名
        '(?:' + this.PseudoLetter.source + '(?:-|' + this.PseudoLetter.source + '){0,61}' + this.PseudoLetter.source + ')' +
        ')')
    Host = new RegExp('(?:(?:(?:' + this.Domain + ')\.)*' + this.Domain + ')')
    hostTerminator = new RegExp(
        '(?=$|' + this.TextSeparator.source + '|' + this.WPC.source + ')' +
        '(?!' + '_|:\d|\.-|\.(?!$|' + this.WPC.source + '))'
    )
    HostStrict = new RegExp(this.Host.source + this.hostTerminator.source)
    Path = new RegExp('(?:[/?#](?:(?!' + this.WC.source + '|' + this.TextSeparator.source + '|[()[\\]{}.,"\'?!\\-;]).|\\/))?')
    http = new RegExp('^\\/\\/' + this.Auth.source + this.HostStrict + this.Path, 'i')
    Email = new RegExp('[\\-;:&=+$,.a-zA-Z0-9_][\\-;:&=+$,".a-zA-Z0-9_]*')
    mailto = new RegExp('^' + this.Email + '@' + this.HostStrict, 'i')

    constructor() {
        console.log(this.Domain);
    }
}
