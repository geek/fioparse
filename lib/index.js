'use strict';

const fs = require('fs');
const readLastLines = require('read-last-lines');
const split2 = require('split2');

const headers = [
  'Terse Version',
  'Fio Version',
  'Job Name',
  'Group ID',
  'Error',
  'Read Total I/O (KB)',
  'Read Bandwidth (KB/s)',
  'Read IOPS',
  'Read Runtime (ms)',
  'Read Submission Latency (min)',
  'Read Submission Latency (max)',
  'Read Submission Latency (mean)',
  'Read Submission Latency (std dev)',
  'Read Completion Latency (min)',
  'Read Completion Latency (max)',
  'Read Completion Latency (mean)',
  'Read Completion Latency (std dev)',
  'Read Completion Latency (1%)',
  'Read Completion Latency (5%)',
  'Read Completion Latency (10%)',
  'Read Completion Latency (20%)',
  'Read Completion Latency (30%)',
  'Read Completion Latency (40%)',
  'Read Completion Latency (50%)',
  'Read Completion Latency (60%)',
  'Read Completion Latency (70%)',
  'Read Completion Latency (80%)',
  'Read Completion Latency (90%)',
  'Read Completion Latency (95%)',
  'Read Completion Latency (99%)',
  'Read Completion Latency (99.5%)',
  'Read Completion Latency (99.9%)',
  'Read Completion Latency (99.95%)',
  'Read Completion Latency (99.99%)',
  'Read Completion Latency (0%)',
  'Read Completion Latency (0%)',
  'Read Completion Latency (0%)',
  'Read Total Latency (min)',
  'Read Total Latency (max)',
  'Read Total Latency (mean)',
  'Read Total Latency (std dev)',
  'Read Bandwidth (min)',
  'Read Bandwidth (max)',
  'Read Bandwidth (agg %)',
  'Read Bandwidth (mean)',
  'Read Bandwidth (std dev)',
  'Write Total I/O (KB)',
  'Write Bandwidth (KB/s)',
  'Write IOPS',
  'Write Runtime (ms)',
  'Write Submission Latency (min)',
  'Write Submission Latency (max)',
  'Write Submission Latency (mean)',
  'Write Submission Latency (std dev)',
  'Write Completion Latency (min)',
  'Write Completion Latency (max)',
  'Write Completion Latency (mean)',
  'Write Completion Latency (std dev)',
  'Write Completion Latency (1%)',
  'Write Completion Latency (5%)',
  'Write Completion Latency (10%)',
  'Write Completion Latency (20%)',
  'Write Completion Latency (30%)',
  'Write Completion Latency (40%)',
  'Write Completion Latency (50%)',
  'Write Completion Latency (60%)',
  'Write Completion Latency (70%)',
  'Write Completion Latency (80%)',
  'Write Completion Latency (90%)',
  'Write Completion Latency (95%)',
  'Write Completion Latency (99%)',
  'Write Completion Latency (99.5%)',
  'Write Completion Latency (99.9%)',
  'Write Completion Latency (99.95%)',
  'Write Completion Latency (99.99%)',
  'Write Completion Latency (0%)',
  'Write Completion Latency (0%)',
  'Write Completion Latency (0%)',
  'Write Total Latency (min)',
  'Write Total Latency (max)',
  'Write Total Latency (mean)',
  'Write Total Latency (std dev)',
  'Write Bandwidth (min)',
  'Write Bandwidth (max)',
  'Write Bandwidth (agg %)',
  'Write Bandwidth (mean)',
  'Write Bandwidth (std dev)',
  'CPU User %',
  'CPU System %',
  'CPU Context Switches',
  'Major Page Faults',
  'Minor Page Faults',
  'IO Depth <=1',
  'IO Depth 2',
  'IO Depth 4',
  'IO Depth 8',
  'IO Depth 16',
  'IO Depth 32',
  'IO Depth >= 64',
  'IO Latency Distribution (us) <= 2',
  'IO Latency Distribution (us) 4',
  'IO Latency Distribution (us) 10',
  'IO Latency Distribution (us) 20',
  'IO Latency Distribution (us) 50',
  'IO Latency Distribution (us) 100',
  'IO Latency Distribution (us) 250',
  'IO Latency Distribution (us) 500',
  'IO Latency Distribution (us) 750',
  'IO Latency Distribution (us) 1000',
  'IO Latency Distribution (ms) <= 2',
  'IO Latency Distribution (ms) 4',
  'IO Latency Distribution (ms) 10',
  'IO Latency Distribution (ms) 20',
  'IO Latency Distribution (ms) 50',
  'IO Latency Distribution (ms) 100',
  'IO Latency Distribution (ms) 250',
  'IO Latency Distribution (ms) 500',
  'IO Latency Distribution (ms) 750',
  'IO Latency Distribution (ms) 1000',
  'IO Latency Distribution (ms) 2000',
  'IO Latency Distribution (ms) >= 2000',
  'Disk Utilization (name)',
  'Disk Utilization (read ios)',
  'Disk Utilization (write ios)',
  'Disk Utilization (read merges)',
  'Disk Utilization (write merges)',
  'Disk Utilization (read ticks)',
  'Disk Utilization (write ticks)',
  'Disk Utilization (read in-queue time)',
  'Disk Utilization (write in-queue time)',
  'Disk Utilization',
  'Disk Utilization (%)',
  'Time'
];

exports.run = async (filePath) => {
  const lastLine = await readLastLines.read(filePath, 1);
  const totalTime = parseInt(lastLine.split(';')[8], 10);

  const stat = fs.statSync(filePath);
  const startTime = stat.ctimeMs - totalTime;

  const readStream = fs.createReadStream(filePath);

  process.stdout.write(`${headers.join(',')}\n`);

  readStream.pipe(split2()).on('data', (data) => {
    const parts = data.split(';');
    const elapsedTime = startTime + (parseInt(parts[8], 10));
    const time = new Date(elapsedTime)
    const formattedTime = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;

    let formatted = '';
    for (let i = 0; i < parts.length; i++) {
      let part = parts[i];
      if ((i > 16 && i < 37) || (i > 57 && i < 78)) {
        part = part.split('=')[1];
      }

      formatted += `${part},`;
    }
    formatted += `${formattedTime}\n`;

    process.stdout.write(formatted);
  });
};
