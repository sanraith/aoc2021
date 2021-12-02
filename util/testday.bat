@echo off
setlocal enableDelayedExpansion

if [%1] == [] goto AllTests

:OneDay
rem Convert param to 2 digit number
rem e.g. 1 to 01, 23 to 23, 192 to 92
set "d=%1"
set "d=%d:"=%"
set "padded=0%d%"
set "padded=%padded:~-2%"

npm run test "src/tests/solutions/day%padded%.spec.ts"
exit

:AllTests
npm run test -- --watchAll
