import { Module } from "@nestjs/common";
import { ParkingZoneService } from "./parking-zone.service";
import { ParkingZoneController } from "./parking-zone.controller";

@Module({
  controllers: [ParkingZoneController],
  providers: [ParkingZoneService],
})
export class ParkingZoneModule {}
