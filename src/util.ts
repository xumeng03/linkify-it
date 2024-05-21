export function escapeRE(str: string): string {
    return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
