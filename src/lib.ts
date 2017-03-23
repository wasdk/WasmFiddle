declare var UTF8Decoder: any;

function UTF8ArrayToString(u8Array: Uint8Array, idx: number) {
  var endPtr = idx;
  while (u8Array[endPtr])++endPtr;
  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr))
  } else {
    var u0 = 0, u1 = 0, u2 = 0, u3 = 0, u4 = 0, u5 = 0;
    var str = "";
    while (1) {
      u0 = u8Array[idx++];
      if (!u0) return str;
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue
      }
      u1 = u8Array[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue
      }
      u2 = u8Array[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2
      } else {
        u3 = u8Array[idx++] & 63;
        if ((u0 & 248) == 240) {
          u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | u3
        } else {
          u4 = u8Array[idx++] & 63;
          if ((u0 & 252) == 248) {
            u0 = (u0 & 3) << 24 | u1 << 18 | u2 << 12 | u3 << 6 | u4
          } else {
            u5 = u8Array[idx++] & 63;
            u0 = (u0 & 1) << 30 | u1 << 24 | u2 << 18 | u3 << 12 | u4 << 6 | u5
          }
        }
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0)
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023)
      }
    }
  }
}

function setStackPtr(memory: (Uint8Array|ArrayBuffer), ptr: number): void {
  var buffer : ArrayBuffer = (<any>memory).buffer || memory;
  new Int32Array(buffer)[1] = ptr;
}

function dumpMemory(memory: (Uint8Array|ArrayBuffer), ptr: number, len: number): void {
  let m = new Uint8Array((<any>memory).buffer || memory);
  function padAddress(s: string) {
    while (s.length < 8) s = "0" + s;
    return s;
  }
  function padByte(s: string) {
    while (s.length < 2) s = "0" + s;
    return s;
  }
  function ascii(i: number) {
    if (i < 32) {
      return ".";
    }
    return String.fromCharCode(i);
  }
  let str = "";
  for (let i = ptr; i < ptr + len; i += 16) {
    str += padAddress(i.toString(16).toUpperCase());
    str += " ";
    for (let j = i; j < i + 16; j++) {
      str += padByte(m[j].toString(16).toUpperCase());
    }
    str += " ";
    for (let j = i; j < i + 16; j++) {
      str += ascii(m[j]);
    }
    str += "\n";
  }
  lib.log(str);
}


export let lib = {
  log: null as any,
  showCanvas: null as any,
  UTF8ArrayToString: UTF8ArrayToString,
  setStackPtr: setStackPtr,
  dumpMemory: dumpMemory
};
