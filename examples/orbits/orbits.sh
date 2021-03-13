#!/usr/bin/env bash

rm -rf orbits.csv
node orbits.js > orbits.csv
gnuplot -p orbits.gnuplot

