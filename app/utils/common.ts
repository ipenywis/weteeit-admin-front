/**
 * Promise Wait with a specified delay
 * use it with await
 * @param delay @default 3000
 */
export const wait = (delay: number = 3000) =>
  new Promise(rs => setTimeout(rs, delay));
