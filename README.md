# luxe-log
Luxe Log

A logger that retains the code location with two features

1) Easy styling

`console.debug("Logged in user: ", b("Gob Bluth"));`

`console.info("Logged in user: ", u("Gob Bluth"));`

`console.warn("Logged in user: ", i("Gob Bluth"));`

`console.error("Logged in user: ", strike("Gob Bluth"));`

![image](https://github.com/user-attachments/assets/4f395964-99c3-4f20-9f39-99fda01ae086)


2) A record of history

```import { logHistory } from "luxe-log";
console.log(logHistory);```

![image](https://github.com/user-attachments/assets/27127b6e-371c-4fce-8eff-7643c3a8608f)
