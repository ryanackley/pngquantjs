Building
=================

Pre-requisites
----------------
* Grunt, npm, node
* Java on your system path. This is for the PNG encoder which is a separate project that uses Ant to build.  
* Emscripten's emcc either on the path or defined as an EMCC environmental variable. This should be the full path to the actual executable not the parent directory. This is for cross-compiling the libimagequant c library to javascript.
* Bash shell. 

Performing the build 
----------------------
# Clone this repo.
# Checkout the submodules by running `git submodule update --init --recursive`
# `npm install`
# `grunt`
# Everything should just work if you followed the steps and meet the pre-requisites.  

