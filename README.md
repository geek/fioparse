# fioparse
Convert fio [terse](https://fio.readthedocs.io/en/latest/fio_doc.html) output to csv

## Usage

First, create a fio output file that uses the `--minimal` or terse output mode.
It is also recommended that this file was generated with a fio argument for
`--status-interval=` argument set so that there is output at every output.

Convert the output file to a csv by running

```
$ fioparse test.out > test.csv
```

The last column will be the actual timestamp of the entry. This is based on the
file stat details and the runtime column.
