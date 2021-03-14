#!/usr/bin/env bash

rm -rf multiple_solutions.csv
node multiple_solutions.js > multiple_solutions.csv
gnuplot -p multiple_solutions.gnuplot

