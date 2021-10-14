# Prometheus client for NestJS

## Installation

```bash
npm install @nur-portal/nestjs-prom prom-client
```

## Usage

```typescript
import { Module } from "@nestjs/common";
import { PrometheusModule } from "@nur-portal/nestjs-prom";

@Module({
  imports: [PrometheusModule.register()],
})
export class AppModule {}
```

## License

MIT licensed
