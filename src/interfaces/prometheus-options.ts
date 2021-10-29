export interface PrometheusOptions {
  withDefaultsMetrics?: boolean;
  prefix?: string;
  defaultLabels?: {
    [key: string]: string | number;
  };
}
