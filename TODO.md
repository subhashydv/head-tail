# TAIL 

**TODO**

- [ ] Add files in parser
- [ ] Make parser work for -r option
- [ ] Make parser work for -q option
- [ ] Implement tailMain function
- [ ] Implement -q option
- [ ] Implement -r option


**DONE**

- [x] Try `parser` with reduce
- [x] Take file from command line
- [x] Made parser work for byte option (-c)
- [x] Change parser contract
- [x] Make parser work for multi occurrence of same option
- [x] Started Implementing generic parser
- [x] Add new requirement for tail in README.md
- [x] Extract function for slice byte from tail
- [x] Implement byte option (-c)
- [x] Use richer structure for passing option
- [x] Extract line function in different file
- [x] Implement -n option
- [x] Make tail works for multiple lines
- [x] Start with tail function
- [x] Create dir structure
- [x] Add contract in README.md file




---------------------------------
---------------------------------

# HEAD

**TODO**

- [ ] Change error status to error

**MAYBE**

- [ ] Consider alternate contract for parse function
- [ ] Consider alternative for slice in head function

**DONE**

- [x] Use readFileError -- don't blow
- [x] Change key fileName to fileNames in args object after parsing
- [x] Change error code true to message only if we can't readFile 
- [x] Change key name fileName to fileNames
- [x] Changed contract for printOutput function
- [x] Add format output function
- [x] Change contract of headMain (call printOutput function inside)
- [x] Receive args without destructuring in headMain
- [x] Made parser works for multiple files
- [x] HeadMain should call to print function
- [x] Extract head call in a function from headMain
- [x] Extract headFiles function
- [x] Add main function
- [x] Add test for function option
- [x] Remove destructing of console in head
- [x] Refactor printOutput function change variable names
- [x] Add test for fileReader function
- [x] Remove regex from splitArgs
- [x] Change dir structure for head 
- [x] Move validation in separate file
- [x] Add new line in print function
- [x] Set -n option when only value is given in splitArgs function
- [x] Extract both the if in function from parser
- [x] First find the option in parser
- [x] Move all validation in validateOption function
- [x] Connect validate option with parser
- [x] Add validate option function
- [x] Make parser function works for switch and value combine
- [x] Add a format args function
- [x] Add print output function
- [x] Add usage option
- [x] Add test for function fileList
- [ ] ~~Change the switch name~~
- [x] Implement headMain for multiple files
- [x] Change contract of headMain for multiple files
- [x] Add functionality for multiple files in parsing
- [x] Remove magic number in head function
- [x] Make mocker works for multiple files
- [x] Change message when reader can't read file
- [x] Change contract of parser
- [x] Extract function for options and fileList from parser
- [x] Consider by-default options
- [x] Connect parser with main
- [x] Make parser function deal with both options together
- [x] Use try catch in headMain
- [x] Extract function for bytes character
- [x] Change name of function sliceFromStart
- [x] Abstract line and character option in headMain
- [x] Make parser works for -c option
- [x] Add parser function
- [x] Take input from command line without option
- [x] Change headMain function default contract to 10 line
- [x] Change switch name
- [x] Add test for splitLines and joinLines function
- [x] Move function spliceFromStart to stringUtils.js
- [x] Change structure for option object
- [x] Implement -c option
- [x] Investigate about -c option
- [x] Use richer structure for parsing data in head function
- [x] Consider test file separation
- [x] Add lib main without any option
- [x] Move string function in different library
- [x] Add test for extractLines function
- [x] Extract logical part in a function 
- [x] Investigate -n option properly (eg. line count is 0)
- [x] Extract function split and join
- [x] Implement line limit in head
- [x] Update README with option --help
- [x] Implement head for `multiple lines`
- [x] Use strictEqual instead of deepEqual
- [x] Implement head for only `single line`
- [x] Start with content
- [x] Decide contract format for Single line
- [x] Create `dir` structure
- [x] Check the existence of `mocha`
- [x] Create `readme` file