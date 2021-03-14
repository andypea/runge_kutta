#!/usr/bin/env bash

rm -rf vanDerPol.csv
node vanDerPol.js > vanDerPol.csv
gnuplot -p vanDerPol.gnuplot

