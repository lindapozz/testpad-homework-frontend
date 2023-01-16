# testpad-homework-frontend

### Tech Stack - Overview
- React - Typscript
- Vite
- TailwindCSS
- ESLint Rules & Prettier
- JEST (IputForm.test.tsx) -> npm run test InputForm.test.tsx

### Assumptions
In the first version of the app, I assumed that **the URL fetched allows CORS on server-side**. I provided HTML pages with some content as an internal test (accessible inside the assets folder, e.g. http://localhost:5173/src/assets/test2.html). 

To count the words, I retrieved the body tag from the response, removed all HTML tags and comments (filtering all the content between < and >), and split the plain text using spaces as a delimiter. Considering this logic, other assumptions were that **the text is well-written** (every new sentence starts with a space), and **words from non-visible elements will also be counted** because they would be in the source code.

