/** Replace template with variables
 * Example 1:
 * @param template 'hi, {{firstName}}'
 * @param variables {firstName: 'John'}
 * @return 'hi, John'
 **/
export function interpolateTemplateString(template: string, variables: any): string {
  return template.replace(/\{\{[^{}]+\}\}/g, function(templateWithBrackets: string) {
    const key = templateWithBrackets.slice(2, templateWithBrackets.length - 2);
    return variables[key] ?? templateWithBrackets;
  })
}
