import unicode from "./unicode";
import {schemas} from "./schemas";

export class Re {
    /**
     * 匹配任意 Unicode 字符
     */
    Any = unicode.Any.source
    /**
     * 匹配控制字符
     */
    Control = unicode.Control.source
    /**
     * 匹配格式控制字符
     */
    Format = unicode.Format.source
    /**
     * 匹配标点字符
     */
    Punctuation = unicode.Punctuation.source
    /**
     * 匹配符号字符
     */
    Symbol = unicode.Symbol.source
    /**
     * 匹配空白字符
     */
    Whitespace = unicode.Whitespace.source
    /**
     * 匹配空白字符+标点字符+控制字符
     */
    WPC = [this.Whitespace, this.Punctuation, this.Control].join('|')
    /**
     * 匹配空白字符+控制字符
     */
    WC = [this.Whitespace, this.Control].join('|')
    // 匹配>、<、\字符
    TextSeparator = '[><\uff5c]'
    /**
     * 匹配不属于空白字符+标点字符+控制字符+分隔字符
     */
    PseudoLetter = '(?:(?!' + this.TextSeparator + '|' + this.WPC + ')' + this.Any + ')'
    /**
     * 匹配@符号前有任意非空白、控制字符至少一次（匹配网站用户名密码）
     * http://user@example.com
     * http://user:pass@example.com
     */
    Auth = '(?:(?:(?!' + this.WC + '|[@\/\[\]\(\)]).)+@)?'
    /**
     * 匹配域名
     * example.com
     */
    Domain = '(?:' +
        // 一般的域名字符（字母、数字、连字符）
        '(?:' + this.PseudoLetter + ')' +
        '|' +
        // 匹配子域名
        '(?:' + this.PseudoLetter + '(?:-|' + this.PseudoLetter + '){0,61}' + this.PseudoLetter + ')' +
        ')'
    /**
     * 匹配域名
     * example.com
     */
    Host = '(?:(?:(?:' + this.Domain + ')\.)*' + this.Domain + ')'
    /**
     * 约束域名结束
     * 可以是字符串的结尾 ($)，或者是 TextSeparator 中的字符，或者是 re.WPC 中的字符
     */
    hostTerminator = '(?=$|' + this.TextSeparator + '|' + this.WPC + ')' + '(?!' + '_|:\d|\.-|\.(?!$|' + this.WPC + '))'
    /**
     * 域名正则
     */
    HostStrict = this.Host + this.hostTerminator
    /**
     * 网址的路径正则
     */
    Path = '(?:[/?#](?:(?!' + this.WC + '|' + this.TextSeparator + '|[()[\\]{}.,"\'?!\\-;]).|\\/))?'
    /**
     * http网址的路径正则
     */
    http = new RegExp('^\\/\\/' + this.Auth + this.HostStrict + this.Path, 'i')
    /**
     * 邮箱名
     */
    Email = '[\\-;:&=+$,.a-zA-Z0-9_][\\-;:&=+$,".a-zA-Z0-9_]*'
    /**
     * 邮箱网址的路径正则
     */
    mailto = new RegExp('^' + this.Email + '@' + this.HostStrict, 'i')

    slist = Object.keys(schemas).join('|')
    schema_test = RegExp('(^|(?!_)(?:[><\uff5c]|' + this.WPC + '))(' + this.slist + ')', 'i')
    schema_search = RegExp('(^|(?!_)(?:[><\uff5c]|' + this.WPC + '))(' + this.slist + ')', 'ig')
    schema_at_start = RegExp('^' + this.schema_search.source, 'i')
}
