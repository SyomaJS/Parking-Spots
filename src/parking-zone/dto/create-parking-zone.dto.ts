import { IsNotEmpty, IsString } from "class-validator";

export class CreateParkingZoneDto {
  @IsString()
  @IsNotEmpty()
  zoneNumber: string;
}
