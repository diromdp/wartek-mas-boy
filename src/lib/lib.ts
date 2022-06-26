

export const padStart = (num: number, length: number) => {
   if (!!num && !!length) {
      return String(num).padStart(length, '0')
   }
   return ''
}