An experiment more than anything else at this point.

First, you need to configure login data and which room to send info to in `data/opts.json`
Then, run

```sh
$ python login.py
```

=== Sending a message ===

```sh
$ node test_message.js
```

And it's done.

=== Reading messages ===
A WIP. Requires [websocket-node](https://github.com/Worlize/WebSocket-Node).

```sh
$ node listen.js
```

At this time, you'll get an error about a refused connection.

Huge props to @copy for making it possible. I <3 you.
