import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Neutral */
  --color-neutral-0: #fff;
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;
  --color-neutral-950: #0a0a0a;

  /* Slate */
  /* --color-slate-0: #fff; */
  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-300: #cbd5e1; 
  --color-slate-400: #94a3b8;
  --color-slate-500: #64748b;
  --color-slate-600: #475569;
  --color-slate-700: #334155;
  --color-slate-800: #1e293b;
  --color-slate-900: #0f172a;
  /* --color-slate-950: #020617; */

  --color-red-100: #fee2e2;
  --color-red-600: #dc2626;
  --color-yellow-100: #fef9c3;
  --color-yellow-600: #ca8a04;
  --color-green-100: #dcfce7;
  --color-green-600: #16a34a;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%;
}

body {
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400; // 300, 400, 500, 600
  font-size: 1.6rem;
  color: var(--color-neutral-950);
  min-height: 100vh;
  line-height: 1.5;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

a {
  color: inherit;
  text-decoration: none;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 10px solid;
  border-color: rgba(120, 113, 108, 0.15) rgba(120, 113, 108, 0.25)
    rgba(120, 113, 108, 0.35) rgba(120, 113, 108, 0.5);
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

::-webkit-scrollbar {
  width: 0;
}

/////////////////////////////////////
/* mobileMedium size navbar */
/* @media screen and (max-width: 420px) {
  .hidden {
     display: none;
  }

  .open {
    background-image: linear-gradient(to bottom, var(--color-neutral-0), var(--color-slate-300));
    height: 30vh;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    margin: 0;

    ul {
      display: flex;
      flex-direction: column;
    }
  }
} */
`;
export default GlobalStyles;
