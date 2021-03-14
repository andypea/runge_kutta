#!/usr/bin/env bash

rm -rf stable.csv
node stable.js > stable.csv
gnuplot -p stable.gnuplot

