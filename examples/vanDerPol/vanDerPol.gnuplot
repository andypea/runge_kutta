set datafile separator ','
#set size square
#set xrange [-1.5: 1.5]
#set yrange [-1.5: 1.5]
set xlabel "Time t"
set ylabel "Solution y"
set title "Solution of van der Pol Equation (\mu = 1) with adaptive Runge-Kutta 45"
plot 'vanDerPol.csv' \
   using 1:2 title "y_1" with linespoints pointtype 6, \
'' using 1:3 title "y_2" with linespoints pointtype 6

