import { DynamicModule, Module } from '@nestjs/common';
import { PrometheusService } from './prometheus.service';

@Module({
  providers: [PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {
  public static register(): DynamicModule {
    return {
      module: PrometheusModule,
    };
  }
}
