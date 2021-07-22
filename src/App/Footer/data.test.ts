import { author, beginyear, source } from "./data";

test('data values match env', () => {
  expect(beginyear).toBe(process.env.REACT_APP_BEGIN_YEAR);
  expect(author).toBe(process.env.REACT_APP_AUTHOR);
  expect(source).toBe(process.env.REACT_APP_GITHUB_URL);
});