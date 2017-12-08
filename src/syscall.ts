interface MemoryState {
    object: any,
    currentPosition: number,
}

let memoryStates: WeakMap<any, MemoryState> = new WeakMap();

export function syscall(wasmInstance: any, n: number, ...args: any[]) {
    switch (n) {
        default:
          console.error("NYI syscall", arguments);
          throw new Error("NYI syscall");    
    
        case /*brk*/ 45:
          return 0;
        case /*mmap2*/ 192:
          const memory = wasmInstance.exports.memory;
          let memoryState = memoryStates.get(wasmInstance);
          const requested = args[1];
          if (!memoryState) {
                memoryState = {
                    object: memory,
                    currentPosition: memory.buffer.byteLength,
                };
                memoryStates.set(wasmInstance, memoryState);
          }
          let cur = memoryState.currentPosition;
          if (cur + requested > memory.buffer.byteLength) {
            const need = Math.ceil((cur + requested - memory.buffer.byteLength) / 65536);
            memory.grow(need);
          }
          memoryState.currentPosition += requested;
          return cur;
    }    
}