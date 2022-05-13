import { interpolateTemplateString } from '@aymme/api/intercept/utils';

describe('interpolateTemplateString', () => {
  it('should return template string when variable is falsy', () => {
    const template = `Hello {{firstName}} {{lastName}}!`;
    const variables = undefined;
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual(template);
  });
  it('should return template string when variable empty object', () => {
    const template = `Hello {{firstName}} {{lastName}}!`;
    const variables = {};
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual(template);
  });
  it('should replace template with variables', () => {
    const template = `Hello {{firstName}} {{lastName}}!`;
    const variables = {firstName: 'Kern', lastName: 'Zhao'};
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual('Hello Kern Zhao!');
  });
  it('should replace template with variables', () => {
    const template = `Hello {{firstName}} {{lastName}} {{lastName}}!`;
    const variables = {firstName: 'Kern', lastName: 'Zhao'};
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual('Hello Kern Zhao Zhao!');
  });
  it('should keep template if no variable is matching', () => {
    const template = `Hello {{foo}}`;
    const variables = {firstName: 'Kern', lastName: 'Zhao'};
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual('Hello {{foo}}');
  });
  it('should replace template with variables', () => {
    const template = `Hello {{{firstName}}} {{{{lastName}}}}!`;
    const variables = {firstName: 'Kern', lastName: 'Zhao'};
    const result = interpolateTemplateString(template, variables);
    expect(result).toEqual('Hello {Kern} {{Zhao}}!');
  });
});
