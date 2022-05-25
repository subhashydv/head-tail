## head

```Usage : head [-n lines | -c bytes] [file ...]```


```
head file => By default it displays the first 10 lines of specified files.

head -n lines file => This filter displays the first count lines of specified files.

head -c bytes file => This filter displays the first count character of specified files.

head --help => This displays usage of head.
```

## tail

```Usage : tail  [-r] [-q] [-c # | -n #] [file ...]```


```
tail file ==> display the last part of a file.

tail -n lines file ==> This filter displays the last count lines of specified files.

tail -c bytes file ==> This filter displays the last count character of specified files.

tail -q file ==>  Suppresses printing of headers when multiple files are being examined.

tail -r file ==> The -r option causes the input to be displayed in reverse order, by line. 
```