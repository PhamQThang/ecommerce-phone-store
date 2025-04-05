import { DynamicModule, Global, Module } from '@nestjs/common';
import { VnpayModule, VnpayModuleOptions } from 'nestjs-vnpay';

@Global()
@Module({})
export class VnpayCoreModule {
  static register(options: VnpayModuleOptions): DynamicModule {
    const vnpayModule = VnpayModule.register(options);

    return {
      module: VnpayCoreModule,
      imports: [vnpayModule], // Import VnpayModule
      providers: [], // Không cần providers ở đây
      exports: [vnpayModule], // Export nguyên module thay vì chỉ service
    };
  }
}
