import { Counter, Gauge, Histogram, Metric, Summary } from 'prom-client';

export type CounterMetric = Counter<string>;
export type GaugeMetric = Gauge<string>;
export type HistogramMetric = Histogram<string>;
export type SummaryMetric = Summary<string>;
export type GenericMetric = Metric<string>;
