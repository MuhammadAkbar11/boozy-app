let globalCssModule: any;

export function mapToCssModules(className = "", cssModule = globalCssModule) {
  if (!cssModule) return className;
  return className
    .split(" ")
    .map(c => cssModule[c] || c)
    .join(" ");
}

export function omit(obj: any, omitKeys: string[]) {
  const result: any = {};
  Object.keys(obj).forEach(key => {
    if (omitKeys.indexOf(key) === -1) {
      result[key] = obj[key];
    }
  });
  return result;
}
