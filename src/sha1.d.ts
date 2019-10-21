declare function sha1<T>(dest: string | Array<T> | ArrayBuffer | Uint8Array): string;

declare namespace sha1 {
    export function hex(arg: string): string;
    export function update<T>(arg: string | Array<T> | Uint8Array | ArrayBuffer): string;
    export function array(): Uint8Array;
    export function digest(): Uint8Array;
    export function arrayBuffer(): ArrayBuffer;
}

export default sha1;