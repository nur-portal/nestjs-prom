import { DynamicModule, Global, Module } from '@nestjs/common';
import * as client from 'prom-client';
import {
  collectDefaultMetrics,
  DefaultMetricsCollectorConfiguration,
} from 'prom-client';
import { PrometheusService } from './prometheus.service';
import { PrometheusOptions } from './interfaces/prometheus-options';

@Global()
@Module({})
export class PrometheusModule {
  static register(options?: PrometheusOptions): DynamicModule {
    PrometheusModule.configure(options);

    return {
      module: PrometheusModule,
      providers: [PrometheusService],
      exports: [PrometheusService],
    };
  }

  private static configure(opts: PrometheusOptions): void {
    const options = PrometheusModule.makeDefaultOptions(opts);
    const { withDefaultsMetrics, prefix } = options;

    const registry = client.register;

    registry.clear();

    if (options.defaultLabels) {
      registry.setDefaultLabels(options.defaultLabels);
    }

    if (withDefaultsMetrics !== false) {
      const defaultMetricsOptions: DefaultMetricsCollectorConfiguration = {
        register: registry,
      };

      if (prefix) {
        defaultMetricsOptions.prefix = prefix;
      }

      collectDefaultMetrics(defaultMetricsOptions);
    }
  }

  private static makeDefaultOptions(
    options?: PrometheusOptions,
  ): PrometheusOptions {
    return {
      withDefaultsMetrics: true,
      ...options,
    };
  }
}
