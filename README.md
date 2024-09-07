# luxe-log
Luxe Log

A logger that retains the code location with two features

1) Easy styling

```ts
import { debugFn, infoFn, warnFn, errorFn, b, u, i, strike } from "luxe-log";

debugFn("Logged in user: ", b("Gob Bluth"))();

infoFn("Logged in user: ", u("Gob Bluth"))();

warnFn("Logged in user: ", i("Gob Bluth"))();

errorFn("Logged in user: ", strike("Gob Bluth"))(); 
```

![image](https://github.com/user-attachments/assets/4f395964-99c3-4f20-9f39-99fda01ae086)

Can be combined:

`debugFn("and that's why you ", i("always"), " leave a ", u("note!")))();`

![image](https://github.com/user-attachments/assets/ab33aa89-1bd9-4933-b3ea-9e638a952373)

Alternate syntax:

```ts
import { debug, info, warn, error, b, u, i, strike } from "luxe-log";

console.debug(...debug("Logged in user: ", b("Gob Bluth"));

console.info(...info("Logged in user: ", u("Gob Bluth")));

console.warn(...warn("Logged in user: ", i("Gob Bluth")));

console.error(...error("Logged in user: ", strike("Gob Bluth")));
```

2) A record of history

```ts
import { logHistory } from "luxe-log";
console.log(logHistory);
```

![image](https://github.com/user-attachments/assets/27127b6e-371c-4fce-8eff-7643c3a8608f)


Notes:


If you need to log an object so that it still expands in the console, but can add to the `logHistory` object, you can use `console.logObj`

To set the limit for log history, use `setLogLimit`. Default is 200.
