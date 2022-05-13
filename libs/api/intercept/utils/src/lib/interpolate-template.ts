export function interpolateObject(object: any, variables: any): any {
  if (!object) {
    return object;
  }
  if (typeof object === 'string') {
    return interpolateTemplateString(object, variables);
  }
  if (typeof object !== 'object') {
    return object;
  }
  if (Array.isArray(object)) {
    return object.map(item => interpolateObject(item, variables));
  }
  const newObject: any = {};
  Object.keys(object).forEach(key => newObject[key] = interpolateObject(object[key], variables));
  return newObject;
}

export function interpolateTemplateString(template: string, variables: any): any {
  if (!variables) {
    return template;
  }
  if (typeof variables !== 'object') {
    return template;
  }
  if (Object.keys(variables).length === 0) {
    return template;
  }

  // Template is a single variable form such "{{myName}}" or "{{myName.firstName}}"
  if (template.slice(0, 2) === '{{' && template.slice(template.length - 2) === '}}' && template.slice(2, template.length - 2).indexOf('{') === -1 && template.slice(2, template.length - 2).indexOf('}') === -1) {
    const key = template.slice(2, template.length - 2);
    return getValue(variables, key) ?? undefined;
  }

  return template.replace(/\{\{[^{}]+\}\}/g, function(templateWithBrackets: string) {
    const key = templateWithBrackets.slice(2, templateWithBrackets.length - 2);
    return getValue(variables, key) ?? undefined;
  })
}

function getValue(object: any, key: string) {
  const keySegments = key.split('.');
  let result = object;
  for (const segment of keySegments) {
    result = result === undefined ? undefined : result[segment];
  }
  return result;
}
