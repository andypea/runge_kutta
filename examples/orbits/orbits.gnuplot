set datafile separator ','
set size square
set xrange [-1.5: 1.5]
set yrange [-1.5: 1.5]
plot 'orbits.csv' using 2:3 with lines, '' using 2:3 with points pointtype 6

