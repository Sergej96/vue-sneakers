export function debounce(this: any, func: Function, wait: number = 0) {
    let timer: number | undefined

    return (...args: any[]) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}
