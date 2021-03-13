#!/usr/bin/env bash

rm -rf harmonic_oscillator.csv
node harmonic_oscillator.js > harmonic_oscillator.csv
gnuplot -p harmonic_oscillator.gnuplot

