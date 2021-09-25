ARGS=$@

Exit() {
  exit 1;
}

if [ "$#" -eq 0 ]; then
  ARG_LIST=(benchmarks/*)
  ARGS="${ARG_LIST[@]}"
fi

total=$(echo $ARGS | wc -w)
cnt=0

trap Exit SIGINT SIGTERM SIGTSTP

for bench in $ARGS; do
  if test -f "results/$(basename $bench .bench.json).csv"; then
    echo "Skipping $bench"
  else
    echo "Running benchmark $bench ($cnt / $total)";
    node ./node_modules/tachometer/bin/tach --config $bench --csv-file-raw results/$(basename $bench .bench.json).csv
  fi
  ((cnt++))
done
