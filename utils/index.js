export function parseName(string) {
  return string.split('./public/img/')[1].split('.')[0]
}