#!/bin/bash

# While running docker run  arguments can be passed so execute that
if [ $# -gt 0 ]
then
	echo -en "[*] Executing : $@\n"
	$@
else
  # User didn't passed any argument , stupid user.
  echo -en "[#] You stupid guy , pass it is as an argument what to run inside docker container\n"
  exit
fi
