import { Module } from "@nestjs/common";
import { ParkingZoneModule } from "./parking-zone/parking-zone.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ParkingZoneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
