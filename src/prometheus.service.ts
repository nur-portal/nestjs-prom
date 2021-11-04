import { Injectable } from '@nestjs/common';
import {
  Counter,
  Gauge,
  Histogram,
  Registry,
  Summary,
  register,
} from 'prom-client';
import {
  IHistogramMetricArguments,
  IMetricArguments,
  MetricType,
} from './interfaces/metric.type';
import {
  CounterMetric,
  GaugeMetric,
  GenericMetric,
  HistogramMetric,
  SummaryMetric,
} from './interfaces';

@Injectable()
export class PrometheusService {
  getDefaultRegistry(): Registry {
    return register;
  }

  getCounter(args: IMetricArguments) {
    return this.findOrCreateCounter(args);
  }

  getCounterMetric(name: string) {
    return this.getCounter({ name: name });
  }

  getGauge(args: IMetricArguments) {
    return this.findOrCreateGauge(args);
  }

  getGaugeMetric(name: string) {
    return this.getGauge({ name: name });
  }

  getHistogram(args: IHistogramMetricArguments) {
    return this.findOrCreateHistogram(args);
  }

  getHistogramMetric(name: string) {
    return this.getHistogram({ name: name });
  }

  getSummary(args: IMetricArguments) {
    return this.findOrCreateSummary(args);
  }

  getSummaryMetric(name: string) {
    return this.getSummary({ name: name });
  }

  private findOrCreateMetric({
    name,
    type,
    help,
    labelNames,
    buckets,
  }: {
    name: string;
    type: MetricType;
    help?: string;
    labelNames?: string[];
    buckets?: number[];
  }): GenericMetric {
    const metric: GenericMetric =
      this.getDefaultRegistry().getSingleMetric(name);

    switch (type) {
      case MetricType.Gauge:
        if (metric && metric instanceof Gauge) {
          return metric;
        }

        return new Gauge({
          name: name,
          help: help || `${name} ${type}`,
          labelNames: labelNames ?? [],
        });

      case MetricType.Histogram:
        if (metric && metric instanceof Histogram) {
          return metric;
        }

        const histogramConfig = {
          name: name,
          help: help || `${name} ${type}`,
          labelNames: labelNames ?? [],
        };

        if (buckets) {
          histogramConfig['buckets'] = buckets;
        }

        return new Histogram(histogramConfig);

      case MetricType.Summary:
        if (metric && metric instanceof Summary) {
          return metric;
        }

        return new Summary({
          name: name,
          help: help || `${name} ${type}`,
          labelNames: labelNames ?? [],
        });

      case MetricType.Counter:
      default:
        if (metric && metric instanceof Counter) {
          return metric;
        }

        return new Counter({
          name: name,
          help: help || `${name} ${type}`,
          labelNames: labelNames ?? [],
        });
    }
  }

  private findOrCreateCounter(args: IMetricArguments): CounterMetric {
    return this.findOrCreateMetric({
      ...args,
      type: MetricType.Counter,
    }) as CounterMetric;
  }

  private findOrCreateGauge(args: IMetricArguments): GaugeMetric {
    return this.findOrCreateMetric({
      ...args,
      type: MetricType.Gauge,
    }) as GaugeMetric;
  }

  private findOrCreateHistogram(
    args: IHistogramMetricArguments,
  ): HistogramMetric {
    return this.findOrCreateMetric({
      ...args,
      type: MetricType.Histogram,
    }) as HistogramMetric;
  }

  private findOrCreateSummary(args: IMetricArguments): SummaryMetric {
    return this.findOrCreateMetric({
      ...args,
      type: MetricType.Summary,
    }) as SummaryMetric;
  }
}
