# luxe-log
Luxe Log

A logger that retains the code location with two features

1) Easy styling

`console.debug("Logged in user: ", b("Gob Bluth"));`

`console.info("Logged in user: ", u("Gob Bluth"));`

`console.warn("Logged in user: ", i("Gob Bluth"));`

`console.error("Logged in user: ", strike("Gob Bluth"));`

![image](https://github.com/user-attachments/assets/4f395964-99c3-4f20-9f39-99fda01ae086)

Can be combined:

`console.debug("and that's why you ", i("always"), " leave a ", u("note!")));`

![image](https://github.com/user-attachments/assets/ab33aa89-1bd9-4933-b3ea-9e638a952373)



2) A record of history

```
import { logHistory } from "luxe-log";
console.log(logHistory);
```

![image](https://github.com/user-attachments/assets/27127b6e-371c-4fce-8eff-7643c3a8608f)


Notes:

Will replace `console.info`, `console.debug`, `console.warn`, and `console.error`. `console.log` will remain untouched and can still be used for one-off logging statements.

If you need to log an object so that it still expands in the console, but can add to the `logHistory` object, you can use `console.logObj`

To set the limit for log history, set `logLimit`. Default is 200.
